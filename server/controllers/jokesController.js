import knex from '../knexconfig.js';
import cors from 'cors';
const router = require('express').Router();

router.get('/', async (req, res) => {
  console.log(' >>> Entered Route GET `/api/jokes/`')
  const readResults = await knex('jokes')
    .select('*')
    .catch((err) => {
      console.log(err)
    });
  return res.send(readResults);
});

router.post('/create', async (req, res) => {
  console.log(' >>> Entered Route POST `/api/jokes/create`')
  console.log(' Query: ' + Object.keys(req.query))
  const createResults = await knex('jokes')
    .insert({
      author: req.query.author,
      body: req.query.body
    })
    .returning('*')
    .catch((err) => {
      console.log(err)
    });
  res.send(createResults);
});

router.put('/update/:id', async (req, res) => {
  console.log(' >>> Entered Route PUT `/api/update/:id`')
  console.log(' Params: ' + Object.keys(req.params))
  console.log(' Query: ' + Object.keys(req.query))
  const updateResults = await knex('jokes')
    .where({ id: req.params.id })
    .update({
      author: req.query.author,
      body: req.query.body
    })
    .returning('*')
    .catch((err) => {
      console.log(err)
    });
  return res.json(updateResults);
});

router.delete('/delete/:id', async (req, res) => {
  console.log(' >>> Entered Route DELETE `/api/jokes/delete`')
  console.log(' Params: ' + Object.keys(req.params))
  const deleteResults = await knex('jokes')
    .where({ id: req.params.id })
    .del()
    .catch((err) => {
      console.log(err)
    });
    return res.json(deleteResults);
});

router.get('/wigit', async (req, res) => {
  console.log(' >>> Entered Route GET `/api/jokes/wigit`')
  const readResults = await knex('jokes')
    .select('*')
    .catch((err) => {
      console.log(err)
    });
  return res.send(readResults);
});

module.exports = router;
