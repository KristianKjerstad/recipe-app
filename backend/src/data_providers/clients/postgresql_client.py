import uuid

from config import config
from psycopg2 import ProgrammingError
from sqlalchemy import (
    JSON,
    UUID,
    Column,
    ForeignKey,
    MetaData,
    String,
    Table,
    create_engine,
)

connection_string = f"postgresql://{config.POSTGRES_USER}:{config.POSTGRES_PASSWORD}@{config.POSTGRES_HOST}:{config.POSTGRES_PORT}/{config.POSTGRES_DATABASE}"

postgresql_engine = create_engine(connection_string, echo=True)


class PostgresqlClient:
    def __init__(self, db_engine=postgresql_engine):
        self.db_engine = db_engine
        self.db_connection = db_engine.connect()
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
        )

        tables_exist = db_engine.dialect.has_table(self.db_connection, "recipe") and db_engine.dialect.has_table(
            self.db_connection, "ingredient"
        )
        if not tables_exist:
            try:
                metadata.create_all(db_engine)
                print("Tables 'recipe' and 'ingredient' created successfully.")
            except ProgrammingError as e:
                print(f"Error creating tables: {e}")
        else:
            print("Tables 'recipe' and 'ingredient' already exist. Doing nothing.")


postgresql_client = PostgresqlClient()
