/*eslint-env node*/

//------------------------------------------------------------------------------
// node.js starter application for Bluemix
//------------------------------------------------------------------------------

// This application uses express as its web server
// for more info, see: http://expressjs.com
var express = require('express');

// cfenv provides access to your Cloud Foundry environment
// for more info, see: https://www.npmjs.com/package/cfenv
var cfenv = require('cfenv');

// account passport authentication
var passport = require('passport');

// facebook strategy for passport
var FacebookStrategy = require('passport-facebook').Strategy;

// mongodb client
var mongoose = require('mongoose');

// booleans require
var booleans = require('./config/booleans.js');

// create a new express server
var app = express();

// serve the files out of ./public as our main files
app.use(express.static(__dirname + '/public'));

// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();

// start server on the specified port and binding host
app.listen(appEnv.port, '0.0.0.0', function() {

	// print a message when the server starts listening
  console.log("server starting on " + appEnv.url);
});

// mongodb connection
//var url = 'mongodb://1f71ac31-c4f7-495a-be66-54a2b8759702:0ca3ef65-12c9-4855-998d-5470fdc00cea@192.155.243.23:10120/db';
var mongoUrl = "mongodb://localhost:27017/db";
if (process.env.VCAP_SERVICES) {
  var env = JSON.parse(process.env.VCAP_SERVICES);
  if (env['mongodb-2.4']) {
    mongoUrl = env['mongodb-2.4'][0]['credentials']['url'];
  }
}
console.log("mongo url = " + mongoUrl);

mongoose.connect(mongoUrl);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', function() {
  console.log("Connection successful!");
});

// tests
//createNewBooleanByUserID('ThomasFlaanel111', 'Thomas Fanella', 'Bitch21010');
booleans.getBooleansByUserID('ThomasFlaanel111');
booleans.booleanDeath('571ec4e11bd43fbc17a4df62');
// booleans.booleanWin('571ec4e11bd43fbc17a4df62');
//booleans.getBoolean('571ec4e11bd43fbc17a4df62');
