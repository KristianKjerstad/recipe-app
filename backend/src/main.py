from os import getenv
from typing import Union

import uvicorn
from fastapi import FastAPI

app = FastAPI()


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/items/{item_id}")
def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}


if __name__ == "__main__":
    port = int(getenv("PORT", 5000))
    host = getenv("HOST", "0.0.0.0")  # nosec
    uvicorn.run("main:app", host=host, port=port, reload=True)
