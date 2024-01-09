import jwt
from config import config
from fastapi import Security
from fastapi.security import OAuth2AuthorizationCodeBearer
from utils.exceptions import credentials_exception

oauth2_scheme = OAuth2AuthorizationCodeBearer(
    authorizationUrl="",
    tokenUrl="",
    auto_error=False,
)


def auth_with_jwt(jwt_token: str = Security(oauth2_scheme)) -> None:
    if not config.AUTH_ENABLED:
        return
    if not jwt_token:
        raise credentials_exception
    try:
        jwt.decode(jwt_token, config.JWT_VERIFICATION_KEY, algorithms=["HS256"], audience=config.OAUTH_AUDIENCE)

    except Exception as error:
        raise credentials_exception

    return
