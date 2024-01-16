from typing import List
from uuid import UUID

from fastapi import APIRouter, Depends
from resources.recipe.entities.recipe import Recipe
from resources.recipe.repositories.recipe_repository import (
    RecipeRepository,
    get_recipe_repository,
)
from resources.recipe.use_cases.get_all_recipes_use_case import get_all_recipes_use_case
from resources.recipe.use_cases.get_one_recipe_use_case import get_one_recipe_use_case

router = APIRouter(tags=["recipe"], prefix="/recipes")


@router.get(
    "",
)
async def get_all(recipe_repository: RecipeRepository = Depends(get_recipe_repository)) -> List[Recipe]:
    return get_all_recipes_use_case(recipe_repository=recipe_repository)


@router.get(
    "/{id}",
)
async def get_one(id: UUID, recipe_repository: RecipeRepository = Depends(get_recipe_repository)) -> Recipe:
    return get_one_recipe_use_case(recipe_repository=recipe_repository, id=id)
