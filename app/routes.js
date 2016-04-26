// app/routes.js

var Fboolean = require('./models/bool.js');

module.exports = function(app, passport) {

    app.get('/getUserID', isLoggedIn, function (req, res) {
        console.log('The user is as follows');
        console.log(req.user);
    });

    // =====================================
    // FACEBOOK ROUTES =====================
    // =====================================
    // route for facebook authentication and login
    app.get('/auth/facebook', passport.authenticate('facebook'));

    // handle the callback after facebook has authenticated the user
    app.get('/auth/facebook/callback*',
        passport.authenticate('facebook', {
            successRedirect : '/',
            failureRedirect : '/error'
        }));

    // get all booleans
    app.get('/api/booleans', function(req, res) {
      Fboolean.getAllBooleans(function (err, results) {
        if (err) return console.error(err);
        res.json(results);
      });
    });

    // get boolean by id
    app.get('/api/booleans/:id', function(req, res) {
      Fboolean.getBoolean(req.params.id, function (err, results) {
        if (err) return console.error(err);
        res.json(results);
      });
    });

    // buy
    app.get('/api/booleans/buystat/:id/:stat', function(req, res) {
      Fboolean.setBooleanStat(req.params.id, req.params.stat, function (err, results) {
        if (err) return console.error(err);
        res.json(results);
      });
    });

    // create new
    app.get('/api/createBoolean/:name', function(req, res) {
      // console.log("user : " + req.user);
      Fboolean.addBoolean(req.user, req.params.name, function (err, results) {
        if (err) return console.error(err);
        res.json(results);
      });
    });

    // fightingbools
    app.get('/api/fight-result/:id2/:id1', function(req, res) {
      Fboolean.getFight(req.params.id1, req.params.id2, function(win) {
        res.json({ won : win });
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
