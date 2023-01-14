const express = require('express')
const Sequelize = require('sequelize')
require('dotenv').config()

// Create database connection
const sequelize = new Sequelize(process.env.DB_CONNECTION_URL)

// Authenticate with the database
sequelize.authenticate().then(() => {
    console.log('Success establishing connection.');
}).catch((error) => {
    console.log(`Failed to connect to database: ${error}`);
});

const app = express();
const PORT = 3000;

app.listen(PORT, (error) => {
    if (!error) console.log(`Server started on port ${PORT}`)
    else console.log(`Server failed to start due to error: ${error}`)
});