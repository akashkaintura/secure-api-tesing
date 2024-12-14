const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.POSTGRES_URI, {
    dialect: 'postgres',
    logging: false, // Disable query logging
});

sequelize.authenticate()
    .then(() => console.log('Connected to PostgreSQL successfully'))
    .catch((err) => console.error('Unable to connect to PostgreSQL:', err));

module.exports = sequelize;
