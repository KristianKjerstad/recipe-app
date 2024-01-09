from uuid import UUID

from data_providers.clients.ingredient_client import IngredientClient
from models.ingredient import Ingredient


def get_one_ingredient_use_case(ingredient_client: IngredientClient, id: UUID) -> Ingredient:
    ingredient: Ingredient = ingredient_client.get(id=id)
    return ingredient
