const app = require('../src/app')
const supertest =require('supertest')
let request = supertest(app)

let mainUser = {name: 'joao', email:'joao@email.com', password: '123'}
beforeAll(() => {
    return request.post('/users')
    .send(mainUser)
    .then(res => {})
    .catch(err=> console.log(err))
})

afterAll(() => {
    return request.delete(`/users/${mainUser.email}`)
    .then(res => {})
    .catch(err=> console.log(err))
})

describe("insert user",()=> {
    it("should add an user with successful",()=> {
        let user = {
            name: 'valid_name',
            email: `${Date.now()}@email.com`,
            password: 'valid_password'
        }

        return request.post("/users")
        .send(user)
        .then(res => {
            expect(res.statusCode).toEqual(201)
            expect(res.body.email).toEqual(user.email)
        })
        .catch(err => fail(err))
    })

    it("should returns bad request if not provider someone data", ()=> {
        let user = {
            name: '',
            email: '',
            password: ''
        }

        return request.post("/users")
        .send(user)
        .then(res => {
            expect(res.statusCode).toEqual(400)
        })
        .catch(err => fail(err))
    })

    it("should returns bad request 400 if email already exists", ()=> {
        let user = {
            name: 'valid_name',
            email: `${Date.now()}@email.com`,
            password: 'valid_password'
        }

        return request.post("/users")
        .send(user)
        .then(res => {
            expect(res.statusCode).toEqual(201)
            expect(res.body.email).toEqual(user.email)

            return request.post('/users').send(user).then(res => {

                expect(res.statusCode).toEqual(400)
                expect(res.body.error).toEqual("Email já cadastrado")
            }).catch(err => fail(err))
        })
        .catch(err => fail(err))
    })
})