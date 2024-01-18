from uuid import uuid4

import pytest
from data_providers.clients.postgresql_client import PostgresqlClient
from resources.ingredient.entities.ingredient import Ingredient, IngredientCategories
from resources.ingredient.repositories.ingredient_repository import IngredientRepository
from resources.recipe.repositories.recipe_repository import RecipeRepository
from tests.data_providers.test_recipe_repository import create_example_recipe
from utils.populate_db import (
    delete_association_table,
    delete_ingredient_table,
    delete_recipe_table,
)

db_client = PostgresqlClient()
ingredient_repository = IngredientRepository(db_client)
recipe_repository = RecipeRepository(db_client)


def create_example_ingredient():
    new_recipe_id = create_example_recipe()
    new_ingredient = Ingredient(id=uuid4(), name="Vodka", category=IngredientCategories.ALCOHOLIC_BEVERAGE)
    ingredient_repository.create(new_ingredient)
    return new_ingredient.id


@pytest.fixture(autouse=True)  # run after all functions
def clean_up():
    db_client = PostgresqlClient()
    delete_ingredient_table(db_client)
    delete_recipe_table(db_client)
    delete_association_table(db_client)


def test_create():
    create_example_ingredient()


def test_create_and_delete():
    new_ingredient_id = create_example_ingredient()
    result = ingredient_repository.delete(new_ingredient_id)


def test_get():
    new_ingredient_id = create_example_ingredient()
    result = ingredient_repository.get(new_ingredient_id)
    assert result.id == new_ingredient_id
