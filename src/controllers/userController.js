const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

class UserController {
    async register(req, res) {
        try {
            const { username, password } = req.body;
            const user = new User({ username, password });
            await user.save();

            const token = jwt.sign(
                { id: user._id },
                process.env.JWT_SECRET,
                { expiresIn: '1h' }
            );

            res.status(201).json({ token });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async login(req, res) {
        // Authentication logic
    }
}

module.exports = new UserController();