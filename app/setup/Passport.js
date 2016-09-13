const passport = require('passport');
const LocalStrategy = require("passport-local").Strategy;
const BasicStrategy = require('passport-http').BasicStrategy;
const FacebookStrategy = require('passport-facebook').Strategy;

var User = require("./../models/user");
var callbackURL = process.env.BASE_URL + '/auth/login/';

var localOptions = {
    usernameField: 'email',
    passwordField: 'password',
    session: true,
    passReqToCallback: true
};

var facebookOptions = {
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: callbackURL + 'facebook/callback',
    profileFields: ['email', 'id', 'first_name', 'gender', 'last_name', 'picture'],
}

module.exports.init = function(app) {
    app.use(passport.initialize());
    app.use(passport.session());
    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session
    passport.serializeUser(function(user, done) {
        done(null, user.email);
    });
    // used to deserialize the user
    passport.deserializeUser(function(email, done) {
        User.findOne({ 'email': email }, function(err, user) {
            done(err, user);
        });
    });
    passport.use(new FacebookStrategy(facebookOptions, function(accessToken, refreshToken, profile, done) {
      // make the code asynchronous User.findOne won't fire until we have all our data back from Twitter
        process.nextTick(function() {
          done({ accessToken: accessToken, refreshToken: refreshToken, profile: profile });
        });
    }));

    // =========================================================================
    // Basic login ============================================================
    // =========================================================================
    passport.use('client-basic', new BasicStrategy(
        function(username, password, callback) {
            User.findOne({ username: username }, function(err, user) {
                if (err) {
                    return callback(err);
                }
                // No user found with that username
                if (!user) {
                    return callback(null, false);
                }
                // Make sure the password is correct
                user.verifyPassword(password, function(err, isMatch) {
                    if (err) {
                        return callback(err);
                    }
                    // Password did not match
                    if (!isMatch) {
                        return callback(null, false);
                    }
                    // Success
                    return callback(null, user);
                });
            });
        }
    ));

    // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use("local-login", new LocalStrategy(localOptions, function(req, email, password, done) {
        // asynchronous
        process.nextTick(function() {
            User.findOne({ email: email, status:'active' }, function(err, user) {
                if (err) {return done(err);}
                // check to see if theres already a user with that email
                // if no user is found, return the message
                if (!user) {
                    return done(null, false, 'Login failed'); // req.flash is the way to set flashdata using connect-flash
                }
                // if the user is found but the password is wrong
                if (!user.validPassword(password)) {
                    return done(null, false, 'Oops! Wrong password.'); // create the loginMessage and save it to session as flashdata
                }
                // all is well, return successful user
                req.logIn(user, function(err) {
                    if (err) {return done(null, false, 'Oops! Problem logging in.');}
                    return done(null, user, 'success');
                });
            });
        });
    }));
};
