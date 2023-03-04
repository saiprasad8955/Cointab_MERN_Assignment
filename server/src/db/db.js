const { Sequelize } = require('sequelize')
require('dotenv').config();

// Keys For MySQL
const DB_USER = 'root',
    DB_PASSWORD = '123456',
    DB_HOST = 'localhost',
    DB_NAME = 'org';


const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    dialect: 'mysql',
})

// Open a connection to the database
try {
    sequelize.authenticate();
    console.log('Connected to SQL database successfully!');
} catch (error) {
    console.error('Error connecting to database:', err);
}

module.exports = sequelize;