import express, { response } from 'express'

const app = express()

app.use(express.json())//Coloca uma funcionalidade extra para o express conseguir o body em formato json

//Rota: Endereço completo da requisição
//Recurso: Qual entidade estamos acessandodo sistema

//GET: Buscar uma ou mais informações do backend
//POST: Criar uma nova informação no backend
//PUT: Atualizar uma informação existente no backend
//DELETE: Remover uma informação no backend

//POST http://localhost:3333/users = Ciar um usuário
//GET http://localhost:3333/users = Listar usuário
//GET http://localhost:3333/users/5 = Buscar dados do usuário do id 5

//Request param: Parâmetros que vem na própria rota que identificam o recurso
//Query param: Parâmetros que vem na própria rota, geralmente opcionais para filtros, paginação e coisas não tão relevantes
//Request Body: Parâmetros para criação e atualização de informações

const users = [
    'Michel',
    'Cleiton',
    'Clóvis',
    'Xablau'
]

app.get('/users', (request, response) => {
    const search = String(request.query.search)//Transforma o valor do parâmetro em STRING

    const filteredUsers = search ? users.filter(user => user.includes(search)) : users//Filtra a array pelo dado vindo do parâmetro, caso algum item na array tenha o parâmetro, caso não tenha, retorna nada

    //JSON

    return response.json(filteredUsers)
})

app.get('/users/:id', (request, response) => {
    const id = Number(request.params.id)//Pega o valor do parâmetro id e transforma em número

    const user = users[id]//Pega o valor da array users com base no parâmetro 
    return response.json(user)
})

app.post('/users', (request, response) => {
    const data = request.body//Requisita a informação do corpo

    console.log(data)

    const user = {
        name: data.name,
        email: data.email,
    }

    return response.json(user)
})

app.listen(3333)