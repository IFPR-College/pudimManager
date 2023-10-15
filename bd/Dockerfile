# imagem do python
FROM python:3.8-slim

# diretório de trabalho no contêiner
WORKDIR /app

# copiando o script
COPY bd.py /app

# executando o script do bd.py(iniciando o banco)
CMD ["python3", "bd.py"]
