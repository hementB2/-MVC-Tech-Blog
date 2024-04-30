const Sequelize = require('sequelize');
require('dotenv').config(); // Import sensitive data from .env
const Sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PW,
  {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306,
  },
);

// Create a Sequelize instance based on the environment
const sequelize = process.env.JAWSDB_URL
  ? new Sequelize(process.env.JAWSDB_URL) // Use JAWSDB_URL for Heroku deployment
  : new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
      host: 'localhost', // Local database host
      dialect: 'mysql', // Specify MySQL as the database dialect
      dialectOptions: {
        decimalNumbers: true, // Ensure decimal numbers are handled properly
      },
    });

module.exports = sequelize;
