from uuid import UUID, uuid4

import pytest
from data_providers.clients.postgresql_client import PostgresqlClient
from resources.ingredient.entities.ingredient import Ingredient, IngredientCategories
from resources.ingredient.repositories.ingredient_repository import IngredientRepository
from resources.recipe.entities.recipe import (
    Recipe,
    RecipeCategories,
    RecipeIngredient,
    RecipeTypes,
)
from resources.recipe.repositories.recipe_repository import RecipeRepository

db_client = PostgresqlClient()
ingredient_repository = IngredientRepository(db_client)
recipe_repository = RecipeRepository(db_client)


def create_example_recipe():
    new_recipe = Recipe(
        id=uuid4(),
        name="Vodka redbull",
        type=RecipeTypes.COCKTAIL,
        category=RecipeCategories.COCKTAIL,
        recipe_steps=["mix", "drink"],
        ingredients=[],
        image_link="",
    )
    recipe_repository.create(new_recipe)

    return new_recipe.id


@pytest.fixture(autouse=True)  # run after all functions
def clean_up():
    recipe_repository.delete_all()
    ingredient_repository.delete_all()


def test_create():
    create_example_recipe()


def test_create_and_delete():
    new_recipe_id: UUID = create_example_recipe()
    recipe_repository.delete(new_recipe_id)


def test_get():
    new_recipe_id = create_example_recipe()
    result = recipe_repository.get(new_recipe_id)
    # todo add ingredient ref
    assert result.id == new_recipe_id


def test_get_all():
    create_example_recipe()
    result = recipe_repository.get_all()
    assert len(result) > 0


def test_create_recipe_with_many_ingredients():
    vodka = Ingredient(id=uuid4(), name="Vodka", category=IngredientCategories.SPIRITS)
    red_bull = Ingredient(id=uuid4(), name="Red bull", category=IngredientCategories.MIXERS)
    ingredient_repository.create(vodka)
    ingredient_repository.create(red_bull)
    new_recipe = Recipe(
        id=uuid4(),
        name="Vodka redbull",
        type=RecipeTypes.COCKTAIL,
        category=RecipeCategories.COCKTAIL,
        recipe_steps=["mix", "drink"],
        ingredients=[
            RecipeIngredient(ingredient_uuid=vodka.id),
            RecipeIngredient(ingredient_uuid=red_bull.id),
        ],
        image_link="",
    )

    recipe_repository.create(new_recipe)

    recipe_from_db = recipe_repository.get(new_recipe.id)
    assert len(recipe_from_db.ingredients) == 2 and recipe_from_db.ingredients[0] != recipe_from_db.ingredients[1]


def test_create_recipe_with_non_existing_ingredient():
    new_recipe = Recipe(
        id=uuid4(),
        name="Vodka redbull",
        type=RecipeTypes.COCKTAIL,
        category=RecipeCategories.COCKTAIL,
        recipe_steps=["mix", "drink"],
        ingredients=[RecipeIngredient(ingredient_uuid=uuid4())],
        image_link="",
    )
    with pytest.raises(Exception):
        recipe_repository.create(new_recipe)
