const {Sequelize, DataTypes} = require("sequelize");
require('dotenv').config()

// Create database connection
const sequelize = new Sequelize(process.env.DB_CONNECTION_URL)

// Define Vehicle model
const Vehicle = sequelize.define('vehicle', {
    UUID: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    VIN: {
        type: DataTypes.STRING,
        allowNull: true
    },
    Make: {
        type: DataTypes.STRING,
        allowNull: true
    },
    Model: {
        type: DataTypes.STRING,
        allowNull: true
    },
    Mileage: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    Year: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    Price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    ZipCode: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    CreateDate: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    UpdateDate: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
});

module.exports = Vehicle;