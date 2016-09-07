const passport = require('passport');
const LocalStrategy = require("passport-local").Strategy;
const BasicStrategy = require('passport-http').BasicStrategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const TwitterStrategy = require('passport-twitter').Strategy;
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

var User = require("./../models/user");
var callbackURL = process.env.BASE_URL + '/auth/login/';
var localOptions = {
    usernameField: 'email',
    passwordField: 'password',
    session: true,
    passReqToCallback: true
};
var googleOptions = {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: callbackURL + 'google/callback'
};
var twitterOptions = {
    consumerKey: process.env.TWITTER_CONSUMER_KEY,
    consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
    callbackURL: callbackURL + 'twitter/callback',
    includeEmail: true
};
var facebookOptions = {
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: callbackURL + 'facebook/callback',
    profileFields: ['email', 'id', 'first_name', 'gender', 'last_name', 'picture'],
    //profileFields: ['id', 'displayName', 'link', 'about_me', 'photos', 'email'],
    //passReqToCallback: true, enableProof: true
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
    passport.use(new TwitterStrategy(twitterOptions, function(accessToken, refreshToken, profile, done) {
      process.nextTick(function() {
        done({ accessToken: accessToken, refreshToken: refreshToken, profile: profile });
        });
    }));
    passport.use(new FacebookStrategy(facebookOptions, function(accessToken, refreshToken, profile, done) {
      // make the code asynchronous User.findOne won't fire until we have all our data back from Twitter
        process.nextTick(function() {
        done({ accessToken: accessToken, refreshToken: refreshToken, profile: profile });
        });
    }));
    passport.use(new GoogleStrategy(googleOptions, function(accessToken, refreshToken, profile, done) {
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
        // User.findOne wont fire unless data is sent back
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
    /*
    passport.use(new FacebookStrategy(facebookOptions,
        // facebook will send back the token and profile
        function(req, token, tokenSecret, profile, done) {
            done(token, tokenSecret, profile);
            return;
            if (req.user) {
                // Not logged-in. Authenticate based on  account.
                return done(null, req.user);
              } else {
                //already logged in
                return done(null, req.user);
              }
            // asynchronous
            process.nextTick(function() {
                //if this user has no email we need to save the FB session and redirect them to ask for email.

                var email = profile.email || profile.emails[0].value;
                // facebook can return multiple emails so we'll take the first
                if (!email) {
                    console.log('this user has no email in his FB');
                    var err = { message: 'this user is missing an email' };
                    return done(null, null, profile);
                }
                User.findOne({ 'email': email }, function(err, user) {
                    if (err) {
                        return done(err) };
                    if (user) {
                        //successful login!
                        console.log('found user');
                        return done(null, user); // user found, return that user
                    } else {
                        console.log(profile);
                        console.log('done2');
                        console.log('save the fb stuff to session, we need more info');
                        // if there is no user found with that facebook id, create them
                        var newUser = new User();
                        // set all of the facebook information in our user model
                        newUser.facebook.id = profile.id; // set the users facebook id
                        newUser.facebook.token = token; // we will save the token that facebook provides to the user
                        newUser.facebook.name = profile.name.givenName + ' ' + profile.name.familyName; // look at the passport user profile to see how names are returned
                        newUser.lastname = profile.name.familyName;
                        newUser.firstname = profile.name.givenName;
                        newUser.password = User.createRandomPassword();
                        newUser.username = User.createRandomPassword();
                        //newUser.photo = newUser.facebook.image = profile.picture;
                        //console.log(profile);
                        //console.log(profile);
                        newUser.picture = 'photo.jpg';
                        if (profile.photos) {
                            newUser.picture = profile.photos[0].value
                        }
                        //  console.log(profile);
                        //newUser.facebook.image = profile.photos[0].value;
                        newUser.email = newUser.facebook.email = email;
                        newUser.gender = profile.gender || '';
                        // save our user to the database
                        newUser.save(function(err) {
                            if (err) {
                                //console.log(err);
                                return done(err);
                            }
                            return done(null, newUser);
                        });
                    }
                });
            });

        }));
*/
};
