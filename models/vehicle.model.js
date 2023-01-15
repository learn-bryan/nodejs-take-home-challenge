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
        allowNull: false
    },
    Make: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Model: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Mileage: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    Year: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    Price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true
    },
    ZipCode: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    CreateDate: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: true
    },
    UpdateDate: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: true
    }
});

exports.Vehicle = Vehicle;