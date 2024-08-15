from enum import Enum
from typing import List
from uuid import UUID

from pydantic import BaseModel


class RecipeTypes(Enum):
    COCKTAIL = "cocktail"
    appetizer = "appteizer"
    MAIN_COURSE = "main_course"
    DESSERT = "dessert"
    BREAKFAST = "breakfast"


class RecipeCategories(Enum):
    COCKTAIL = "cocktail"
    FOOD = "food"


class RecipeIngredient(BaseModel):
    ingredient_uuid: UUID


class Recipe(BaseModel):
    id: UUID
    type: RecipeTypes
    name: str
    category: RecipeCategories
    ingredients: List[RecipeIngredient] = []
    recipe_steps: List[str]
    image_link: str
