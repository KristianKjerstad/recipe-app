import ast
from os import getenv


class Config:
    POSTGRES_USER = getenv("POSTGRES_USER", "None")
    POSTGRES_PASSWORD = getenv("POSTGRES_PASSWORD", "None")
    POSTGRES_HOST = getenv("POSTGRES_HOST", "None")
    POSTGRES_PORT = int(getenv("POSTGRES_PORT", 5432))
    POSTGRES_DATABASE = getenv("POSTGRES_DATABASE", "None")
    PORT = int(getenv("PORT", 5000))
    HOST = getenv("HOST", "0.0.0.0")  # nosec
    AUTH_ENABLED = ast.literal_eval(getenv("AUTH_ENABLED", "True"))
    JWT_VERIFICATION_KEY = getenv("JWT_VERIFICATION_KEY", "None")
    OAUTH_AUDIENCE = "recipe-app"


config = Config()
