from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
from pydantic import BaseModel

from bd import banco

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Item(BaseModel):
    nome: str
    ingredientes: str
    e_bom: bool
    foto: any

@app.post("/items/")
async def create_item(item: Item):
    banco.insertValues(item.nome, item.ingredientes, item.e_bom, item.foto)
    banco.printTable()
    return {"response": 'Adicionado com sucesso!'}

@app.get("/items/{item_id}")
async def read_item(item_id: int, query_param: str = None):
    return {"item_id": item_id, "query_param": query_param}

@app.get("/")
async def hi():
    return {"response": "to funcionando"}