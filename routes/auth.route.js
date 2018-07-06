module.exports = function (app, passport) {

    // show the home page (will also have our login links)
    app.get('/api/', function (req, res, next) {
        res.status(200).send({ status: "success", message: "Welcome to the API." });
    });

    // GET LOGIN
    app.get('/login', function (req, res) {
        res.status(200).send({ status: "success", message: "Welcome to the login page." });
    });

    // POST LOGIN
    app.post('/api/login', function (req, res, next) {

        passport.authenticate('local-login', function (err, user, info) {

            let response = {};

            if (err) {
                response.status = 'error';
                response.data = err;
                response.message = 'Something went wrong.';
                res.status(200).send(response);
            } else if (!user) {
                response.status = 'error';
                response.message = req.session.flash.loginMessage[0];
                req.session.destroy();
                res.status(200).send(response);
            } else if (user) {
                req.logIn(user, function (err) {
                    if (err) {
                        response.status = 'error';
                        response.data = err;
                        response.message = 'Something went wrong.';
                        res.status(200).send(response);
                    } else {
                        response.status = 'success';
                        response.data = user;
                        res.send(response);
                    }
                });
            }
        })(req, res, next);
    });
    
    // LOGOUT
    app.get('/api/logout', isLoggedIn, function (req, res) {
        req.logout();
        res.send({ status: 'success', data: 'Successfully logged out.' });
    });
    
    // All requests other than above will be checked here
    app.all('/api/*', function (req, res, next) {
        isLoggedIn(req, res, next);
    });

};

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.status(401).send({ status: 'error', code: 'LOGGED_OUT', data: 'You are not logged in.' });
    }
}
