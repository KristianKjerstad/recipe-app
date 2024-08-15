from enum import Enum
from uuid import UUID

from pydantic import BaseModel


class IngredientCategories(Enum):
    # Cocktails
    MIXERS = "Mixers"
    SPIRITS = "Spirits"
    LIQUEURS = "Liqueurs"
    WINE = "Wine"
    OTHER = "Other"
    # Food
    MEAT = "Meat"
    VEGETABLES_AND_FRUIT = "Vegetables and Fruits"
    CONDIMENTS = "Condiments"
    PANTRY_ESSENTIALS = "Pantry Essentials"
    OTHER_FOOD = "Other Food"


class Ingredient(BaseModel):
    id: UUID
    name: str
    category: IngredientCategories
