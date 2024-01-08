import uvicorn
from config import config
from fastapi import APIRouter, FastAPI
from resources.recipe import recipe_resource

app = FastAPI()

public_routes = APIRouter()
public_routes.include_router(recipe_resource.router)
app.include_router(public_routes)


@app.get("/")
def read_root():
    return {"Hello": "World"}


if __name__ == "__main__":
    uvicorn.run("main:app", host=config.HOST, port=config.PORT, reload=True)
