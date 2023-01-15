const express = require('express')
const fileupload = require('express-fileupload')
const csv = require('csv-parser')
const Sequelize = require('sequelize')
const {Vehicle} = require("./models/vehicle.model.js")
const fs = require('fs')
const path = require('path')
require('dotenv').config()

/* Sequelize Setup */
// Create database connection
const sequelize = new Sequelize(process.env.DB_CONNECTION_URL);

// Authenticate with the database
sequelize.authenticate().then(() => {
    console.log('Success establishing connection.');
}).catch((error) => {
    console.log(`Failed to connect to database: ${error}`);
});

/* Express App Setup */
const app = express();
const PORT = process.env.API_PORT;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(fileupload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}));

// CSV upload endpoint
app.post('/upload', async (req, res) => {
    // request validation
    if (!req.files || Object.keys(req.files).length == 0) {
        return res.status(400).send({ message: 'No files were uploaded' });
    }
    if (!req.files.file)
        return res.status(400).send({ message: 'Request files missing key: file' });
    if (!req.body.provider_name)
        return res.status(400).send({ message: 'Request body missing key: provider_name' });

    const provider_name = req.body.provider_name;
    const file = req.files.file;

    const column_config = lookupColumnConfig(provider_name);
    const vehicle_columns = Object.keys(Vehicle.rawAttributes);

    let data = [];
    fs.createReadStream(file.tempFilePath)
        .pipe(csv())
        .on('data', (row) => {
            // process CSV data
            let newRow = {};
            for (const col of column_config) {
                if (row[col] && vehicle_columns.includes(col))
                    newRow[col] = row[col];
            }
            data.push(newRow);
        })
        .on('end', async () => {
            console.log(data);
            // data validation
            if (! await validateData(data)) {
                return res.status(400).send({ message: 'Invalid data' });
            }
            // insert into database
            try {
                await sequelize.sync();
                await Vehicle.bulkCreate(data);
                return res.status(200).send({ message: 'File uploaded and data inserted into database.' })
            } catch (error) {
                return res.status(500).send({ message: `Error inserting data: ${error}` });
            }
        })
});

// Define helper functions
const lookupColumnConfig = (provider_name) => {
    try {
        const columnConfigPath = path.join(__dirname, process.env.COLUMN_CONFIG);
        const config = JSON.parse(fs.readFileSync(columnConfigPath, 'utf8'));
        return config[provider_name];
    } catch (error) {
        throw new Error(`Error reading the config file: ${error}`)
    }
}

const validateData = async (data) => {
    try {
        for (const row of data) {
            await Vehicle.build(row).validate();
        }
        return true;
    } catch (error) {
        console.log(`Error validating data: ${error}`)
        return false;
    }
}

//let c = lookupColumnConfig("provider_all")
//console.log(typeof(c))
//console.log(c)
//for (const r of c) {
//    console.log(r)
//}


app.listen(PORT, (error) => {
    if (!error) console.log(`Server started on port ${PORT}`)
    else console.log(`Server failed to start due to error: ${error}`)
});