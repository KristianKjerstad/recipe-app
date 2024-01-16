from typing import List
from uuid import UUID

from fastapi import APIRouter, Depends
from resources.ingredient.entities.ingredient import Ingredient
from resources.ingredient.repositories.ingredient_repository import (
    IngredientRepository,
    get_ingredient_repository,
)
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
async def get_all(ingredient_repository: IngredientRepository = Depends(get_ingredient_repository)) -> List[Ingredient]:
    return get_all_ingredients_use_case(ingredient_repository=ingredient_repository)


@router.get(
    "/{id}",
)
async def get_one(
    id: UUID, ingredient_repository: IngredientRepository = Depends(get_ingredient_repository)
) -> Ingredient:
    return get_one_ingredient_use_case(ingredient_repository=ingredient_repository, id=id)
