from models.ingredient import Ingredient
from pydantic import BaseModel


class Recipe(BaseModel):
    id: str
    type: str
    name: str
    category: str
    ingredients: list[Ingredient]
    recipe_steps: list[str]
