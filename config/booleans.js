var mongoose = require('mongoose');

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
    name : String,
    has : Boolean
  }]
});

// copile the model
var Fboolean = mongoose.model('Fboolean', fbooleanSchema);

// create new boolean by user
exports.createNewBooleanByUserID = function (userID, userName, booleanName) {
  console.log('createNewBooleanByUserID');
  var boolTemp = new Fboolean({
    name : booleanName,
    alive : true,
    ownerID : userID,
    ownerName : userName,
    streaks : {
      wins : 0,
      losses : 0,
      streak : 0
    },
    stats : []
  });
  boolTemp.save(function (err, results) {
    if (err) return console.error(err);
    console.log('createNewBooleanByUserID results = ' + results._id);
  });
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
exports.booleanWin = function (booleanID) {
  console.log('booleanWin');
  Fboolean.findOneAndUpdate(
    { '_id' : booleanID},
    { $inc : { 'streaks.wins' : 1, 'streaks.streak' : 1 }},
    { 'new' : true },
    function (err, results) {
      console.log('booleanWin results = ' + results);
    }
  );
};

// increment boolean loss by id
exports.booleanLoss = function (booleanID) {
  console.log('booleanLoss');
  Fboolean.findOneAndUpdate(
    { '_id' : booleanID},
    { 'streaks.streak' : 0, $inc : { 'streaks.losses' : 1 }},
    { 'new' : true },
    function (err, results) {
      console.log('booleanLoss results = ' + results);
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
