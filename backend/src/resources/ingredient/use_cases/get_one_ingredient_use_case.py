from uuid import UUID

from resources.ingredient.entities.ingredient import Ingredient
from resources.ingredient.repositories.ingredient_repository import IngredientRepository


def get_one_ingredient_use_case(ingredient_repository: IngredientRepository, id: UUID) -> Ingredient:
    ingredient: Ingredient = ingredient_repository.get(id=id)
    return ingredient
