from typing import List

from data_providers.clients.ingredient_client import IngredientClient
from models.ingredient import Ingredient


def get_all_ingredients_use_case(ingredient_client: IngredientClient) -> List[Ingredient]:
    ingredients: List[Ingredient] = ingredient_client.get_all()
    return ingredients
