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
    mongoUrl = env['mongodb-2.4'][0]['credentials'];
  }
}
mongoose.connect(mongoUrl);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Connection successful!");
});

// fboolean stuff
var fbooleanSchema = mongoose.Schema({
  name : String,
  alive : Boolean,
  ownerID : String,
  ownerName : String,
  streaks : {
    wins : Number,
    losses : Number,
    streak : Number
  },
  stats : [{
    name : String
    has : Boolean
  }]
});

// copile the model
var Fboolean = mongoose.model('Fboolean', fbooleanSchema);

// insert new Fboolean
var bitch = new Fboolean({
  name : 'Bitch',
  alive : true,
  ownerID : 'ThomasFlaanel111',
  ownerName : 'Thomas Fanella',
  streaks : {
    wins : 10,
    losses : 10,
    streak : 5
  },
  stats : [{
    name : 'competency'
    has : false
  }]
});
console.log(bitch.name);

// save the boolean
bitch.save(function (err, bitch) {
  if (err) return console.error(err);
})

// find methods
Fboolean.find(function (err, arr) {
  var map = arr.map(function (obj) {
    return obj.name;
  });
  console.log(map);
});

// end mongoose tests


var FACEBOOK_APP_ID = 265118990493490;
var FACEBOOK_APP_SECRET = "21acbc29fac79d69188785a6f36b3b6c";
var profile1;

passport.use(new FacebookStrategy({
    clientID: FACEBOOK_APP_ID,
    clientSecret: FACEBOOK_APP_SECRET,
    callbackURL: "http://fightingbooleans.mybluemix.net/"
    //callbackURL: "http://www.example.com/auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOrCreate(function(err, user) {
      if (err) { return done(err); }
      done(null, user);
    });
    profile1 = profile;
  }
));

// API endpoints
// Redirect the user to Facebook for authentication.  When complete,
// Facebook will redirect the user back to the application at
//     /auth/facebook/callback
app.get('/auth/facebook', passport.authenticate('facebook'));

// Facebook will redirect the user to this URL after approval.  Finish the
// authentication process by attempting to obtain an access token.  If
// access was granted, the user will be logged in.  Otherwise,
// authentication has failed.
app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { successRedirect: '/',
                                      failureRedirect: '/login' }));

app.get('/print', function (req, res) {
  console.log('test');
  console.log('profile1');
});
