from abc import abstractmethod
from typing import Generic, List, TypeVar

# Type definition for Model
Model = TypeVar("Model")

# Type definition for Unique Id
Id = TypeVar("Id", bound=str)


class RepositoryInterface(Generic[Model, Id]):
    @abstractmethod
    def create(self, instance: Model) -> Model:
        pass

    @abstractmethod
    def get(self, id: Id) -> Model:
        pass

    @abstractmethod
    def get_all(self) -> List[Model]:
        pass

    @abstractmethod
    def delete(self, id: Id) -> None:
        pass

    @abstractmethod
    def delete_all(self) -> None:
        pass
