import sqlite3
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

app = FastAPI()

origins = [
    "*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class DadosAtualizacao(BaseModel):
    nome: str
    e_bom: str


class Item(BaseModel):
    nome: str
    e_bom: str


conn = sqlite3.connect('/data/pudimManager.db')
cursor = conn.cursor()


def insertValues(nome, e_bom):
    cursor.execute('''
    INSERT INTO pudins (nome,  e_bom)
    VALUES
    (?, ?)
    ''', (nome, e_bom))
    return {"message": "Adicionado com sucesso!"}


def printTable():
    values = []
    cursor.execute("SELECT * FROM pudins")
    resultados = cursor.fetchall()
    for linha in resultados:
        id, nome, e_bom = linha
        objeto = {
            "id": id,
            "nome": nome,
            "e_bom": e_bom
        }
        values.append(objeto)
    return values


def getValue(id: int):
    cursor.execute(f"SELECT * FROM pudins WHERE id = {id}")
    values = []
    result = cursor.fetchall()
    for linha in result:
        values.append(linha)
    return values


def changeValue(id: int, nome: str, e_bom: str):
    cursor = conn.cursor()
    cursor.execute('''
    UPDATE pudins SET nome = ?, e_bom = ?
    WHERE id = ?
    ''', (nome, e_bom, id))
    return {"message": "Atualizado com sucesso!"}


@app.get("/items")
async def getAllValues():
    return printTable()


@app.post("/cadastro")
async def insertValue(item: Item):
    return insertValues(item.nome, item.e_bom)


@app.put("/cadastro/{item_id}")
async def changeValues(item_id: int, dados: DadosAtualizacao):
    try:
        return changeValue(item_id, dados.nome, dados.e_bom)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.delete("/remove/{item_id}")
async def delete_item(item_id: int):
    try:
        cursor.execute("DELETE FROM pudins WHERE id = ?", (item_id,))
        conn.commit()
        return {"message": f"Item com ID {item_id} excluído com sucesso."}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
