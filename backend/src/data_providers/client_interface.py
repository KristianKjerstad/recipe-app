from abc import abstractmethod
from enum import Enum
from typing import Any, Union

from sqlalchemy import Result, Row, Sequence, Table


class ExecuteAlternatives(Enum):
    FETCH_ONE = "fetch_one"
    FETCH_ALL = "fetch_all"


class ClientInterface:
    recipe_table: Table
    ingredient_table: Table
    recipe_ingredient_association: Table
    session: Any

    @abstractmethod
    def execute_statement(
        self, statement: Any, execute_alternative: Union[ExecuteAlternatives, None] = None
    ) -> Union[Row[Any], Result[Any], Sequence[Row[Any]], None]:
        pass

    @abstractmethod
    def delete_all_recipes(self):
        pass

    @abstractmethod
    def delete_all_ingredients(self):
        pass
