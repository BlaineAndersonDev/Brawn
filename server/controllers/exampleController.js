import knex from '../knexconfig.js';

// Create a controller for exampleController.
const router = require('express').Router();

// Routes:
router.get('/', async (req, res) => {
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

// All routes encapsulated into a single function
router.route('/data')
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
});

// Basic CRUD setup:
  // req.query | req.params | req.body Explination.
  // https://softwareengineering.stackexchange.com/a/331055

// KNEX common commands:
  // .insert('<Data>')                  |       INSERT INTO
  // .select()                          |       SELECT
  // .table('<TableName>')              |       FROM
  // .returning('<DataToReturn>')       |       RETURNING

// GET (Read):
router.get('/titles', async (req, res) => {
  const readResults = await knex.select().table('titles');
  return res.json(readResults);
});
// POST (Create):
router.post('/titles', async (req, res) => {
  const createResults = await knex('titles')
    .insert({ name: req.query.name })
    .returning('*')
  return res.json(createResults);
});
// PUT (Update):
router.put('/titles', async (req, res) => {

});
// DELETE (Delete):
router.delete('/titles', async (req, res) => {

});

// Export routes to `./router.js`
module.exports = router;
