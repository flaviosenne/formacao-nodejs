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

describe("authentication", () => {
    it('should returns token when login successful', () => {
        return request.post('/auth')
        .send({email: mainUser.email, password: mainUser.password})
        .then(res => {
            expect(res.status).toEqual(200)
            expect(res.body.token).toBeDefined()
        })
        .catch(err => fail(err))
    })

    it('should returns status 403 when email not found in DB',() => {
        return request.post('/auth')
        .send({email: "nao_existe@email.com", password: mainUser.password})
        .then(res => {
            expect(res.status).toEqual(403)
            expect(res.body.errors.email).toEqual("Email não cadastrado")
        })
        .catch(err => fail(err))
    })

    it('should returns status 403 when password not found in DB',() => {
        return request.post('/auth')
        .send({email: mainUser.email, password: "senha errada"})
        .then(res => {
            expect(res.status).toEqual(403)
            expect(res.body.errors.password).toEqual("Senha incorreta")
        })
        .catch(err => fail(err))
    })
})