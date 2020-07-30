# API de Games
Esta API foi contruida com o objetivo de colocar em prática
todo conceito de API REST, rotas, autenticações...

## Endpoints

### GET /game
Esse endpoint é responsavel por retornar a listagem
de todos os games cadastrados no banco de dados

#### Parametros
Nenhum

#### Status

##### OK! 200
Caso ocorra tudo ok, a listagem dos games já está disponível

Exemplo de resposta:
```
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJmbGF2aW9AZW1haWwuY29
  tIiwiaWF0IjoxNTk2MTMyMDE5LCJleHAiOjE1OTYzMDQ4MTl9.2Q_H18bPRwWy03nhv0PPYEXRMyrGODS2Y9yf0MswBCw",
  "games": [
    {
      "id": 1,
      "title": "Good of War",
      "year": 2018,
      "price": 200
    },
    {
      "id": 2,
      "title": "Call of Dutty",
      "year": 2018,
      "price": 170
    },
    {
      "id": 3,
      "title": "Need for speed",
      "year": 2012,
      "price": 120
    }
  ]
}



```
##### Falha na autenticação! 401
Caso essa rersposta aconteça, a requisição não pode ser concluido pois a autenticação foi recusada: Token inválido, Token expirado

Exemplo de resposta:
```
{
  "err": "token invalid"
}
```


## Endpoints

### POST /auth
Esse endpoint é responsavel por retornar fazer
o processo de login

#### Parametros
email: E-mail cadastro no sistema
pass: Senha do usuario cadastrado no sistema
```
{
    "email":"flavio@email.com",
    "pass":"123"
}
```
#### Status

##### OK! 200
Caso ocorra tudo ok, você irá receber o token para acessar as rotas protegidas

Exemplo de resposta:
```
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZC
  I6MSwiZW1haWwiOiJmbGF2aW9AZW1haWwuY29tIiwiaWF0IjoxNTk2MTMyNDg0LCJleHA
  iOjE1OTYzMDUyODR9.XyZ778IXASVV3gG2TsNKFa3HIpqaz92den_YtkYN3VI"
}

```
##### Falha na autenticação! 401
Caso essa rersposta aconteça, a requisição não pode ser concluido pois a autenticação foi recusada: token invalido, expirado ou senha incorreta
Exemplo de resposta:
```
{
  "err": "unauthorization"
}
```

##### Falha na autenticação! 400
Caso essa rersposta aconteça, a requisição não pode ser concluido pois a geração de token sofreu algum erro ou email não informado
Exemplo da resposta:
```
{
  "err": "email invalid"
}
```

##### Usuario não encontrados! 404
Caso essa resposta aconteça, a requisição não pode ser concluido pois o usuario informado não existe na base de dados
Exemplo de resposta:
```
{
  "err": "user not found"
}
```

