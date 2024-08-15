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


def add_drink_recipes(ingredient_repository, recipe_repository):
    ingredients: List[Ingredient] = []
    vodka = Ingredient(id=uuid4(), name="Vodka", category=IngredientCategories.SPIRITS)
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
    sugar = Ingredient(id=uuid4(), name="Sugar (Sweetener)", category=IngredientCategories.OTHER)
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
        image_link="https://www.liquor.com/thmb/eHua9S0mKZ6n3KZRKBwt9vh7mgM=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/__opt__aboutcom__coeus__resources__content_migration__liquor__2016__12__22114511__vodka-red-bull-720x720-recipe-b16a667ca354445799610e39be61e40a.jpg",
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
        image_link="https://www.thecocktaildb.com/images/media/drink/8xnyke1504352207.jpg",
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
        image_link="https://www.thecocktaildb.com/images/media/drink/5noda61589575158.jpg",
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
        image_link="https://www.thecocktaildb.com/images/media/drink/qgdu971561574065.jpg",
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
        image_link="https://www.thecocktaildb.com/images/media/drink/metwgh1606770327.jpg",
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
        image_link="https://www.thecocktaildb.com/images/media/drink/vrwquq1478252802.jpg",
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
        image_link="https://www.thecocktaildb.com/images/media/drink/kpsajh1504368362.jpg",
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
        image_link="https://www.thecocktaildb.com/images/media/drink/6ck9yi1589574317.jpg",
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
        image_link="https://www.thecocktaildb.com/images/media/drink/hbkfsh1589574990.jpg",
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
        image_link="https://www.thecocktaildb.com/images/media/drink/iloasq1587661955.jpg",
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
        image_link="https://www.thecocktaildb.com/images/media/drink/t6caa21582485702.jpg",
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
        image_link="https://www.thecocktaildb.com/images/media/drink/3pylqc1504370988.jpg",
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
        image_link="https://www.thecocktaildb.com/images/media/drink/twyrrp1439907470.jpg",
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
        image_link="https://www.thecocktaildb.com/images/media/drink/xnzc541493070211.jpg",
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
        image_link="https://www.thecocktaildb.com/images/media/drink/upgsue1668419912.jpg",
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
        image_link="https://www.thecocktaildb.com/images/media/drink/xjhjdf1630406071.jpg",
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
        image_link="https://www.thecocktaildb.com/images/media/drink/sywsqw1439906999.jpg",
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


def add_food_recipes(ingredient_repository, recipe_repository):
    chicken = Ingredient(id=uuid4(), name="Chicken", category=IngredientCategories.MEAT)
    onion = Ingredient(id=uuid4(), name="Onion", category=IngredientCategories.VEGETABLES_AND_FRUIT)
    garlic = Ingredient(id=uuid4(), name="Garlic", category=IngredientCategories.VEGETABLES_AND_FRUIT)
    ginger = Ingredient(id=uuid4(), name="Ginger", category=IngredientCategories.VEGETABLES_AND_FRUIT)
    tomato = Ingredient(id=uuid4(), name="Tomato", category=IngredientCategories.VEGETABLES_AND_FRUIT)
    curry_powder = Ingredient(id=uuid4(), name="Curry Powder", category=IngredientCategories.CONDIMENTS)
    coconut_milk = Ingredient(id=uuid4(), name="Coconut Milk", category=IngredientCategories.PANTRY_ESSENTIALS)
    salt = Ingredient(id=uuid4(), name="Salt", category=IngredientCategories.CONDIMENTS)
    pepper = Ingredient(id=uuid4(), name="Pepper", category=IngredientCategories.CONDIMENTS)
    oil = Ingredient(id=uuid4(), name="Oil", category=IngredientCategories.PANTRY_ESSENTIALS)
    flour = Ingredient(id=uuid4(), name="Flour", category=IngredientCategories.PANTRY_ESSENTIALS)
    milk = Ingredient(id=uuid4(), name="Milk", category=IngredientCategories.PANTRY_ESSENTIALS)
    eggs = Ingredient(id=uuid4(), name="Eggs", category=IngredientCategories.PANTRY_ESSENTIALS)
    butter = Ingredient(id=uuid4(), name="Butter", category=IngredientCategories.PANTRY_ESSENTIALS)
    sugar = Ingredient(id=uuid4(), name="Sugar", category=IngredientCategories.PANTRY_ESSENTIALS)
    chili_powder = Ingredient(id=uuid4(), name="Chili Powder", category=IngredientCategories.CONDIMENTS)
    cumin = Ingredient(id=uuid4(), name="Cumin", category=IngredientCategories.CONDIMENTS)
    tomato_paste = Ingredient(id=uuid4(), name="Tomato Paste", category=IngredientCategories.PANTRY_ESSENTIALS)
    heavy_cream = Ingredient(id=uuid4(), name="Heavy Cream", category=IngredientCategories.PANTRY_ESSENTIALS)
    cilantro = Ingredient(id=uuid4(), name="Cilantro", category=IngredientCategories.VEGETABLES_AND_FRUIT)
    kidney_beans = Ingredient(id=uuid4(), name="Kidney Beans", category=IngredientCategories.PANTRY_ESSENTIALS)
    paprika = Ingredient(id=uuid4(), name="Paprika", category=IngredientCategories.CONDIMENTS)
    salmon = Ingredient(id=uuid4(), name="Salmon", category=IngredientCategories.MEAT)
    pasta = Ingredient(id=uuid4(), name="Pasta", category=IngredientCategories.PANTRY_ESSENTIALS)
    cream = Ingredient(id=uuid4(), name="Double cream", category=IngredientCategories.PANTRY_ESSENTIALS)
    dill = Ingredient(id=uuid4(), name="Dill", category=IngredientCategories.CONDIMENTS)
    lemon = Ingredient(id=uuid4(), name="Lemon", category=IngredientCategories.VEGETABLES_AND_FRUIT)
    ground_beef = Ingredient(id=uuid4(), name="Ground Beef", category=IngredientCategories.MEAT)
    lasagna_noodles = Ingredient(id=uuid4(), name="Lasagna Noodles", category=IngredientCategories.PANTRY_ESSENTIALS)
    ricotta_cheese = Ingredient(id=uuid4(), name="Ricotta Cheese", category=IngredientCategories.PANTRY_ESSENTIALS)
    mozzarella_cheese = Ingredient(
        id=uuid4(), name="Mozzarella Cheese", category=IngredientCategories.PANTRY_ESSENTIALS
    )
    parmesan_cheese = Ingredient(id=uuid4(), name="Parmesan Cheese", category=IngredientCategories.PANTRY_ESSENTIALS)
    marinara_sauce = Ingredient(id=uuid4(), name="Marinara Sauce", category=IngredientCategories.PANTRY_ESSENTIALS)
    basil = Ingredient(id=uuid4(), name="Basil", category=IngredientCategories.CONDIMENTS)
    oregano = Ingredient(id=uuid4(), name="Oregano", category=IngredientCategories.CONDIMENTS)

    ingredients = [
        chicken,
        onion,
        garlic,
        ginger,
        tomato,
        curry_powder,
        coconut_milk,
        salt,
        pepper,
        oil,
        salmon,
        pasta,
        cream,
        dill,
        lemon,
        ground_beef,
        lasagna_noodles,
        ricotta_cheese,
        mozzarella_cheese,
        parmesan_cheese,
        marinara_sauce,
        basil,
        oregano,
        flour,
        cilantro,
        kidney_beans,
        paprika,
        milk,
        eggs,
        butter,
        sugar,
        chili_powder,
        cumin,
        tomato_paste,
        heavy_cream,
    ]
    for ingredient in ingredients:
        ingredient_repository.create(ingredient=ingredient)

    chicken_curry = Recipe(
        id=uuid4(),
        name="Chicken Curry",
        type=RecipeTypes.MAIN_COURSE,
        category=RecipeCategories.FOOD,
        image_link="https://www.themealdb.com/images/media/meals/yxsurp1511304301.jpg",
        recipe_steps=[
            "Heat oil in a pot and sauté 1 onion, 2 cloves of garlic, and a 1 inch piece of ginger until golden.",
            "Add 500g chicken and cook until browned.",
            "Stir in curry powder, 1 can of tomatoes and a pinch of salt and pepper.",
            "Pour in 400ml coconut milk and simmer until chicken is cooked through.",
            "Serve with rice.",
        ],
        ingredients=[
            RecipeIngredient(ingredient_uuid=chicken.id),
            RecipeIngredient(ingredient_uuid=onion.id),
            RecipeIngredient(ingredient_uuid=garlic.id),
            RecipeIngredient(ingredient_uuid=ginger.id),
            RecipeIngredient(ingredient_uuid=tomato.id),
            RecipeIngredient(ingredient_uuid=curry_powder.id),
            RecipeIngredient(ingredient_uuid=coconut_milk.id),
            RecipeIngredient(ingredient_uuid=salt.id),
            RecipeIngredient(ingredient_uuid=pepper.id),
            RecipeIngredient(ingredient_uuid=oil.id),
        ],
    )

    pasta_with_salmon = Recipe(
        id=uuid4(),
        name="Pasta with Salmon",
        type=RecipeTypes.MAIN_COURSE,
        category=RecipeCategories.FOOD,
        image_link="https://www.themealdb.com/images/media/meals/wvqpwt1468339226.jpg",
        recipe_steps=[
            "Cook 400g pasta according to package instructions.",
            "In a pan, cook 2 filets of salmon until flaky.",
            "Add 300ml cream, a pinch of dill, and lemon juice from one lemon to the salmon and stir until combined.",
            "Mix the cooked pasta with the salmon sauce and serve.",
        ],
        ingredients=[
            RecipeIngredient(ingredient_uuid=salmon.id),
            RecipeIngredient(ingredient_uuid=pasta.id),
            RecipeIngredient(ingredient_uuid=cream.id),
            RecipeIngredient(ingredient_uuid=dill.id),
            RecipeIngredient(ingredient_uuid=lemon.id),
        ],
    )

    lasagna = Recipe(
        id=uuid4(),
        name="Lasagna",
        type=RecipeTypes.MAIN_COURSE,
        category=RecipeCategories.FOOD,
        image_link="https://www.themealdb.com/images/media/meals/rvxxuy1468312893.jpg",
        recipe_steps=[
            "Preheat oven to 375°F (190°C).",
            "In a pan, cook 400g ground beef until browned.",
            "Layer lasagna noodles, marinara sauce, ricotta cheese, mozzarella, and ground beef in a baking dish.",
            "Repeat layers and top with parmesan cheese.",
            "Bake for 45 minutes or until golden and bubbling.",
            "Garnish with basil and oregano.",
        ],
        ingredients=[
            RecipeIngredient(ingredient_uuid=ground_beef.id),
            RecipeIngredient(ingredient_uuid=lasagna_noodles.id),
            RecipeIngredient(ingredient_uuid=ricotta_cheese.id),
            RecipeIngredient(ingredient_uuid=mozzarella_cheese.id),
            RecipeIngredient(ingredient_uuid=parmesan_cheese.id),
            RecipeIngredient(ingredient_uuid=marinara_sauce.id),
            RecipeIngredient(ingredient_uuid=basil.id),
            RecipeIngredient(ingredient_uuid=oregano.id),
        ],
    )

    pancake = Recipe(
        id=uuid4(),
        name="Pancakes",
        type=RecipeTypes.BREAKFAST,
        category=RecipeCategories.FOOD,
        image_link="https://www.themealdb.com/images/media/meals/rwuyqx1511383174.jpg",
        recipe_steps=[
            "In a bowl, whisk together flour, sugar, and salt.",
            "In another bowl, beat eggs and milk together.",
            "Combine wet and dry ingredients, then mix in melted butter.",
            "Heat a skillet and pour batter to form pancakes.",
            "Cook until bubbles form, then flip and cook until golden.",
        ],
        ingredients=[
            RecipeIngredient(ingredient_uuid=flour.id),
            RecipeIngredient(ingredient_uuid=milk.id),
            RecipeIngredient(ingredient_uuid=eggs.id),
            RecipeIngredient(ingredient_uuid=sugar.id),
            RecipeIngredient(ingredient_uuid=salt.id),
            RecipeIngredient(ingredient_uuid=butter.id),
        ],
    )

    chili_con_carne = Recipe(
        id=uuid4(),
        name="Chili Con Carne",
        type=RecipeTypes.MAIN_COURSE,
        category=RecipeCategories.FOOD,
        image_link="https://www.themealdb.com/images/media/meals/uwxqwy1483389553.jpg",
        recipe_steps=[
            "In a large pot, heat oil and sauté onions, garlic, and ground beef until browned.",
            "Add chili powder, cumin, paprika, salt, and pepper, and stir well.",
            "Stir in tomato paste, tomatoes, and kidney beans.",
            "Simmer for 30 minutes, stirring occasionally.",
            "Serve with cilantro on top.",
        ],
        ingredients=[
            RecipeIngredient(ingredient_uuid=ground_beef.id),
            RecipeIngredient(ingredient_uuid=onion.id),
            RecipeIngredient(ingredient_uuid=garlic.id),
            RecipeIngredient(ingredient_uuid=chili_powder.id),
            RecipeIngredient(ingredient_uuid=cumin.id),
            RecipeIngredient(ingredient_uuid=paprika.id),
            RecipeIngredient(ingredient_uuid=tomato_paste.id),
            RecipeIngredient(ingredient_uuid=tomato.id),
            RecipeIngredient(ingredient_uuid=kidney_beans.id),
            RecipeIngredient(ingredient_uuid=cilantro.id),
            RecipeIngredient(ingredient_uuid=oil.id),
            RecipeIngredient(ingredient_uuid=salt.id),
            RecipeIngredient(ingredient_uuid=pepper.id),
        ],
    )

    butter_chicken = Recipe(
        id=uuid4(),
        name="Butter Chicken",
        type=RecipeTypes.MAIN_COURSE,
        category=RecipeCategories.FOOD,
        image_link="https://images.pexels.com/photos/7625056/pexels-photo-7625056.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        recipe_steps=[
            "Marinate 500g of chicken with 1 cup of yogurt,  2 cloves of garlic, 1 inch piece of ginger, chili powder, and salt.",
            "In a pan, cook 1 onion in butter until golden.",
            "Add marinated chicken and cook until done.",
            "Add 3 tbsp tomato paste, 300ml heavy cream, and spices, and simmer until thickened.",
            "Garnish with cilantro and serve with naan or rice.",
        ],
        ingredients=[
            RecipeIngredient(ingredient_uuid=chicken.id),
            RecipeIngredient(ingredient_uuid=onion.id),
            RecipeIngredient(ingredient_uuid=garlic.id),
            RecipeIngredient(ingredient_uuid=chili_powder.id),
            RecipeIngredient(ingredient_uuid=tomato_paste.id),
            RecipeIngredient(ingredient_uuid=heavy_cream.id),
            RecipeIngredient(ingredient_uuid=cumin.id),
            RecipeIngredient(ingredient_uuid=cilantro.id),
            RecipeIngredient(ingredient_uuid=butter.id),
            RecipeIngredient(ingredient_uuid=salt.id),
        ],
    )

    # Add all recipes to the repository
    recipes = [chicken_curry, pasta_with_salmon, lasagna, pancake, chili_con_carne, butter_chicken]
    for recipe in recipes:
        recipe_repository.create(recipe=recipe)


def populate_db():
    db_client = PostgresqlClient()
    ingredient_repository = IngredientRepository(db_client=db_client)
    recipe_repository = RecipeRepository(db_client=db_client)

    delete_association_table(db_client)
    delete_ingredient_table(db_client)
    delete_recipe_table(db_client)

    add_drink_recipes(ingredient_repository=ingredient_repository, recipe_repository=recipe_repository)
    add_food_recipes(ingredient_repository=ingredient_repository, recipe_repository=recipe_repository)


populate_db()
