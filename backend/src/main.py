import uvicorn
from authentication.authentication import auth_with_jwt
from config import config
from fastapi import APIRouter, FastAPI, Security
from fastapi.middleware.cors import CORSMiddleware
from resources.ingredient import ingredient_resource
from resources.recipe import recipe_resource

app = FastAPI()

origins = [
    "https://recipe-app-frontend-ochre.vercel.app",
    "http://localhost",
    "http://localhost:5173",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

public_routes = APIRouter()
authenticated_routes = APIRouter()
authenticated_routes.include_router(recipe_resource.router)
authenticated_routes.include_router(ingredient_resource.router)
app.include_router(public_routes)
app.include_router(authenticated_routes, dependencies=[Security(auth_with_jwt)])


@app.get("/")
def read_root():
    return {"Hello": "World"}


if __name__ == "__main__":
    uvicorn.run("main:app", host=config.HOST, port=config.PORT, reload=True)
