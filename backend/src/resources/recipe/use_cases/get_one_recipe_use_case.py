from uuid import UUID

from resources.recipe.entities.recipe import Recipe
from resources.recipe.repositories.recipe_client import RecipeClient


def get_one_recipe_use_case(recipe_client: RecipeClient, id: UUID) -> Recipe:
    recipe: Recipe = recipe_client.get(id=id)
    return recipe
