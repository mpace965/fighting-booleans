// app/models/user.js
// load the things we need
var mongoose = require('mongoose');
var http = require('http');

// fboolean stuff
var fbooleanSchema = mongoose.Schema({
  name : String,
  alive : Boolean,
  ownerID : String,
  streaks : {
    wins : Number,
    losses : Number,
    streak : Number
  },
  stats : [{
    name : String,
    has : Boolean
  }]
});

// ALL THE stats
var allStats = [
  "strong",
  "sad",
  "angry",
  "musical",
  "stupid",
  "smart",
  "savvy",
  "cocky",
  "happy",
  "resourceful",
  "competent"
];

// create the model for users and expose it to our app
var Fboolean = module.exports = mongoose.model('Fboolean', fbooleanSchema);

// api endpoints
// get all booleans
module.exports.getAllBooleans = function(callback) {
  Fboolean.find(callback);
};

// get booleans for user id
module.exports.getBooleansByUserID = function (userID, callback) {
  Fboolean.find({ 'ownerID' : userID }, callback);
};

// get boolean by id
module.exports.getBoolean = function(id, callback) {
  Fboolean.findById(id, callback);
};

// get fight results
module.exports.getFight = function(id1, id2, callback) {
  var win = Math.random() < 0.5;

  // Fboolean.findById(id1, function(err, results) {
  //   if (err) console.error(err);
  //   var text1 = "";
  //   var text2 = "";
  //   results.stats.forEach(function(obj) {text1 += "is " + (obj.has ? "" : "not ") + obj.name + ", ";});
  //   var uriComponent = encodeURIComponent(text1);
  //   var json1;
  //   getWatsonStuff(uriComponent, function(data) {
  //     json1 = data;
  //       console.log("json 2 " + json1);
  //   });
  //   console.log("json 1 " + json1);
  // });

  if (win) {
    booleanWin(id1);
    booleanLoss(id2);
    callback(true);
  }
  else {
    booleanWin(id2);
    booleanLoss(id1);
    callback(false);
  }
};

// creating a new boolean
module.exports.addBoolean = function(id, boolName, callback) {
  var boolTemp = new Fboolean({
    name : boolName,
    alive : true,
    ownerID : id,
    streaks : {
      wins : 0,
      losses : 0,
      streak : 0
    },
    stats : []
  });
  allStats.forEach(function (temp) {
    boolTemp.stats.push({ name : temp, has : false, _id : null});
  });
  boolTemp.save(callback);
};

// set stat of a boolean
module.exports.setBooleanStat = function(id, stat, callback) {
  Fboolean.update(
    { "_id" : id, "stats.name" : stat},
    { $set: { "stats.$.has" : true }},
    { 'new' : true },
    callback
  );
};

// delete boolean
module.exports.deleteBoolean = function(id, callback) {
  Fboolean.findOneAndRemove({ "_id" : id }, callback);
};

// boolean death by id
module.exports.setBooleanDeath = function (booleanID, callback) {
  Fboolean.update(
    { '_id' : booleanID},
    { 'alive' : false},
    { 'new' : true },
    callback
  );
};

// increment boolean win by id
booleanWin = function (booleanID) {
  Fboolean.update(
    { '_id' : booleanID},
    { $inc : { 'streaks.wins' : 1, 'streaks.streak' : 1 }},
    { 'new' : true },
    function (err, results) {
      if (err) return console.error(err);
    }
  );
};

// increment boolean loss by id
booleanLoss = function (booleanID) {
  Fboolean.update(
    { '_id' : booleanID},
    { 'streaks.streak' : 0, $inc : { 'streaks.losses' : 1 }},
    { 'new' : true },
    function (err, results) {
      if (err) return console.error(err);
    }
  );
};

// watson calls
getWatsonStuff = function (rest, callback) {
  http.get({
    host : "gateway-a.watsonplatform.net",
    path : "/calls/text/TextGetEmotion?apikey=411671034f8b539058d0c8494f1c6d30543754d4&outputMode=json&text=" + rest
  },
  function (response) {
    var body = '';
    response.on('data', function(d) {
      body += d;
    });
    response.on('end', function() {
      // Data reception is done, do whatever with it!
      var parsed = JSON.parse(body);
      callback(parsed);
    });
  });
};
