const express = require('express');
const mongoose = require('mongoose');
const swaggerSetup = require('./src/config/swagger');
const securityMiddleware = require('./src/middleware/authMiddleware');
const userRoutes = require('./routes/userRoutes');

const app = express();

// Security Middleware
app.use(securityMiddleware.helmet());
app.use(securityMiddleware.rateLimiter());

// Database Connection
mongoose.connect('mongodb://localhost/securedb', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Swagger Documentation
swaggerSetup(app);

// Routes
app.use('/api/users', userRoutes);

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        error: 'Something went wrong!',
        message: err.message
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});