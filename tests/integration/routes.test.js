const request = require('supertest');
const app = require('../../src/app');

describe('Integration Tests for Routes', () => {
    it('should return 404 when no users exist', async () => {
        const res = await request(app).get('/api/users');
        expect(res.statusCode).toBe(404);
        expect(res.body.message).toBe('No users found');
    });

    it('should create a new user successfully', async () => {
        const res = await request(app).post('/api/users').send({ name: 'John', email: 'john@example.com' });
        expect(res.statusCode).toBe(201);
        expect(res.body.email).toBe('john@example.com');
    });

    it('should return 400 for invalid user data', async () => {
        const res = await request(app).post('/api/users').send({});
        expect(res.statusCode).toBe(400);
        expect(res.body.message).toBe('Name or email missing');
    });
});
