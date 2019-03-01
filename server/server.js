import bodyParser from 'body-parser';
import express from 'express';
import knex from './knex/knex.js';
import path from 'path';
// const pool = require('./db.js');



var pg = require('pg')
const dbName = process.env.SERVER_KNEX_DEV_DB_NAME;
const dbUsername = process.env.SERVER_KNEX_DEV_DB_USERNAME;
const dbPassword = process.env.SERVER_KNEX_DEV_DB_PASSWORD;
const age = 732

var config = {
  user: dbUsername, // name of the user account
  database: dbName, // name of the database
  max: 10, // max number of clients in the pool
  idleTimeoutMillis: 30000 // how long a client is allowed to remain idle before being closed
}

var pool = new pg.Pool(config)
var myClient

pool.connect(function (err, client, done) {
  if (err) console.log(err)
  app.listen(3000, function () {
    console.log('listening on 3000')
  })
  myClient = client
  var query = 'SELECT * FROM users';
  myClient.query(query, function (err, result) {
    if (err) {
      console.log(err)
    }
    console.log(result.rows[0])
  })
})




const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

const router = express.Router();

const staticFiles = express.static(path.join(__dirname, '../../client/build'));

app.use(staticFiles);

router.get('/cities', (req, res) => {
  // const result = await pool.query('SELECT * FROM tasks;')
  // console.log('Result: ' + result)
  const cities = [
    {name: 'New York City', population: 8175133},
    {name: 'Los Angeles',   population: 3792621},
    {name: 'Chicago',       population: 2695598},
    {
      name: 'TEST_DATA',
      population: process.env.TEST_DATA
    }//,
    // {
    //   name: 'Pool',
    //   population: result
    // }
  ]
  res.json(cities)
});

app.use(router);
app.set('port', (process.env.PORT || 3001));
app.listen(app.get('port'), () => {
  console.log(`Listening on ${app.get('port')}`)
});
