'use strict';

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _knexconfig = require('./knexconfig.js');

var _knexconfig2 = _interopRequireDefault(_knexconfig);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Create the app using express.
var app = (0, _express2.default)();

app.use((0, _cors2.default)());

// 'Import' & 'Mount' the router into the app.
// I.E. `http://localhost:????/api/...`.
app.use('/api', require('./router.js'));

// Allows express to Parse `request.body`.
app.use(_bodyParser2.default.urlencoded({ extended: false }));
app.use(_bodyParser2.default.json());

// Set the API's internal port.
// I.E. `http://localhost:3001`.
app.set('port', process.env.PORT || 3001);

// Allows the API to take requests on the given `port`.
// I.E. `http://localhost:3001/api/...`.
app.listen(app.get('port'), function () {
  console.log('Listening on ' + app.get('port'));
});

// Exports the `Express App` to be used elsewhere in the project.
module.exports = app;