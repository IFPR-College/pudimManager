import sqlite3

# Conecte-se ao banco de dados SQLite3 (ou crie um novo se não existir)
conn = sqlite3.connect('pudimManager.db')


def insertValues(nome: str, ingredientes: str, e_bom: bool, foto: any):
    cursor = conn.cursor()
    cursor.execute(f'''
    INSERT INTO pudins (nome, ingredientes, e_bom, foto)
    VALUES
    ({nome}, {ingredientes}, {e_bom}, {foto}),
    ''')
    
def printTable():
    cursor.execute("SELECT * FROM pudins")
    resultados = cursor.fetchall()
    for linha in resultados:
        print(linha)

# Crie uma cursor para executar comandos SQL
cursor = conn.cursor()

# Crie a tabela "pudins"
cursor.execute('''
    CREATE TABLE IF NOT EXISTS pudins (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        ingredientes TEXT NOT NULL,
        e_bom BOOLEAN NOT NULL,
        foto TEXT
    )
''')


# Exemplo de inserção de dados iniciais (opcional)


# Salve as alterações e feche a conexão
conn.commit()
print()
conn.close()
