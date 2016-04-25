/*eslint-env node*/

// This application uses express as its web server
// for more info, see: http://expressjs.com
var express = require('express');

// create a new express server
var app = express();

// cfenv provides access to your Cloud Foundry environment
// for more info, see: https://www.npmjs.com/package/cfenv
var cfenv = require('cfenv');

// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();

var passport = require('passport');
var mongoose = require('mongoose');

var FacebookStrategy = require('passport-facebook').Strategy;

mongoose.connect('mongodb://localhost/users');

// require('./config/passport')(passport); // pass passport for configuration

// serve the files out of ./public as our main files
app.use(express.static(__dirname + '/public'));
app.use(passport.initialize());
app.use(passport.initialize());
app.use(passport.session());

require('./app/routes.js')(app, passport);

// start server on the specified port and binding host
app.listen(appEnv.port, '0.0.0.0', function() {

	// print a message when the server starts listening
  console.log("server starting on " + appEnv.url);
});
