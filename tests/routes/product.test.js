const config = require("../../src/config")
const request = require("supertest")

describe('product.route.js test', () => {
    test('Prueba de integración con la api MLA', async () => {
        const searchText = 'apple'
        const url = config.searchApi(searchText)
        const res = await request(url).get('')
        expect(res.status).toBe(200)
    })
})