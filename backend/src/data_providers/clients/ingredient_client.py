from typing import List

from data_providers.client_interface import ClientInterface
from models import (  # required to import these before calling create_all
    ingredient,
    recipe,
)
from models.ingredient import Ingredient
from sqlalchemy import UUID
from sqlalchemy.orm import sessionmaker


class IngredientClient(ClientInterface[Ingredient, str]):
    def __init__(self, db_client):
        self.db_client = db_client
        self.ingredient_table = db_client.ingredient_table
        Session = sessionmaker(bind=db_client.db_engine)
        self.session = Session()

    def create(self, ingredient: Ingredient):
        insert_statement = self.ingredient_table.insert().values(
            id=ingredient.id, name=ingredient.name, category=ingredient.category.value
        )
        self.session.execute(insert_statement)
        self.session.commit()
        self.session.close()
        return recipe

    def delete(self, id: UUID):
        delete_statement = self.ingredient_table.delete().where(self.ingredient_table.c.id == str(id))
        self.session.execute(delete_statement)
        self.session.commit()

    def get(self, id: UUID) -> Ingredient:
        select_statement = self.ingredient_table.select().where(self.ingredient_table.c.id == id)
        result = self.session.execute(select_statement).fetchone()
        return Ingredient(**result._mapping)

    def get_all(self) -> List[Ingredient]:
        select_statement = self.ingredient_table.select()
        results = self.session.execute(select_statement).fetchall()
        return [Ingredient(**result._mapping) for result in results]

    def wipe_db(self):
        delete_statement = self.ingredient_table.delete()
        self.session.execute(delete_statement)
        self.session.commit()
