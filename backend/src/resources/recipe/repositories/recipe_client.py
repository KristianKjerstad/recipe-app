from typing import List

from data_providers.client_interface import ClientInterface
from resources.recipe.entities import (
    recipe,  # required to import these before calling create_all
)
from resources.recipe.entities.recipe import Recipe
from sqlalchemy import UUID
from sqlalchemy.orm import sessionmaker


class RecipeClient(ClientInterface[Recipe, str]):
    def __init__(self, db_client):
        self.db_client = db_client
        self.recipe_table = db_client.recipe_table
        Session = sessionmaker(bind=db_client.db_engine)
        self.session = Session()

    def create(self, recipe: Recipe):
        insert_statement = self.recipe_table.insert().values(
            id=recipe.id,
            type=recipe.type.value,
            name=recipe.name,
            category=recipe.category.value,
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

        self.session.commit()
        self.session.close()
        return recipe

    def delete(self, id: UUID):
        delete_statement = self.recipe_table.delete().where(self.recipe_table.c.id == str(id))
        self.session.execute(delete_statement)
        self.session.commit()

    def get_all(self) -> List[Recipe]:
        select_all = self.recipe_table.select()
        raw_recipes = self.session.execute(select_all).fetchall()
        recipes: List[Recipe] = []
        for recipe in raw_recipes:
            recipes.append(self.get(recipe[0]))

        return recipes

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
