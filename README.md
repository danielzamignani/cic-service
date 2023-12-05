# cic-service

Este projeto foi desenvolvido usando NestJS e utiliza TypeORM com PostgreSQL como banco de dados.

## Pré-requisitos

Certifique-se de ter o Node.Js, Docker e o Docker Compose instalados na sua máquina.
- [Node.js](https://nodejs.org/) (v18.18.00)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

## Configuração do Ambiente

Clone este repositório:

git clone https://github.com/danielzamignani/cic-service.git

cd cic-service


Crie um arquivo `.env` na raiz do projeto e configure as variáveis de ambiente necessárias. Você pode usar o arquivo `.env.example` como modelo.


## Executando o Projeto

### 1. Iniciando o Banco de Dados

Use Docker Compose para iniciar o banco de dados PostgreSQL:

docker-compose up -d

### 2. Instalando Dependências

Instale as dependências do Node.js:

npm install


### 3. Executando as Migrações

Execute as migrações do TypeORM para configurar o banco de dados:

npm run migration:run

### 4. Iniciando o Servidor

Por fim, inicie o servidor NestJS:

npm run start:dev


O servidor estará disponível em `http://localhost:3000/`.

