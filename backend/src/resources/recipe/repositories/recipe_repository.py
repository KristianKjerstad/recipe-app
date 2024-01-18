from typing import List

from data_providers.client_interface import ClientInterface, ExecuteAlternatives
from data_providers.clients.postgresql_client import PostgresqlClient
from data_providers.repository_interface import RepositoryInterface
from resources.recipe.entities.recipe import Recipe
from sqlalchemy import UUID


class RecipeRepository(RepositoryInterface[Recipe, str]):
    def __init__(self, db_client: ClientInterface):
        self.db_client: ClientInterface = db_client
        self.recipe_table = db_client.recipe_table

    def create(self, recipe: Recipe):
        insert_statement = self.recipe_table.insert().values(
            id=recipe.id,
            type=recipe.type.value,
            name=recipe.name,
            category=recipe.category.value,
            recipe_steps=recipe.recipe_steps,
        )
        self.db_client.execute_statement(insert_statement)
        # Insert the ingredients and create associations
        for ingredient_id in recipe.ingredient_ids:
            # TODO check if ingredient exist
            get_ingredient_statement = self.db_client.ingredient_table.select().where(
                self.db_client.ingredient_table.c.id == ingredient_id
            )
            result = self.db_client.execute_statement(get_ingredient_statement, ExecuteAlternatives.FETCH_ONE)
            if result == None:
                raise Exception(f"Could not create recipe: Ingredient with id {ingredient_id} does not exist.")
            self.db_client.execute_statement(
                self.db_client.recipe_ingredient_association.insert().values(
                    recipe_id=recipe.id, ingredient_id=ingredient_id
                )
            )
        return recipe

    def delete(self, id: UUID):
        delete_statement = self.recipe_table.delete().where(self.recipe_table.c.id == str(id))
        self.db_client.execute_statement(delete_statement)

    def get_all(self) -> List[Recipe]:
        select_all = self.recipe_table.select()

        raw_recipes = self.db_client.execute_statement(select_all, ExecuteAlternatives.FETCH_ALL)
        recipes: List[Recipe] = []
        for recipe in raw_recipes:
            recipes.append(self.get(recipe[0]))
        return recipes

    def get(self, id: UUID) -> Recipe:
        select_statement = self.recipe_table.select().where(self.recipe_table.c.id == id)

        # Execute the select statement and fetch the result
        result = self.db_client.execute_statement(select_statement, ExecuteAlternatives.FETCH_ONE)
        recipe = Recipe(**result._mapping)
        get_associations_statement = self.db_client.recipe_ingredient_association.select().where(
            self.db_client.recipe_ingredient_association.c.recipe_id == id
        )
        associations = self.db_client.execute_statement(get_associations_statement, ExecuteAlternatives.FETCH_ALL)
        recipe.ingredient_ids = [association[1] for association in associations]
        return recipe

    def delete_all(self):
        self.db_client.delete_all_recipes()


def get_recipe_repository() -> RecipeRepository:
    db_client = PostgresqlClient()
    return RecipeRepository(db_client=db_client)
