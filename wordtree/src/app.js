import dispatcher from './routes';
import path from 'path';
import ejs from 'ejs';

// this application uses express as its web server
var express = require('express');

// cfenv provides access to your Cloud Foundry environment
var cfenv = require('cfenv');

// create a new express server
var app = express();

// set static path
app.use(express.static(__dirname + '/public'));

// set views path
app.set('views', path.join(__dirname, 'views'));

// use ejs as view engine
app.set('view engine', ejs);

// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();

// set router
dispatcher(app);

// start server on the specified port and binding host
app.listen(appEnv.port, '0.0.0.0', function () {
  // print a message when the server starts listening
  console.log("server starting on " + appEnv.url);
});