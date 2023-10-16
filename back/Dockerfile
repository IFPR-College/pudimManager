# imagem do python
FROM python:3.8-slim

# diretório de trabalho como /app
WORKDIR /app

# copiando o conteúdo do diretório atual para o conteiner em /app
COPY . /app

# instalando os pacotes necessários
RUN pip install uvicorn fastapi

# abrindo a porta 8000
EXPOSE 8000

# executando o app.py quando o contêiner for iniciado
CMD ["python","uvicorn", "main:app", "--host", "127.0.0.1", "--port", "8000"]
