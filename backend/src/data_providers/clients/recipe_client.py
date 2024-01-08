from config import config
from data_providers.client_interface import ClientInterface
from data_providers.clients.postgresql_client import postgresqlClient
from models import recipe  # required to import these before calling create_all
from models.recipe import Recipe
from sqlalchemy import UUID, create_engine
from sqlalchemy.orm import sessionmaker

connection_string = f"postgresql://{config.POSTGRES_USER}:{config.POSTGRES_PASSWORD}@{config.POSTGRES_HOST}:{config.POSTGRES_PORT}/{config.POSTGRES_DATABASE}"

postgresql_engine = create_engine(connection_string, echo=True)


class RecipeClient(ClientInterface[Recipe, str]):
    def __init__(self, db_client=postgresqlClient()):
        self.db_client = db_client
        self.recipe_table = db_client.recipe_table
        Session = sessionmaker(bind=db_client.db_engine)
        self.session = Session()

    def create(self, recipe: Recipe):
        insert_statement = self.recipe_table.insert().values(
            id=recipe.id,
            type=recipe.type.value,
            name=recipe.name,
            category=recipe.category,
            recipe_steps=recipe.recipe_steps,
        )
        self.session.execute(insert_statement)
        # Insert the ingredients and create associations
        for ingredient_id in recipe.ingredient_ids:
            # TODO check if ingredient exist
            get_ingredient_statement = self.db_client.ingredient_table.select().where(
                self.db_client.ingredient_table.c.id == ingredient_id
            )
            result = self.session.execute(get_ingredient_statement).fetchone()
            if result == None:
                raise Exception(f"Could not create recipe: Ingredient with id {ingredient_id} does not exist.")
            self.session.execute(
                self.db_client.recipe_ingredient_association.insert().values(
                    recipe_id=recipe.id, ingredient_id=ingredient_id
                )
            )

        # self.session.execute(insert_statement)
        self.session.commit()
        self.session.close()
        return recipe

    def delete(self, id: UUID):
        delete_statement = self.recipe_table.delete().where(self.recipe_table.c.id == str(id))
        self.session.execute(delete_statement)
        self.session.commit()

    def get(self, id: UUID) -> Recipe:
        select_statement = self.recipe_table.select().where(self.recipe_table.c.id == id)

        # Execute the select statement and fetch the result
        result = self.session.execute(select_statement).fetchone()
        recipe = Recipe(**result._mapping)
        get_associations_statement = self.db_client.recipe_ingredient_association.select().where(
            self.db_client.recipe_ingredient_association.c.recipe_id == id
        )
        associations = self.session.execute(get_associations_statement).fetchall()
        recipe.ingredient_ids = [association[1] for association in associations]
        return recipe

    def wipe_db(self):
        delete_statement = self.recipe_table.delete()
        self.session.execute(delete_statement)
        self.session.commit()
