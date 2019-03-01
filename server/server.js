import bodyParser from 'body-parser';
import express from 'express';
import knex from './knex/knex.js';
import path from 'path';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

const router = express.Router();

const staticFiles = express.static(path.join(__dirname, '../../client/build'));

app.use(staticFiles);

router.get('/cities', (req, res) => {
  const cities = [
    {name: 'New York City', population: 8175133},
    {name: 'Los Angeles',   population: 3792621},
    {name: 'Chicago',       population: 2695598},
    {
      name: 'SERVER_KNEX_DEV_DB_NAME',
      population: process.env.SERVER_KNEX_DEV_DB_NAME
    },
    {
      name: 'SERVER_KNEX_DEV_DB_USERNAME',
      population: process.env.SERVER_KNEX_DEV_DB_USERNAME
    },
    {
      name: 'SERVER_KNEX_DEV_DB_PASSWORD',
      population: process.env.SERVER_KNEX_DEV_DB_PASSWORD
    },
    {
      name: 'SERVER_KNEX_PROD_DB_NAME',
      population: process.env.SERVER_KNEX_PROD_DB_NAME
    },
    {
      name: 'SERVER_KNEX_PROD_DB_USERNAME',
      population: process.env.SERVER_KNEX_PROD_DB_USERNAME
    },
    {
      name: 'SERVER_KNEX_PROD_DB_PASSWORD',
      population: process.env.SERVER_KNEX_PROD_DB_PASSWORD
    },
    {
      name: 'TEST_DATA',
      population: process.env.TEST_DATA
    }
  ]
  res.json(cities)
});

app.use(router);
app.set('port', (process.env.PORT || 3001));
app.listen(app.get('port'), () => {
  console.log(`Listening on ${app.get('port')}`)
});
