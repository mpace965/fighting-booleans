// app/routes.js

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
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}
