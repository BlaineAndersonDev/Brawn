const pg = require('pg')

const dbName = process.env.SERVER_KNEX_DEV_DB_NAME;
const dbUsername = process.env.SERVER_KNEX_DEV_DB_USERNAME;
const dbPassword = process.env.SERVER_KNEX_DEV_DB_PASSWORD;

const config = {
  user: dbUsername, // name of the user account
  database: dbName, // name of the database
  max: 10, // max number of clients in the pool
  idleTimeoutMillis: 30000
}

const pool = new pg.Pool(config);

module.exports = pool;
