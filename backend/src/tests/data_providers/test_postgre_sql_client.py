# import pytest
from data_providers.clients.postgresql_client import postgresql_engine


def test_postgres_connection():
    with postgresql_engine.connect() as connection_str:
        print("Successfully connected to the PostgreSQL database")
    pass
