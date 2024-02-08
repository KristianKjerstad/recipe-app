from enum import Enum
from typing import List
from uuid import UUID

from pydantic import BaseModel


class RecipeTypes(Enum):
    COCKTAIL = "cocktail"
    appetizer = "appteizer"
    MAIN_COURSE = "main_course"
    DESSERT = "dessert"


class RecipeCategories(Enum):
    APPETIZER = "appetizer"
    COCKTAIL = "cocktail"


class RecipeIngredient(BaseModel):
    ingredient_uuid: UUID
    ingredient_quantity: str


class Recipe(BaseModel):
    id: UUID
    type: RecipeTypes
    name: str
    category: RecipeCategories
    ingredients: List[RecipeIngredient] = []
    recipe_steps: List[str]
