# API

## versões 
- node: 20
- postegre: 17

## comandos de configuração:
- instalar railway cli: npm i -g @railway/cli
- instalar postegre: 
    1. baixar a versão 17 no site oficial
    2. configurar pasta bin do postegre nas variáveis de ambiente para poder usar o comando no terminal

## Configuração de ambiente
1. Criar projeto do banco de dados no railway
    - acessando o railway e criando um novo projeto de Postegre
2. Criar projeto da API 
    - npm install express pg dotenv (vai criar a estrutura inicial da api em node usando o express.js)
    - criar a estrutura de pastas 
    - configurar o arquivo .env com os dados do banco adquiridos no railway
    - criar o arquivo de conexão com o banco
    - criar arquivo index.js, onde conecta com o servidor JS.


## Script de criação das tabelas

CREATE TABLE "public".user
(
	id SERIAL PRIMARY KEY,
	name VARCHAR(100) NOT NULL
	email VARCHAR(100) NOT NULL
	password VARCHAR(100) NOT NULL
)

CREATE TABLE "public".routine 
(
	id SERIAL PRIMARY KEY, 
	name VARCHAR(100) NOT NULL, 
	userid BIGINT, 
		CONSTRAINT fk_user 
		FOREIGN KEY (userid) 
		REFERENCES "public".user(id) 
		ON DELETE CASCADE
);

CREATE TABLE "public".workout
(
	id SERIAL PRIMARY KEY, 
	name VARCHAR(100) NOT NULL, 
    routineid BIGINT, 
		CONSTRAINT fk_routine 
		FOREIGN KEY (routineid) 
		REFERENCES "public".routine(id) 
		ON DELETE CASCADE
)

CREATE TABLE "public".exercise
(
	id SERIAL PRIMARY KEY, 
	name VARCHAR(100) NOT NULL, 
    sets INT NOT NULL,
    reps VARCHAR(20),
    technique VARCHAR(25),
    observation VARCHAR(100),
    muscleGroup VARCHAR(50),
    load VARCHAR(50),
    workoutid BIGINT, 
		CONSTRAINT fk_workout 
		FOREIGN KEY (workoutid) 
		REFERENCES "public".workout(id) 
		ON DELETE CASCADE
)