from uuid import UUID

from pydantic import BaseModel


class Ingredient(BaseModel):
    id: UUID
    name: str
    category: str
