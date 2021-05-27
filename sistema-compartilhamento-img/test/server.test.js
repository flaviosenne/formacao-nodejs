const app = require('../src/app')
const supertest =require('supertest')
let request = supertest(app)


test("The application shoud listen in port 3131", () => {
    return request.get("/").then(res => {
        let status = res.statusCode
        expect(status).toEqual(200)
    }).catch(err => {
        fail(err)
    })
})