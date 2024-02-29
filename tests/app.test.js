const app = require('../src/app')
const { PORT } = require('../src/config')
const request = require("supertest")

describe('app.js test', () => {
    test('port es igual que en config', () => {
        expect(app.get('port')).toBe(PORT)
    });

    test('get /api/items devuelve un objeto', async () => {
        const response = await request(app).get('/api/items');
        expect(typeof response.body).toBe('object');
    });
})