# NodeJS Backend Take Home Challenge

## Scenario

You work on a product that receives potentially large files in CSV format, process them and import their data into our database. However, providers do not all use the same layout of columns. The order may differ between providers, they may only send a subset of the columns, or they may include additional columns we do not wish to capture.

## Task

Build an API with a single endpoint that accepts a file upload in the CSV format and the provider name that sent the file, looks up a configuration defining the column layout and parses the CSV into a database of your choosing (e.g. postgres, SQLite, mongodb-memory-server). The columns we care about are defined below in the “Columns” section.

### Columns:

    •     UUID
    •     VIN (alphanumerical vehicle id)
    •     Make
    •     Model
    •     Mileage
    •     Year
    •     Price
    •     Zip Code
    •     Create Date
    •     Update Date

### You are responsible for:

    •     Coding this using nodeJS and choosing which framework/libraries/architecture you’ll be using
    •     Defining the format of the configuration file and how it is stored/loaded
    •     Setting up a database (and providing schema migrations if necessary)
    •     Setting up the API
    •     Creating and maintaining your code in a Git repository
    •     Documenting any assumptions and design decisions you have made
### Stretch goals:

    •     Implement the project in TypeScript (especially if it’s on your resume)
    •     Provide appropriate tests ensuring the desired outcome

## Design

- Nodejs and express is used to build the API.
- The configuration file is in JSON format, keyed on the provider name which maps to an array of column names.
- A local Postgres database is used to store the data.
- The data is stored in a single table named "Vehicles".
- Use Sequelize ORM. While this is not needed or a single table database it makes the project extendible for adding relations. It also provides schema definition and validation.

## Assumptions

- The UUID column is the primary key for the Vehicles table and is never provided in a CSV. The database will handle generating the UUID fields.
- The following fields are required: VIN, Make, Model.
- Data providers will provide consistent column names.