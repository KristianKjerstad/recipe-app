from data_providers.clients.postgresql_client import PostgresqlClient, postgresql_engine


def test_postgres_connection():
    with postgresql_engine.connect() as connection_str:
        print("Successfully connected to the PostgreSQL database")


def test_initialize_postgresql_client():
    PostgresqlClient()
