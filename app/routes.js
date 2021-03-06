// app/routes.js

var Fboolean = require('./models/bool.js');

module.exports = function(app, passport) {

    // gets the user id
    app.get('/getUserID', isLoggedIn, function (req, res) {
        res.send(req.user.id);
    });

    // check if user is authenticated
    app.get('/auth/isAuthenticated', function (req, res) {
        res.json({ auth: req.isAuthenticated() });
    });

    // route for facebook logout
    app.get('/logout', isLoggedIn, function(req, res) {
        req.logout();
        res.redirect('/');
    });

    // route for facebook authentication and login
    app.get('/auth/facebook', passport.authenticate('facebook'));

    // handle the callback after facebook has authenticated the user
    app.get('/auth/facebook/callback*',
        passport.authenticate('facebook', {
            successRedirect : '/',
            failureRedirect : '/error'
        }));

    // get all booleans
    app.get('/api/booleans', isLoggedIn, function(req, res) {
      Fboolean.getAllBooleans(function (err, results) {
        if (err) return console.error(err);
        if (req.user) {
          var arr = populateOwnerArr(results, req.user.id);
          res.json(arr);
        }
        else {
          res.json(results);
        }
      });
    });

    // get all booleans
    app.get('/api/booleans/mine', isLoggedIn, function(req, res) {
      Fboolean.getBooleansByUserID(req.user.id, function (err, results) {
        if (err) return console.error(err);
        var arr = populateOwnerArr(results, req.user.id);
        res.json(arr);
      });
    });

    // get boolean by id
    app.get('/api/boolean/:id', isLoggedIn, function(req, res) {
      Fboolean.getBoolean(req.params.id, function (err, results) {
        if (err) return console.error(err);
        var obj = populateOwnerObj(results, req.user.id);
        res.json(obj);
      });
    });

    // get boolean by id
    app.get('/api/boolean/delete/:id', isLoggedIn, function(req, res) {
      Fboolean.getBoolean(req.params.id, function (err, results) {
        if (err) return console.error(err);
        var obj = populateOwnerObj(results, req.user.id);
        
        if (obj.ownedBy) {
          Fboolean.deleteBoolean(req.params.id, function (err, results) {
            if (err) return console.error(err);
            res.redirect('/manage');
          });
        } else {
          res.json(obj);
        }
      });
    });

    // buy
    app.get('/api/boolean/buystat/:id/:stat', isLoggedIn, function(req, res) {
      Fboolean.setBooleanStat(req.params.id, req.params.stat, function (err, results) {
        if (err) return console.error(err);
        res.json(results);
      });
    });

    // create new
    app.get('/api/createBoolean/:name', isLoggedIn, function(req, res) {
      // console.log("user : " + req.user);
      Fboolean.addBoolean(req.user.id, req.params.name, function (err, results) {
        if (err) return console.error(err);
        var obj = populateOwnerObj(results, req.user.id);
        res.json(obj);
      });
    });

    // fightingbools
    app.get('/api/fight-result/:id2/:id1', isLoggedIn, function(req, res) {
      Fboolean.getFight(req.params.id1, req.params.id2, function(win) {
        res.json({ won : win });
      });
    });

    // kill boolean
    app.get('/api/boolean/kill/:id', isLoggedIn, function(req, res) {
      Fboolean.setBooleanDeath(req.params.id, function(err, results) {
        if (err) console.error(err);
        res.json(results);
      });
    });
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}

function populateOwnerArr(results, userID) {
  return results.map(function(tempObj) {
    var obj = tempObj.toObject();
    obj.ownedBy = (obj.ownerID == userID);
    return obj;
  });
}

function populateOwnerObj(results, userID) {
  var obj = results.toObject();
  obj.ownedBy = (obj.ownerID == userID);
  return obj;
}
