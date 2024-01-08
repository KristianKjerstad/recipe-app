# import pytest
from data_providers.clients.ingredient_client import postgresql_engine
from data_providers.clients.postgresql_client import PostgresqlClient


def test_postgres_connection():
    with postgresql_engine.connect() as connection_str:
        print("Successfully connected to the PostgreSQL database")


def test_initialize_postgresql_client():
    PostgresqlClient()
