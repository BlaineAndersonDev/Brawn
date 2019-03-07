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

module.exports = router;
