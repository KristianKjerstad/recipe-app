from typing import List
from uuid import UUID

from data_providers.clients.postgresql_client import postgresql_client
from fastapi import APIRouter
from resources.ingredient.entities.ingredient import Ingredient
from resources.ingredient.repositories.ingredient_repository import IngredientRepository
from resources.ingredient.use_cases.get_all_ingredient_use_case import (
    get_all_ingredients_use_case,
)
from resources.ingredient.use_cases.get_one_ingredient_use_case import (
    get_one_ingredient_use_case,
)

router = APIRouter(tags=["ingredient"], prefix="/ingredients")


@router.get(
    "",
)
async def get_all() -> List[Ingredient]:
    ingredient_repository = IngredientRepository(db_client=postgresql_client)
    return get_all_ingredients_use_case(ingredient_repository=ingredient_repository)


@router.get(
    "/{id}",
)
async def get_one(id: UUID) -> Ingredient:
    ingredient_repository = IngredientRepository(db_client=postgresql_client)
    return get_one_ingredient_use_case(ingredient_repository=ingredient_repository, id=id)
