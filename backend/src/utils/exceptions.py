from fastapi import HTTPException
from starlette import status as request_status

credentials_exception = HTTPException(
    status_code=request_status.HTTP_401_UNAUTHORIZED,
    detail="Token validation failed",
    headers={"WWW-Authenticate": "Bearer"},
)
