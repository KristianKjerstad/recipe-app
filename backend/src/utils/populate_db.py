from typing import List
from uuid import uuid4

from data_providers.clients.ingredient_client import IngredientClient
from data_providers.clients.postgresql_client import PostgresqlClient
from models.ingredient import Ingredient, IngredientCategories
from models.recipe import Recipe, RecipeCategories, RecipeTypes
from resources.recipe.repositories.recipe_client import RecipeClient


def populate_db():
    db_client = PostgresqlClient()
    ingredient_client = IngredientClient(db_client=db_client)
    recipe_client = RecipeClient(db_client=db_client)

    ingredient_client.wipe_db()
    recipe_client.wipe_db()

    ingredients: List[Ingredient] = []
    vodka = Ingredient(id=uuid4(), name="Vodka", category=IngredientCategories.ALCOHOLIC_BEVERAGE)
    tequila = Ingredient(id=uuid4(), name="Tequila", category=IngredientCategories.ALCOHOLIC_BEVERAGE)
    red_bull = Ingredient(id=uuid4(), name="Red bull", category=IngredientCategories.SOFT_DRINKS)
    lime = Ingredient(id=uuid4(), name="Lime", category=IngredientCategories.FRUIT)
    ingredients.append(vodka)
    ingredients.append(red_bull)
    ingredients.append(lime)
    ingredients.append(tequila)

    for ingredient in ingredients:
        ingredient_client.create(ingredient=ingredient)

    recipes: List[Recipe] = []

    vodka_redbull = Recipe(
        id=uuid4(),
        name="Vodka redbull",
        type=RecipeTypes.COCKTAIL,
        category=RecipeCategories.COCKTAIL,
        recipe_steps=["Mix ingredients", "drink!"],
        ingredient_ids=[vodka.id, red_bull.id],
    )
    margarita = Recipe(
        id=uuid4(),
        name="Margarita",
        type=RecipeTypes.COCKTAIL,
        category=RecipeCategories.COCKTAIL,
        recipe_steps=["Mix ingredients", "drink!"],
        ingredient_ids=[tequila.id, lime.id, vodka.id],
    )

    recipes.append(vodka_redbull)
    recipes.append(margarita)
    for recipe in recipes:
        recipe_client.create(recipe=recipe)


populate_db()
