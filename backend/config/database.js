const Sequelize = require('sequelize');

const connection = require('./connection');

let database;

console.info('NODE_ENV:', process.env.NODE_ENV || 'development');

switch (process.env.NODE_ENV || 'development') {
    default: database = new Sequelize(
        connection.development.database,
        connection.development.username,
        connection.development.password, {
            host: connection.development.host,
            port:"5432",
            dialect: connection.development.dialect,
            pool: {
                max: 5,
                min: 0,
                idle: 10000,
            },
            logging: false
        },
    );
}

module.exports = database;