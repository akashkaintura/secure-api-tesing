const UserService = require('../services/userService');
const { validationResult } = require('express-validator');

class UserController {
    async register(req, res, next) {
        try {
            // Validate request
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            // Register user
            const { user, token } = await UserService.register(req.body);

            res.status(201).json({
                message: 'User registered successfully',
                user,
                token
            });
        } catch (error) {
            next(error);
        }
    }

    async login(req, res, next) {
        try {
            // Validate request
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const { email, password } = req.body;
            const { user, token } = await UserService.login(email, password);

            res.json({
                message: 'Login successful',
                user,
                token
            });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new UserController();