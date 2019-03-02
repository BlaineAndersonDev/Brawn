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

router.get('/cities', async (req, res) => {
  const results = await knex.select().table('users');
  const cities = [
    {name: 'New York City', population: 8175133},
    {name: 'Los Angeles',   population: 3792621},
    {name: 'Chicago',       population: 2695598},
    {
      name: 'TEST_DATA',
      population: process.env.TEST_DATA
    },
    {
      name: 'result',
      population: results
    }
  ]
  res.json(cities)
});

router.route('/users')
  .get(function(req,res){
    knex.select().table('users')
  .then(function(collection){
    res.json({
      error:false,
      data: collection
    })
  })
  .catch(function(err){
    res.status(500).json({
      error:true,
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
