from typing import List

from data_providers.client_interface import ClientInterface
from data_providers.clients.postgresql_client import (
    ExecuteAlternatives,
    PostgresqlClient,
)
from data_providers.repository_interface import RepositoryInterface
from resources.ingredient.entities.ingredient import Ingredient
from sqlalchemy import UUID


class IngredientRepository(RepositoryInterface[Ingredient, str]):
    def __init__(self, db_client: ClientInterface):
        self.db_client: ClientInterface = db_client
        self.ingredient_table = db_client.ingredient_table

    def create(self, ingredient: Ingredient) -> Ingredient:
        insert_statement = self.ingredient_table.insert().values(
            id=ingredient.id, name=ingredient.name, category=ingredient.category.value
        )
        self.db_client.execute_statement(insert_statement)
        return ingredient

    def delete(self, id: UUID):
        delete_statement = self.ingredient_table.delete().where(self.ingredient_table.c.id == str(id))
        self.db_client.execute_statement(delete_statement)

    def get(self, id: UUID) -> Ingredient:
        select_statement = self.ingredient_table.select().where(self.ingredient_table.c.id == id)
        result = self.db_client.execute_statement(select_statement, ExecuteAlternatives.FETCH_ONE)
        return Ingredient(**result._mapping)

    def get_all(self) -> List[Ingredient]:
        select_statement = self.ingredient_table.select()
        results = self.db_client.execute_statement(select_statement, ExecuteAlternatives.FETCH_ALL)
        return [Ingredient(**result._mapping) for result in results]

    def delete_all(self) -> None:
        self.db_client.delete_all_ingredients()


def get_ingredient_repository() -> IngredientRepository:
    db_client = PostgresqlClient()
    return IngredientRepository(db_client=db_client)
