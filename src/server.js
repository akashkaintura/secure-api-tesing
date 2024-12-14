const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const swaggerSetup = require('./src/config/swagger');
const errorMiddleware = require('./middleware/errorMiddleware');
const userRoutes = require('./routes/userRoutes');

// Load environment variables
dotenv.config();

class Server {
    constructor() {
        this.app = express();
        this.initializeMiddlewares();
        this.connectDatabase();
        this.initializeRoutes();
        this.initializeSwagger();
        this.handleErrors();
    }

    initializeMiddlewares() {
        // Security and parsing middlewares
        this.app.use(helmet());
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));

        // Rate limiting
        const limiter = rateLimit({
            windowMs: 15 * 60 * 1000, // 15 minutes
            max: 100 // limit each IP to 100 requests
        });
        this.app.use(limiter);
    }

    async connectDatabase() {
        try {
            await mongoose.connect(process.env.MONGODB_URI, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true
            });
            console.log('Database connected successfully');
        } catch (error) {
            console.error('Database connection error:', error);
            process.exit(1);
        }
    }

    initializeRoutes() {
        this.app.use('/api/users', userRoutes);
    }

    initializeSwagger() {
        swaggerSetup(this.app);
    }

    handleErrors() {
        this.app.use(errorMiddleware);
    }

    start() {
        const PORT = process.env.PORT || 3000;
        this.app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    }
}

// Create and start server
const server = new Server();
server.start();

module.exports = server.app;