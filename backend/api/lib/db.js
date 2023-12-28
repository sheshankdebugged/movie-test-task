
const  configs  = require('../config');
let knex = require('knex');
const config = {
    client: "pg",
    connection: {
        host: configs.db.db_host,
        user: configs.db.user,
        password: configs.db.password,
        database: configs.db.database,
        port: configs.db.db_port,
    },
    pool: { min: 0, max: 7 }
};
let dbRes = {
    knex: null,
    getContext: function () {
        knex = require("knex")(config);
        return knex;
    },
    destroyContext: function () {
        knex.destroy();
    }
};
module.exports = dbRes;
  