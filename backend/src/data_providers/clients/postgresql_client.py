from config import config
from sqlalchemy import create_engine

connection_string = f"postgresql://{config.POSTGRES_USER}:{config.POSTGRES_PASSWORD}@{config.POSTGRES_HOST}:{config.POSTGRES_PORT}/{config.POSTGRES_DATABASE}"

postgresql_engine = create_engine(connection_string)


try:
    with postgresql_engine.connect() as connection_str:
        print("Successfully connected to the PostgreSQL database")
except Exception as ex:
    print(f"Sorry failed to connect: {ex}")
