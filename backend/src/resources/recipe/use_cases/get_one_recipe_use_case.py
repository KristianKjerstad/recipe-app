from uuid import UUID

from resources.recipe.entities.recipe import Recipe
from resources.recipe.repositories.recipe_repository import RecipeRepository


def get_one_recipe_use_case(recipe_repository: RecipeRepository, id: UUID) -> Recipe:
    recipe: Recipe = recipe_repository.get(id=id)
    return recipe
