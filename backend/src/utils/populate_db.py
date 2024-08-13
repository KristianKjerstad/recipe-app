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

# TO UPDATE DB ON VERCEL, UPDATE THE ENV FILE USED FROM LAUNCH.JSON TO .env instead of local.env


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
    orange_liqueur = Ingredient(id=uuid4(), name="Orange Liqueur", category=IngredientCategories.LIQUEURS)
    aperol = Ingredient(id=uuid4(), name="Aperol", category=IngredientCategories.LIQUEURS)
    prosecco = Ingredient(id=uuid4(), name="Prosecco", category=IngredientCategories.WINE)
    tomato_juice = Ingredient(id=uuid4(), name="Tomato Juice", category=IngredientCategories.MIXERS)
    worcestershire_sauce = Ingredient(id=uuid4(), name="Worcestershire Sauce", category=IngredientCategories.OTHER)
    tabasco = Ingredient(id=uuid4(), name="Tabasco", category=IngredientCategories.OTHER)
    ginger_beer = Ingredient(id=uuid4(), name="Ginger Beer", category=IngredientCategories.MIXERS)
    lemon = Ingredient(id=uuid4(), name="Lemon Juice", category=IngredientCategories.OTHER)
    sugar_syrup = Ingredient(id=uuid4(), name="Sugar Syrup", category=IngredientCategories.OTHER)
    amaretto = Ingredient(id=uuid4(), name="Amaretto", category=IngredientCategories.LIQUEURS)
    coconut_cream = Ingredient(id=uuid4(), name="Coconut Cream", category=IngredientCategories.OTHER)
    pineapple_juice = Ingredient(id=uuid4(), name="Pineapple Juice", category=IngredientCategories.MIXERS)
    passion_fruit = Ingredient(id=uuid4(), name="Passion Fruit", category=IngredientCategories.OTHER)
    vanilla_vodka = Ingredient(id=uuid4(), name="Vanilla Vodka", category=IngredientCategories.SPIRITS)
    coffee = Ingredient(id=uuid4(), name="Hot Coffee", category=IngredientCategories.MIXERS)
    cream = Ingredient(id=uuid4(), name="Cream", category=IngredientCategories.OTHER)

    ingredients.extend(
        [
            vodka,
            gin,
            vermouth,
            campari,
            orange_liqueur,
            orange_juice,
            red_bull,
            lime,
            tequila,
            triple_sec,
            whiskey,
            sugar,
            mint,
            soda_water,
            rum,
            cranberry_juice,
            aperol,
            prosecco,
            tomato_juice,
            worcestershire_sauce,
            tabasco,
            ginger_beer,
            lemon,
            sugar_syrup,
            amaretto,
            coconut_cream,
            pineapple_juice,
            passion_fruit,
            vanilla_vodka,
            coffee,
            cream,
        ]
    )

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
            RecipeIngredient(ingredient_uuid=orange_liqueur.id),
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

    dry_martini = Recipe(
        id=uuid4(),
        name="Dry Martini",
        type=RecipeTypes.COCKTAIL,
        category=RecipeCategories.COCKTAIL,
        recipe_steps=[
            "Chill a martini glass.",
            "In a mixing glass, combine 2 1/2 oz gin and 1/2 oz dry vermouth.",
            "Add ice and stir well.",
            "Strain into the chilled martini glass.",
            "Garnish with an olive or a lemon twist.",
        ],
        ingredients=[
            RecipeIngredient(ingredient_uuid=gin.id),
            RecipeIngredient(ingredient_uuid=vermouth.id),
        ],
    )

    whiskey_sour = Recipe(
        id=uuid4(),
        name="Whiskey Sour",
        type=RecipeTypes.COCKTAIL,
        category=RecipeCategories.COCKTAIL,
        recipe_steps=[
            "In a shaker, combine 2 oz whiskey, 3/4 oz lemon juice, and 1/2 oz sugar syrup.",
            "Fill with ice and shake well.",
            "Strain into a rocks glass over ice.",
            "Garnish with a cherry and a slice of orange.",
        ],
        ingredients=[
            RecipeIngredient(ingredient_uuid=whiskey.id),
            RecipeIngredient(ingredient_uuid=lemon.id),
            RecipeIngredient(ingredient_uuid=sugar_syrup.id),
        ],
    )

    aperol_spritz = Recipe(
        id=uuid4(),
        name="Aperol Spritz",
        type=RecipeTypes.COCKTAIL,
        category=RecipeCategories.COCKTAIL,
        recipe_steps=[
            "Fill a wine glass with ice.",
            "Combine 3 oz Aperol, 3 oz prosecco, and a splash of soda water.",
            "Garnish with an orange slice.",
        ],
        ingredients=[
            RecipeIngredient(ingredient_uuid=aperol.id),
            RecipeIngredient(ingredient_uuid=prosecco.id),
            RecipeIngredient(ingredient_uuid=soda_water.id),
        ],
    )

    bloody_mary = Recipe(
        id=uuid4(),
        name="Bloody Mary",
        type=RecipeTypes.COCKTAIL,
        category=RecipeCategories.COCKTAIL,
        recipe_steps=[
            "In a shaker, combine 2 oz vodka, 4 oz tomato juice, 1/2 oz lemon juice, 2 dashes of Worcestershire sauce, 2 dashes of Tabasco, a pinch of salt, and a pinch of pepper.",
            "Roll the mixture back and forth between the shaker and a mixing glass (do not shake).",
            "Strain into an ice-filled highball glass.",
            "Garnish with a celery stick and a lemon wedge.",
        ],
        ingredients=[
            RecipeIngredient(ingredient_uuid=vodka.id),
            RecipeIngredient(ingredient_uuid=tomato_juice.id),
            RecipeIngredient(ingredient_uuid=lemon.id),
            RecipeIngredient(ingredient_uuid=worcestershire_sauce.id),
            RecipeIngredient(ingredient_uuid=tabasco.id),
        ],
    )

    moscow_mule = Recipe(
        id=uuid4(),
        name="Moscow Mule",
        type=RecipeTypes.COCKTAIL,
        category=RecipeCategories.COCKTAIL,
        recipe_steps=[
            "Fill a copper mug with ice.",
            "Add 2 oz vodka and 1/2 oz lime juice.",
            "Top off with ginger beer.",
            "Stir gently and garnish with a lime wheel.",
        ],
        ingredients=[
            RecipeIngredient(ingredient_uuid=vodka.id),
            RecipeIngredient(ingredient_uuid=lime.id),
            RecipeIngredient(ingredient_uuid=ginger_beer.id),
        ],
    )
    mai_tai = Recipe(
        id=uuid4(),
        name="Mai Tai",
        type=RecipeTypes.COCKTAIL,
        category=RecipeCategories.COCKTAIL,
        recipe_steps=[
            "In a shaker, combine 1 oz light rum, 1 oz dark rum, 1/2 oz orange liqueur, 1/2 oz lime juice, 1/4 oz sugar syrup, and 1/4 oz orgeat syrup.",
            "Fill with ice and shake well.",
            "Strain into a rocks glass filled with crushed ice.",
            "Garnish with a mint sprig and a lime wheel.",
        ],
        ingredients=[
            RecipeIngredient(ingredient_uuid=rum.id),  # Light rum
            RecipeIngredient(ingredient_uuid=rum.id),  # Dark rum (should ideally be different)
            RecipeIngredient(ingredient_uuid=orange_liqueur.id),
            RecipeIngredient(ingredient_uuid=lime.id),
            RecipeIngredient(ingredient_uuid=sugar_syrup.id),
        ],
    )

    amaretto_sour = Recipe(
        id=uuid4(),
        name="Amaretto Sour",
        type=RecipeTypes.COCKTAIL,
        category=RecipeCategories.COCKTAIL,
        recipe_steps=[
            "In a shaker, combine 1 1/2 oz amaretto liqueur, 3/4 oz lemon juice, and 1/4 oz sugar syrup.",
            "Fill with ice and shake well.",
            "Strain into a rocks glass filled with ice.",
            "Garnish with a cherry and a slice of lemon.",
        ],
        ingredients=[
            RecipeIngredient(ingredient_uuid=amaretto.id),
            RecipeIngredient(ingredient_uuid=lemon.id),
            RecipeIngredient(ingredient_uuid=sugar_syrup.id),
        ],
    )

    pina_colada = Recipe(
        id=uuid4(),
        name="Piña Colada",
        type=RecipeTypes.COCKTAIL,
        category=RecipeCategories.COCKTAIL,
        recipe_steps=[
            "In a blender, combine 2 oz rum, 1 oz coconut cream, and 1 oz pineapple juice.",
            "Fill with ice and blend until smooth.",
            "Pour into a chilled glass.",
            "Garnish with a pineapple slice and a cherry.",
        ],
        ingredients=[
            RecipeIngredient(ingredient_uuid=rum.id),
            RecipeIngredient(ingredient_uuid=coconut_cream.id),
            RecipeIngredient(ingredient_uuid=pineapple_juice.id),
        ],
    )

    porn_star_martini = Recipe(
        id=uuid4(),
        name="Porn Star Martini",
        type=RecipeTypes.COCKTAIL,
        category=RecipeCategories.COCKTAIL,
        recipe_steps=[
            "In a shaker, combine 1 1/2 oz vanilla vodka, 1/2 oz passion fruit puree, 1/2 oz lime juice, and 1/4 oz sugar syrup.",
            "Fill with ice and shake well.",
            "Strain into a chilled martini glass.",
            "Garnish with a half passion fruit and serve with a shot of prosecco on the side.",
        ],
        ingredients=[
            RecipeIngredient(ingredient_uuid=vanilla_vodka.id),
            RecipeIngredient(ingredient_uuid=passion_fruit.id),
            RecipeIngredient(ingredient_uuid=lime.id),
            RecipeIngredient(ingredient_uuid=sugar_syrup.id),
            RecipeIngredient(ingredient_uuid=prosecco.id),
        ],
    )

    irish_coffee = Recipe(
        id=uuid4(),
        name="Irish Coffee",
        type=RecipeTypes.COCKTAIL,
        category=RecipeCategories.COCKTAIL,
        recipe_steps=[
            "Preheat a glass by filling it with hot water, then empty it.",
            "Add 1 1/2 oz whiskey and 1 tsp sugar to the glass.",
            "Pour in hot coffee and stir until the sugar is dissolved.",
            "Top with lightly whipped cream, pouring it over the back of a spoon so it floats on top.",
        ],
        ingredients=[
            RecipeIngredient(ingredient_uuid=whiskey.id),
            RecipeIngredient(ingredient_uuid=coffee.id),
            RecipeIngredient(ingredient_uuid=sugar.id),
            RecipeIngredient(ingredient_uuid=cream.id),
        ],
    )

    recipes.extend(
        [
            vodka_redbull,
            vodka_screwdriver,
            margarita,
            negroni,
            mojito,
            old_fashioned,
            cosmopolitan,
            dry_martini,
            whiskey_sour,
            aperol_spritz,
            bloody_mary,
            moscow_mule,
            mai_tai,
            amaretto_sour,
            pina_colada,
            porn_star_martini,
            irish_coffee,
        ]
    )

    for recipe in recipes:
        recipe_repository.create(recipe=recipe)


populate_db()
