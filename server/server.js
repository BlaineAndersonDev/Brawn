import bodyParser from 'body-parser';
import express from 'express';
import path from 'path';
import knex from './knexconfig.js';
import cors from 'cors';

// Create the app using express.
const app = express();


app.use(cors())

// 'Import' & 'Mount' the router into the app.
// I.E. `http://localhost:????/api/...`.
app.use('/api', require('./router.js'));

// Allows express to Parse `request.body`.
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Set the API's internal port.
// I.E. `http://localhost:3001`.
app.set('port', (process.env.PORT || 3001));

// Allows the API to take requests on the given `port`.
// I.E. `http://localhost:3001/api/...`.
app.listen(app.get('port'), () => {
  console.log(`Listening on ${app.get('port')}`)
});

// Exports the `Express App` to be used elsewhere in the project.
module.exports = app;
