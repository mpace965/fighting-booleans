// app/models/user.js
// load the things we need
var mongoose = require('mongoose');

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

// get boolean by id
module.exports.getBoolean = function(id, callback) {
  Fboolean.findById(id, callback);
};

// get fight results
module.exports.getFight = function(id1, id2, callback) {
  var win = Math.random() < 0.5;
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

// get booleans for user id
exports.getBooleansByUserID = function (userID) {
  console.log('getBooleansByUserID');
  Fboolean.find({ 'ownerID' : userID }, function (err, results) {
    if (err) return console.error(err);
    console.log('getBooleansByUserID results = ');
    results.map(function (obj) {
      console.log(obj.name + ' : wins = ' + obj.streaks.wins + ' : alive = ' + obj.alive + ' : id = ' + obj._id);
    });
  });
};

// get boolean by id
exports.getBoolean = function (booleanID) {
  console.log('getBoolean');
  Fboolean.findOne({ '_id' : booleanID }, function (err, results) {
    if (err) return console.error(err);
    console.log('getBoolean results = ' + results);
  });
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

// boolean death by id
exports.booleanDeath = function (booleanID) {
  console.log('booleanDeath');
  Fboolean.findOneAndUpdate(
    { '_id' : booleanID},
    { 'alive' : false},
    { 'new' : true },
    function (err, results) {
      console.log('booleanDeath results = ' + results);
    }
  );
};

// fighting two booleans returns true if id1 wins
exports.fight = function (id1, id2) {
  console.log('fight');

  console.log('fight results = ' + win);
};
