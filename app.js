const express = require('express')
const Sequelize = require('sequelize')
const {Vehicle} = require("./models/vehicle.model.js")
const fs = require('fs')
const path = require('path')
require('dotenv').config()

// Create database connection
const sequelize = new Sequelize(process.env.DB_CONNECTION_URL);

// Authenticate with the database
sequelize.authenticate().then(() => {
    console.log('Success establishing connection.');
}).catch((error) => {
    console.log(`Failed to connect to database: ${error}`);
});

const app = express();
const PORT = 3000;

const lookupColumnConfig = async (provider_name) => {
    try {
        const columnConfigPath = path.join(__dirname, process.env.COLUMN_CONFIG);
        const config = JSON.parse(fs.readFileSync(columnConfigPath, 'utf8'));
        return config[provider_name];
    } catch (error) {
        throw new Error(`Error reading the config file: ${error}`)
    }
}

console.log(lookupColumnConfig("provider_all"))

app.listen(PORT, (error) => {
    if (!error) console.log(`Server started on port ${PORT}`)
    else console.log(`Server failed to start due to error: ${error}`)
});