from uuid import uuid4

import pytest
from data_providers.clients.ingredient_client import IngredientClient
from data_providers.clients.recipe_client import RecipeClient
from models.ingredient import Ingredient
from models.recipe import Recipe, RecipeTypes

# def test_create():
#     new_recipe = Recipe(id=uuid4(), name="Vodka redbull", type=RecipeTypes.COCKTAIL, category="drink", recipe_steps=["mix", "drink"], ingredients=[])
#     recipe_client = RecipeClient()
#     recipe_added = recipe_client.create(new_recipe)


recipe_client = RecipeClient()
ingredient_client = IngredientClient()


def create_example_recipe():
    new_recipe = Recipe(
        id=uuid4(),
        name="Vodka redbull",
        type=RecipeTypes.COCKTAIL,
        category="drink",
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


def test_create_recipe_with_many_ingredients():
    vodka = Ingredient(id=uuid4(), name="Vodka", category="??")
    red_bull = Ingredient(id=uuid4(), name="Red bull", category="??")
    ingredient_client.create(vodka)
    ingredient_client.create(red_bull)
    new_recipe = Recipe(
        id=uuid4(),
        name="Vodka redbull",
        type=RecipeTypes.COCKTAIL,
        category="drink",
        recipe_steps=["mix", "drink"],
        ingredient_ids=[vodka.id, red_bull.id],
    )
    recipe_client.create(new_recipe)

    recipe_from_db = recipe_client.get(new_recipe.id)
    assert (
        len(recipe_from_db.ingredient_ids) == 2 and recipe_from_db.ingredient_ids[0] != recipe_from_db.ingredient_ids[1]
    )
