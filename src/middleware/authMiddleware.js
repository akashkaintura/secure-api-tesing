const jwt = require('jsonwebtoken');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const authMiddleware = {
    // JWT Authentication
    authenticateToken: (req, res, next) => {
        const token = req.headers['authorization'];
        if (!token) return res.status(401).json({ error: 'Access denied' });

        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) return res.status(403).json({ error: 'Invalid token' });
            req.user = user;
            next();
        });
    },

    // Security Middleware
    helmet: () => helmet({
        contentSecurityPolicy: true,
        frameguard: { action: 'deny' }
    }),

    // Rate Limiting
    rateLimiter: () => rateLimit({
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 100 // limit each IP to 100 requests per windowMs
    })
};

module.exports = authMiddleware;