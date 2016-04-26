/*eslint-env node*/

// This application uses express as its web server
// for more info, see: http://expressjs.com
var express = require('express');

// create a new express server
var app = express();

var path = require('path');

// cfenv provides access to your Cloud Foundry environment
// for more info, see: https://www.npmjs.com/package/cfenv
var cfenv = require('cfenv');

// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();

var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var cookieParser = require('cookie-parser');
var mongoose = require('mongoose');
var session = require('express-session');

//mongoose.connect('mongodb://localhost/users');
// mongodb connection
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

require('./config/passport')(passport);
require('./app/routes.js')(app, passport);

// serve the files out of ./public as our main files
app.use(express.static(__dirname + '/public'));
app.use(cookieParser());
app.use(session({ secret: 'fightingbools' }));
app.use(passport.initialize());
app.use(passport.session());

app.get('*', function (request, response){
  response.sendFile(path.resolve(__dirname, './public', 'index.html'))
})

// start server on the specified port and binding host
app.listen(appEnv.port, '0.0.0.0', function() {

	// print a message when the server starts listening
  console.log("server starting on " + appEnv.url);
});
