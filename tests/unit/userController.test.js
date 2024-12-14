const { getAllUsers, createUser } = require('../../src/controllers/userController');
const httpMocks = require('node-mocks-http');

describe('User Controller', () => {
    it('should return all users', () => {
        const req = httpMocks.createRequest();
        const res = httpMocks.createResponse();

        getAllUsers(req, res);
        expect(res.statusCode).toBe(200);
        expect(res._getJSONData()).toEqual([]);
    });

    it('should create a new user', () => {
        const req = httpMocks.createRequest({
            method: 'POST',
            body: { name: 'John Doe', email: 'john.doe@example.com' },
        });
        const res = httpMocks.createResponse();

        createUser(req, res);
        expect(res.statusCode).toBe(201);
        expect(res._getJSONData()).toMatchObject({ name: 'John Doe', email: 'john.doe@example.com' });
    });

    it('should return 400 if name or email is missing', () => {
        const req = httpMocks.createRequest({
            method: 'POST',
            body: { name: '' },
        });
        const res = httpMocks.createResponse();

        createUser(req, res);
        expect(res.statusCode).toBe(400);
        expect(res._getJSONData()).toMatchObject({ message: 'Name and email are required' });
    });
});