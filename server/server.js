import bodyParser from 'body-parser';
import express from 'express';
import path from 'path';
import knex from './config.js';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

const router = express.Router();

const staticFiles = express.static(path.join(__dirname, '../../client/build'));

app.use(staticFiles);

router.get('/example', async (req, res) => {
  // Knex cheatsheet: https://devhints.io/knex

  // Knex has simple . notations to select information simply.
  const easyResults = await knex.select().table('users');

  // Knex also allows you to manually write SQL queries as well.
  const rawResults = await knex.raw('\
    SELECT * \
    FROM users \
  ');
  // But they have to be adjusted for human reading.
  let rawResultsCleaned = [];
  for (let i in rawResults.rows) {
    rawResultsCleaned.push(rawResults.rows[i])
  }

  // A data test showing:
    // Basic Object information,
    // Dotenv hidden data implementation,
    // Knex .notations results,
    // Knew raw SQL results (after cleanup).
  const cities = [
    {name: 'New York City', population: 8175133},
    {name: 'Los Angeles',   population: 3792621},
    {name: 'Chicago',       population: 2695598},
    {
      name: 'TEST_DATA',
      population: process.env.TEST_DATA
    },
    {
      name: 'easyResults',
      population: easyResults
    },
    {
      name: 'rawResultsCleaned',
      population: rawResultsCleaned
    }
  ]
  res.json(cities)
});

// BLAINE - START HERE!!!
//
router.route('/users')
  .get(function(req,res){
    knex.select().table('users')
  .then(function(collection){
    res.json({
      error: false,
      data: collection
    })
  })
  .catch(function(err){
    res.status(500).json({
      error: true,
      data:{
        message:err.message
      }
    })
  })
})

router.get('/knex', async (req, res) => {
  const results = await knex.select().table('users');
  res.json(results)
})

app.use(router);
app.set('port', (process.env.PORT || 3001));
app.listen(app.get('port'), () => {
  console.log(`Listening on ${app.get('port')}`)
});
