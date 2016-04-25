// app/routes.js

module.export = function(app, passport) {
	app.get('/', function(req, res) {
        
    });

    // show the login form
    app.get('/login', function(req, res) {

    });

    // show the registration form
    app.get('/register', function(req, res) {

    });

    app.get('/profile', isLoggedIn, function(req, res) {
        res.render('profile.ejs', {
            user : req.user // get the user out of session and pass to template
        });
    });

    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
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