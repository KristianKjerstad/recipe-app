from typing import List
from uuid import uuid4

from data_providers.client_interface import ClientInterface
from data_providers.clients.postgresql_client import PostgresqlClient
from resources.ingredient.entities.ingredient import Ingredient, IngredientCategories
from resources.ingredient.repositories.ingredient_repository import IngredientRepository
from resources.recipe.entities.recipe import Recipe, RecipeCategories, RecipeTypes
from resources.recipe.repositories.recipe_repository import RecipeRepository


def delete_recipe_table(db_client: ClientInterface):
    delete_recipe_statement = db_client.recipe_table.delete()
    db_client.session.execute(delete_recipe_statement)
    db_client.session.commit()
    db_client.session.close()


def delete_ingredient_table(db_client: ClientInterface):
    delete_ingredients_statement = db_client.ingredient_table.delete()
    db_client.session.execute(delete_ingredients_statement)
    db_client.session.commit()
    db_client.session.close()


def delete_association_table(db_client: ClientInterface):
    delete_ingredients_statement = db_client.recipe_ingredient_association.delete()
    db_client.session.execute(delete_ingredients_statement)
    db_client.session.commit()
    db_client.session.close()


def populate_db():
    db_client = PostgresqlClient()
    ingredient_repository = IngredientRepository(db_client=db_client)
    recipe_repository = RecipeRepository(db_client=db_client)

    delete_ingredient_table(db_client)
    delete_recipe_table(db_client)
    delete_association_table(db_client)

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
        ingredient_repository.create(ingredient=ingredient)

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
        recipe_repository.create(recipe=recipe)


populate_db()
