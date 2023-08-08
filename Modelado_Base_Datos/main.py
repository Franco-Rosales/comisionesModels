from fastapi import FastAPI
from db import create_tables


app = FastAPI()

create_tables()


@app.get("/")
def home():
    return {"message": "Hello World"}