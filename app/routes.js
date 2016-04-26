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
    app.get('/logout', function(req, res) {
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
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}
