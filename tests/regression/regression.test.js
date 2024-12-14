const request = require('supertest');
const app = require('../../src/app');

describe('Regression Tests', () => {
    it('should handle multiple user workflows', async () => {
        // Create user
        let res = await request(app).post('/api/users').send({ name: 'Test User', email: 'testuser@example.com' });
        expect(res.statusCode).toBe(201);

        // Fetch all users
        res = await request(app).get('/api/users');
        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBeGreaterThan(0);

        // Handle user conflict
        res = await request(app).post('/api/users').send({ name: 'Test User', email: 'testuser@example.com' });
        expect(res.statusCode).toBe(409);
    });
});
