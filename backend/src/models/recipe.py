from enum import Enum
from typing import List
from uuid import UUID

from pydantic import BaseModel


class RecipeTypes(Enum):
    COCKTAIL = "cocktail"
    appetizer = "appteizer"
    MAIN_COURSE = "main_course"
    DESSERT = "dessert"


class Recipe(BaseModel):
    id: UUID
    type: RecipeTypes
    name: str
    category: str
    ingredient_ids: List[UUID] = []
    recipe_steps: List[str]
