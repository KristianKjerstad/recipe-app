from uuid import uuid4

import pytest
from data_providers.clients.ingredient_client import IngredientClient
from data_providers.clients.postgresql_client import PostgresqlClient
from models.ingredient import Ingredient, IngredientCategories
from resources.recipe.repositories.recipe_client import RecipeClient
from tests.data_providers.test_recipe_client import create_example_recipe

db_client = PostgresqlClient()
ingredient_client = IngredientClient(db_client)
recipe_client = RecipeClient(db_client)


def create_example_ingredient():
    new_recipe_id = create_example_recipe()
    new_ingredient = Ingredient(id=uuid4(), name="Vodka", category=IngredientCategories.ALCOHOLIC_BEVERAGE)
    ingredient_client.create(new_ingredient)
    return new_ingredient.id


@pytest.fixture(autouse=True)  # run after all functions
def clean_up():
    ingredient_client.wipe_db()
    recipe_client.wipe_db()


def test_create():
    create_example_ingredient()


def test_create_and_delete():
    new_ingredient_id = create_example_ingredient()
    result = ingredient_client.delete(new_ingredient_id)


def test_get():
    new_ingredient_id = create_example_ingredient()
    result = ingredient_client.get(new_ingredient_id)
    assert result.id == new_ingredient_id
