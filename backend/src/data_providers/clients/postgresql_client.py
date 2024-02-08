import uuid
from typing import Any, Union

from config import config
from data_providers.client_interface import ClientInterface, ExecuteAlternatives
from psycopg2 import ProgrammingError
from sqlalchemy import (
    JSON,
    UUID,
    Column,
    ForeignKey,
    MetaData,
    Result,
    Row,
    Sequence,
    String,
    Table,
    create_engine,
)
from sqlalchemy.orm import sessionmaker

connection_string = f"postgresql://{config.POSTGRES_USER}:{config.POSTGRES_PASSWORD}@{config.POSTGRES_HOST}:{config.POSTGRES_PORT}/{config.POSTGRES_DATABASE}"

postgresql_engine = create_engine(connection_string, echo=True, pool_timeout=15)


class PostgresqlClient(ClientInterface):
    def __init__(self, db_engine=postgresql_engine):
        self.db_engine = db_engine
        self.db_connection = db_engine.connect()
        Session = sessionmaker(bind=self.db_engine)
        self.session = Session()
        metadata = MetaData()

        self.recipe_table = Table(
            "recipe",
            metadata,
            Column("id", UUID(as_uuid=True), default=uuid.uuid4, primary_key=True, nullable=False),
            Column("type", String, nullable=False),
            Column("name", String, nullable=False, unique=True),
            Column("category", String, nullable=False),
            Column("recipe_steps", JSON),
        )

        self.ingredient_table = Table(
            "ingredient",
            metadata,
            Column("id", UUID(as_uuid=True), default=uuid.uuid4, primary_key=True, nullable=False),
            Column("name", String, nullable=False, unique=True),
            Column("category", String, nullable=False),
        )

        self.recipe_ingredient_association = Table(
            "recipe_ingredient_association",
            metadata,
            Column("recipe_id", UUID(as_uuid=True), ForeignKey("recipe.id", ondelete="CASCADE")),
            Column("ingredient_id", UUID(as_uuid=True), ForeignKey("ingredient.id", ondelete="CASCADE")),
            Column("ingredient_quantity", String, nullable=False),
        )

        tables_exist = (
            db_engine.dialect.has_table(self.db_connection, "recipe")
            and db_engine.dialect.has_table(self.db_connection, "ingredient")
            and db_engine.dialect.has_table(self.db_connection, "recipe_ingredient_association")
        )
        if not tables_exist:
            try:
                metadata.create_all(db_engine)
                print("Tables 'recipe' and 'ingredient' created successfully.")
            except ProgrammingError as e:
                print(f"Error creating tables: {e}")
        else:
            print("Tables 'recipe' and 'ingredient' already exist. Doing nothing.")

    def execute_statement(
        self, statement: Any, execute_alternative: Union[ExecuteAlternatives, None] = None
    ) -> Union[Row[Any], Result[Any], Sequence[Row[Any]], None]:
        try:
            if execute_alternative == ExecuteAlternatives.FETCH_ONE:
                result = self.session.execute(statement).fetchone()
            elif execute_alternative == ExecuteAlternatives.FETCH_ALL:
                result = self.session.execute(statement).fetchall()
            else:
                result = self.session.execute(statement)  # can generic type be used?
            self.session.commit()
            self.session.close()
        finally:
            self.db_connection.close()
        return result

    def delete_all_recipes(self):
        delete_statement = self.recipe_table.delete()
        self.execute_statement(delete_statement)

    def delete_all_ingredients(self):
        delete_statement = self.ingredient_table.delete()
        self.execute_statement(delete_statement)


postgresql_client = PostgresqlClient()
