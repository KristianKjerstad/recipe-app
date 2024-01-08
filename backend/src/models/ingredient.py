from enum import Enum
from uuid import UUID

from pydantic import BaseModel


class IngredientCategories(Enum):
    SOFT_DRINKS = "Soft drinks"
    ALCOHOLIC_BEVERAGE = "Alcoholic beverage"
    FRUIT = "Fruit"


class Ingredient(BaseModel):
    id: UUID
    name: str
    category: IngredientCategories
