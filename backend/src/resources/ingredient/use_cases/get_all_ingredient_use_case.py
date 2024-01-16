from typing import List

from resources.ingredient.entities.ingredient import Ingredient
from resources.ingredient.repositories.ingredient_repository import IngredientRepository


def get_all_ingredients_use_case(ingredient_repository: IngredientRepository) -> List[Ingredient]:
    ingredients: List[Ingredient] = ingredient_repository.get_all()
    return ingredients
