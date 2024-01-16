from typing import List

from resources.recipe.entities.recipe import Recipe
from resources.recipe.repositories.recipe_repository import RecipeRepository


def get_all_recipes_use_case(recipe_repository: RecipeRepository) -> List[Recipe]:
    recipes: List[Recipe] = recipe_repository.get_all()
    return recipes
