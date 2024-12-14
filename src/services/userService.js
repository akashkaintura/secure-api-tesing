import { User } from "../models/User.js";
const jwt = require('jsonwebtoken');

class UserService {
    async register(userData) {
        try {
            const existingUser = await User.findOne({
                $or: [
                    { email: userData.email },
                    { username: userData.username }
                ]
            });

            if (existingUser) {
                throw new Error('User already exists');
            }

            const user = new User(userData);
            await user.save();

            const token = this.generateToken(user);

            return { user, token };
        } catch (error) {
            throw new Error(`Error registering user: ${error.message}`);
        }
    }

    async login(email, password) {
        try {
            const user = await User.findOne({ email });

            if (!user) {
                throw new Error('Invalid credentials');
            }

            const isMatch = await user.comparePassword(password);

            if (!isMatch) {
                throw new Error('Invalid credentials');
            }

            const token = this.generateToken(user);

            return { user, token };
        } catch (error) {
            throw new Error(`Error logging in user: ${error.message}`);
        }
    }

    generateToken(user) {
        return jwt.sign(
            {
                id: user._id,
                username: user.username,
                role: user.role
            },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );
    }

    async validateToken(token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            return decoded;
        } catch (error) {
            throw new Error('Invalid token');
        }
    }
}

module.exports = new UserService();