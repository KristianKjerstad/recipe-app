from typing import List
from uuid import UUID

from data_providers.clients.postgresql_client import postgresql_client
from fastapi import APIRouter
from resources.recipe.entities.recipe import Recipe
from resources.recipe.repositories.recipe_repository import RecipeRepository
from resources.recipe.use_cases.get_all_recipes_use_case import get_all_recipes_use_case
from resources.recipe.use_cases.get_one_recipe_use_case import get_one_recipe_use_case

router = APIRouter(tags=["recipe"], prefix="/recipes")


@router.get(
    "",
)
async def get_all() -> List[Recipe]:
    recipe_repository = RecipeRepository(db_client=postgresql_client)
    return get_all_recipes_use_case(recipe_repository=recipe_repository)


@router.get(
    "/{id}",
)
async def get_one(id: UUID) -> Recipe:
    recipe_repository = RecipeRepository(db_client=postgresql_client)
    return get_one_recipe_use_case(recipe_repository=recipe_repository, id=id)
