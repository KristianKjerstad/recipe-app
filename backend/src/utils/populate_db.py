from typing import List
from uuid import uuid4

from data_providers.client_interface import ClientInterface
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
    vodka = Ingredient(id=uuid4(), name="Vodka", category=IngredientCategories.SPIRITS)
    tequila = Ingredient(id=uuid4(), name="Tequila", category=IngredientCategories.SPIRITS)
    gin = Ingredient(id=uuid4(), name="Gin", category=IngredientCategories.SPIRITS)
    vermouth = Ingredient(id=uuid4(), name="Vermouth", category=IngredientCategories.SPIRITS)
    campari = Ingredient(id=uuid4(), name="Campari", category=IngredientCategories.LIQUEURS)
    orange_liqour = Ingredient(id=uuid4(), name="Orange Liquor", category=IngredientCategories.LIQUEURS)
    red_bull = Ingredient(id=uuid4(), name="Red Bull", category=IngredientCategories.MIXERS)
    lime = Ingredient(id=uuid4(), name="Lime", category=IngredientCategories.OTHER)
    orange_juice = Ingredient(id=uuid4(), name="Orange Juice", category=IngredientCategories.MIXERS)
    triple_sec = Ingredient(id=uuid4(), name="Triple Sec", category=IngredientCategories.SPIRITS)
    whiskey = Ingredient(id=uuid4(), name="Whiskey", category=IngredientCategories.SPIRITS)
    sugar = Ingredient(id=uuid4(), name="Sugar", category=IngredientCategories.OTHER)
    mint = Ingredient(id=uuid4(), name="Mint", category=IngredientCategories.OTHER)
    soda_water = Ingredient(id=uuid4(), name="Soda Water", category=IngredientCategories.MIXERS)
    rum = Ingredient(id=uuid4(), name="Rum", category=IngredientCategories.SPIRITS)
    cranberry_juice = Ingredient(id=uuid4(), name="Cranberry Juice", category=IngredientCategories.MIXERS)

    ingredients.append(vodka)
    ingredients.append(gin)
    ingredients.append(vermouth)
    ingredients.append(campari)
    ingredients.append(orange_liqour)
    ingredients.append(orange_juice)
    ingredients.append(red_bull)
    ingredients.append(lime)
    ingredients.append(tequila)
    ingredients.append(triple_sec)
    ingredients.append(whiskey)
    ingredients.append(sugar)
    ingredients.append(mint)
    ingredients.append(soda_water)
    ingredients.append(rum)
    ingredients.append(cranberry_juice)

    for ingredient in ingredients:
        ingredient_repository.create(ingredient=ingredient)

    recipes: List[Recipe] = []

    vodka_redbull = Recipe(
        id=uuid4(),
        name="Vodka Red Bull",
        type=RecipeTypes.COCKTAIL,
        category=RecipeCategories.COCKTAIL,
        recipe_steps=["Add 2 oz Vodka to a highball glass with ice.", "Fill with Red Bull and stir."],
        ingredients=[
            RecipeIngredient(ingredient_uuid=vodka.id),
            RecipeIngredient(
                ingredient_uuid=red_bull.id,
            ),
        ],
    )
    vodka_screwdriver = Recipe(
        id=uuid4(),
        name="Vodka Screwdriver",
        type=RecipeTypes.COCKTAIL,
        category=RecipeCategories.COCKTAIL,
        recipe_steps=["Pour 2 oz vodka into a glass.", "Add 4 oz orange juice.", "Stir well and serve."],
        ingredients=[
            RecipeIngredient(ingredient_uuid=vodka.id),
            RecipeIngredient(
                ingredient_uuid=orange_juice.id,
            ),
        ],
    )
    margarita = Recipe(
        id=uuid4(),
        name="Margarita",
        type=RecipeTypes.COCKTAIL,
        category=RecipeCategories.COCKTAIL,
        recipe_steps=[
            "Prep your glasses: If you would like to salt the rims of your glasses, simply run a juicy lime wedge around the rims and then dip the rims in coarse Kosher salt. Set the glasses aside until ready to use.",
            "Stir the ingredients together in a large pitcher: Combine the  1 1/2 oz tequila, 3/4 oz lime juice,  1 oz orange liqueur and a handful of ice in a large pitcher and stir to combine.",
            "Serve on the rocks. Place a few ice cubes (or I often use one large ice cube so that it will melt more slowly) in each serving glass, then pour the margarita mix over the ice and garnish each glass with a slice of lime.",
        ],
        ingredients=[
            RecipeIngredient(
                ingredient_uuid=tequila.id,
            ),
            RecipeIngredient(ingredient_uuid=lime.id),
            RecipeIngredient(ingredient_uuid=vodka.id),
            RecipeIngredient(ingredient_uuid=orange_liqour.id),
        ],
    )
    negroni = Recipe(
        id=uuid4(),
        name="Negroni",
        type=RecipeTypes.COCKTAIL,
        category=RecipeCategories.COCKTAIL,
        recipe_steps=[
            "Combine 1 oz gin, 1 oz vermouth, and 1 oz Campari in a glass",
            "Stir well and serve in a glass with ice.",
        ],
        ingredients=[
            RecipeIngredient(ingredient_uuid=gin.id),
            RecipeIngredient(
                ingredient_uuid=vermouth.id,
            ),
            RecipeIngredient(ingredient_uuid=campari.id),
        ],
    )
    mojito = Recipe(
        id=uuid4(),
        name="Mojito",
        type=RecipeTypes.COCKTAIL,
        category=RecipeCategories.COCKTAIL,
        recipe_steps=[
            "Muddle mint leaves with sugar and lime juice in a glass.",
            "Add ice and pour rum over it.",
            "Top up with soda water and stir well.",
        ],
        ingredients=[
            RecipeIngredient(ingredient_uuid=rum.id),
            RecipeIngredient(ingredient_uuid=sugar.id),
            RecipeIngredient(ingredient_uuid=lime.id),
            RecipeIngredient(ingredient_uuid=mint.id),
            RecipeIngredient(ingredient_uuid=soda_water.id),
        ],
    )
    old_fashioned = Recipe(
        id=uuid4(),
        name="Old Fashioned",
        type=RecipeTypes.COCKTAIL,
        category=RecipeCategories.COCKTAIL,
        recipe_steps=[
            "Muddle sugar with bitters in a glass.",
            "Add ice and whiskey.",
            "Stir well and garnish with an orange slice.",
        ],
        ingredients=[
            RecipeIngredient(ingredient_uuid=sugar.id),
            RecipeIngredient(ingredient_uuid=whiskey.id),
        ],
    )
    cosmopolitan = Recipe(
        id=uuid4(),
        name="Cosmopolitan",
        type=RecipeTypes.COCKTAIL,
        category=RecipeCategories.COCKTAIL,
        recipe_steps=[
            "Shake vodka, triple sec, cranberry juice, and lime juice with ice.",
            "Strain into a cocktail glass and garnish with a lime wedge.",
        ],
        ingredients=[
            RecipeIngredient(ingredient_uuid=vodka.id),
            RecipeIngredient(ingredient_uuid=triple_sec.id),
            RecipeIngredient(ingredient_uuid=cranberry_juice.id),
            RecipeIngredient(ingredient_uuid=lime.id),
        ],
    )

    recipes.append(vodka_redbull)
    recipes.append(margarita)
    recipes.append(vodka_screwdriver)
    recipes.append(negroni)
    recipes.append(mojito)
    recipes.append(cosmopolitan)
    recipes.append(old_fashioned)
    for recipe in recipes:
        recipe_repository.create(recipe=recipe)


populate_db()
