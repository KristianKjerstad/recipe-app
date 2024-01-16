from uuid import uuid4

import pytest
from data_providers.clients.ingredient_client import IngredientClient
from data_providers.clients.postgresql_client import PostgresqlClient
from resources.ingredient.entities.ingredient import Ingredient, IngredientCategories
from resources.recipe.entities.recipe import Recipe, RecipeCategories, RecipeTypes
from resources.recipe.repositories.recipe_client import RecipeClient

db_client = PostgresqlClient()
ingredient_client = IngredientClient(db_client)
recipe_client = RecipeClient(db_client)


def create_example_recipe():
    new_recipe = Recipe(
        id=uuid4(),
        name="Vodka redbull",
        type=RecipeTypes.COCKTAIL,
        category=RecipeCategories.COCKTAIL,
        recipe_steps=["mix", "drink"],
        ingredient_ids=[],
    )
    recipe_client.create(new_recipe)

    return new_recipe.id


@pytest.fixture(autouse=True)  # run after all functions
def clean_up():
    recipe_client.wipe_db()
    ingredient_client.wipe_db()


def test_create():
    create_example_recipe()


def test_create_and_delete():
    new_recipe_id = create_example_recipe()
    result = recipe_client.delete(new_recipe_id)


def test_get():
    new_recipe_id = create_example_recipe()
    result = recipe_client.get(new_recipe_id)
    # todo add ingredient ref
    assert result.id == new_recipe_id


def test_get_all():
    new_recipe_id = create_example_recipe()
    result = recipe_client.get_all()


def test_create_recipe_with_many_ingredients():
    vodka = Ingredient(id=uuid4(), name="Vodka", category=IngredientCategories.ALCOHOLIC_BEVERAGE)
    red_bull = Ingredient(id=uuid4(), name="Red bull", category=IngredientCategories.SOFT_DRINKS)
    ingredient_client.create(vodka)
    ingredient_client.create(red_bull)
    new_recipe = Recipe(
        id=uuid4(),
        name="Vodka redbull",
        type=RecipeTypes.COCKTAIL,
        category=RecipeCategories.COCKTAIL,
        recipe_steps=["mix", "drink"],
        ingredient_ids=[vodka.id, red_bull.id],
    )
    recipe_client.create(new_recipe)

    recipe_from_db = recipe_client.get(new_recipe.id)
    assert (
        len(recipe_from_db.ingredient_ids) == 2 and recipe_from_db.ingredient_ids[0] != recipe_from_db.ingredient_ids[1]
    )


def test_create_recipe_with_non_existing_ingredient():
    new_recipe = Recipe(
        id=uuid4(),
        name="Vodka redbull",
        type=RecipeTypes.COCKTAIL,
        category=RecipeCategories.COCKTAIL,
        recipe_steps=["mix", "drink"],
        ingredient_ids=[uuid4()],
    )
    with pytest.raises(Exception):
        recipe_client.create(new_recipe)
