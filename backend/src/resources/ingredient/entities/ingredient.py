from enum import Enum
from uuid import UUID

from pydantic import BaseModel


class IngredientCategories(Enum):
    MIXERS = "Mixers"
    SPIRITS = "Spirits"
    LIQUEURS = "Liqueurs"
    WINE = "Wine"
    OTHER = "Other"


class Ingredient(BaseModel):
    id: UUID
    name: str
    category: IngredientCategories
