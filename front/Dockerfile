# imagem Node.js como imagem base
FROM node:14

# diretório de trabalho no conteiner
WORKDIR /app

# copiando o arquivo package.json e package-lock.json para o conteiner
COPY package*.json ./

# instalando depedências
RUN npm install

# copiando todo o conteúdo do diretório do projeto para o conteiner
COPY . .

# expondo a porta q vai ser usada pro front
EXPOSE 5173

# executando a aplicação
CMD ["npm", "run", "dev"]
