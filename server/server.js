import bodyParser from 'body-parser';
import express from 'express';
import path from 'path';
import knex from './knexconfig.js';
import cors from 'cors';
import dotenv from 'dotenv'

// Allows the API to take requests on the given `port`.
// I.E. `http://localhost:3001/api/...`.
const port = process.env.PORT || 3001;

// Create the app using express.
const app = express();

app.use(cors())


// Allows express to Parse `request.body`.
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Set the API's internal port.
// I.E. `http://localhost:3001`.
// app.set('port', (process.env.PORT || 3001));

app.listen(port), () => {
  console.log(`Listening on ${port}`)
};

// 'Import' & 'Mount' the router into the app.
// I.E. `http://localhost:????/api/...`.
app.use('/api', require('./router.js'));

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

// Exports the `Express App` to be used elsewhere in the project.
module.exports = app;
