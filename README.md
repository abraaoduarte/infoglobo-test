## INFOGLOBO TEST

## Visão Geral
* API REST
* Node
* MongoDB
* React
* React Redux
* Redux Thunk
* Docker
* Yarn workspace

## Requisitos
* Node
* MongoDB

## Informações Gerais
* O backend se encontra neste link: [backend](https://github.com/abraaoduarte/infoglobo-test/tree/master/backend)
* O frontend se encontra neste link: [frontend](https://github.com/abraaoduarte/infoglobo-test/tree/master/frontend)

## Instalação
Clone o repositório
```
$ git clone https://github.com/abraaoduarte/infoglobo-test.git
```
Entre no diretório
```
$ cd infoglobo-test
```
Entre na pasta backend e crie o arquivo .env e coloque as variáveis de ambiente
```
$ cd backend
$ touch .env
```
Exemplo do arquivo .env
```
NODE_ENV=development
PORT=3000
MONGO_URL=mongodb://localhost:27017/nome_do_bd
JWT_SECRET=1234
```
Rode a seeder para criar um usuário default
```
$  yarn md-seed run
```
Entre na pasta frontend e crie o arquivo .env e coloque as variáveis de ambiente
```
$ cd frontend
$ touch .env
```
Exemplo do arquivo .env
```
API=http://127.0.0.1:3000
PORT=3001
```
Instale as dependências
```
$ yarn install
```
Entra na raiz do projeto e inicie os projetos
```
$ yarn start
```
## Instalação com Docker
É necessário ter o Docker instalado em sua máquina.
Após a instalação e estar com o serviço do Docker rodando, execute:
```
$ docker-compose up
```
Após isso a API estará rodando em http://localhost/3000 caso seja esta a porta que você tenha configurado no .env
O Frontend estará rodando em http://localhost/3001 caso seja esta a porta que você tenha configurado no .env

Faça um POST em http://localhost:3000/auth/login com o seguinte payload no body
```
{
    "email": "admin@admin.com",
    "password": "123mudar"
}
```
Exemplo do retorno:
```
{
  "result": {
    "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1NzQ1OTU3NDEsImlhdCI6MTU3MzM4NjE0MSwic3ViIjp7ImlkIjoiNWRjNGNiMDYwMzM0NDMzZTg1MGNhMWUyIn19.1v3AcHsu5qAOyAVe98ID_Yop4pf3kaxvz7MVUzRmNyc",
    "user": {
      "id": "5dc4cb060334433e850ca1e2",
      "name": "Admin",
      "is_active": true,
      "email": "admin@admin.com"
    }
  }
}
```
Copie o token gerado para acessar as outras API's e passe no header da seguinte maneira:
```
Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1NzQ1OTU3NDEsImlhdCI6MTU3MzM4NjE0MSwic3ViIjp7ImlkIjoiNWRjNGNiMDYwMzM0NDMzZTg1MGNhMWUyIn19.1v3AcHsu5qAOyAVe98ID_Yop4pf3kaxvz7MVUzRmNyc
```
## Rotas
|Descrição| Método | Rota |
| ------ | ------ | ------ |
| Listagem de Notícias | GET | http://localhost:3000/api/news |
| Visualizar Notícias | GET | http://localhost:3000/api/news/id_da_noticia |
| Deletar Notícias | DELETE | http://localhost:3000/api/news/id_da_noticia |

|Descrição| Método | Rota |
| ------ | ------ | ------ |
| Criação de Notícia | POST | http://localhost:3000/api/news |
```
{
	"title": "Notícia Um",
	"content": "Nova Notícia",
	"publication_date": "2019-01-01"
}
```
|Descrição| Método | Rota |
| ------ | ------ | ------ |
| Atualizar Notícia | PATCH | http://localhost:3000/api/id_da_noticia |
```
{
	"title": "Notícia dois atualizada",
	"content": "Notícia",
	"publication_date": "2019-01-01"
}
```
As rotas acima estão protegidas portanto é necessário passar o token no header da requisição delas como foi mostrado acima.

## Frontend
* Entre no endereço http://localhost/3001
* Faça o login
* No menu lateral você irá encontra o link para a listagem de notícias
* Na listagem de notícias há opção de criar um nova notícias
* No canto direito da tabela existem os botões de detalhes, edição e deleção
