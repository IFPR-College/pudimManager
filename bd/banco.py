import sqlite3

conn = sqlite3.connect('/data/pudimManager.db')

cursor = conn.cursor()

cursor.execute('''
    CREATE TABLE IF NOT EXISTS pudins (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        e_bom TEXT NOT NULL
    )
''')

conn.commit()
conn.close()
