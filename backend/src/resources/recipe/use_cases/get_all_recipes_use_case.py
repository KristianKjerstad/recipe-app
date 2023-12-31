from typing import List

from models.recipe import Recipe
from resources.recipe.repositories.recipe_client import RecipeClient


def get_all_recipes_use_case(recipe_client: RecipeClient) -> List[Recipe]:
    recipes: List[Recipe] = recipe_client.get_all()
    return recipes
