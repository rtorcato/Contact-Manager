const passport = require("passport");
//const LocalStrategy = require("passport-local").Strategy;
const User = require("./../models/user");
//const expressJwt = require('express-jwt');
const validator = require('validator');
const flash = require('flash');
const helper = require("./../helpers/general.js");
const successUrl = '/dashboard';

//Auth Middleware
module.exports.isApiAuthenticated = passport.authenticate('client-basic', { session: false });
module.exports.isAuthenticated = passport.authenticate('client-basic', { session: true });
//
module.exports.controller = function(app) {
    // =========================================================================
    // Social logins
    // =========================================================================
    app.get('/auth/login/facebook', passport.authenticate('facebook', { session: false, authType: 'rerequest', scope: ['email'] }));
    app.get('/auth/login/facebook/callback', function(req, res, next) {
        var socialNetwork = 'facebook';
        passport.authenticate(socialNetwork, function(data) {
            passportResult(socialNetwork, data, req, res);
        })(req, res, next);
    });

    function passportResult(socialNetwork, data, req, res) {
        var socialNetworkTitleCase = helper.toTitleCase(socialNetwork);
        if (!data) {
            ///user clicked cancel to accept facebook app or other fb error
            return showLoginErrorMessage(req, res, null, socialNetworkTitleCase + ' login failed.');
        }
        if (data.status == 500){
          //error on fb
          return showLoginErrorMessage(req, res, null, socialNetworkTitleCase + ' problem with Facebook Application Setup.');
        }
        var socialUserID = data.profile.id;
        var socialUserData = {
            socialNetwork: socialNetwork,
            socialNetworkTitleCase: socialNetworkTitleCase,
            data: data, //original data from social network
            id: socialUserID
        }
        var socialSearch = '';
        switch (socialNetwork) {
            case 'facebook':
                socialSearch = { 'facebook.id': socialUserID };
                socialUserData.email = data.profile.emails[0].value || '',
                socialUserData.photo = data.profile.photos[0].value || '';
                socialUserData.firstname = data.profile.name.givenName || '';
                socialUserData.lastname = data.profile.name.familyName || '';
                socialUserData.gender = data.profile.gender;
        }
        //search for this social id in our users
        var query = User.findOne(socialSearch);
        query.exec(function(err, user) {
            if (err) {
                // if there are any errors, return the error
                return showLoginErrorMessage(req, res, err, socialNetwork + ' database error.');
            } else {
                if (user) {
                    //we found the social user in our database log them in
                    req.logIn(user, function(err) {
                        if (err) {
                            return showLoginErrorMessage(req, res, err, socialNetwork + ' login social user failed.');
                        } else {
                            res.redirect(successUrl);
                        }
                    });
                } else {
                    // social login worked so now we are going to create a new social user
                    createNewSocialAccount(socialUserData, function(err, newsocialuser) {
                        if (err) {
                            return showLoginErrorMessage(req, res, err, socialUserData.socialNetwork + ' create new social user failed.');
                        } else {
                            req.logIn(newsocialuser, function(err) {
                                if (err) {
                                    return showLoginErrorMessage(req, res, err, socialUserData.socialNetwork + ' create new social user failed.');
                                }
                                res.redirect(successUrl);
                            });
                        }
                    });
                }
            }
        });
    }

    function showLoginErrorMessage(req, res, err, message) {
        req.flash('message', message);
        req.flash('messageLevel', 'danger');
        console.log(err);
        res.redirect('/?error');
    }

    function createNewSocialAccount(socialUserData, callback) {
        var newUser = new User({
            status: 'active',
            email: socialUserData.email,
            firstname: socialUserData.firstname,
            lastname: socialUserData.lastname
        });
        //  console.log(profile);
        if (socialUserData.socialNetwork == 'facebook') {
            newUser.picture = socialUserData.photo
            newUser.gender = socialUserData.gender || '';
            newUser.facebook.id = socialUserData.id; // set the users facebook id
            newUser.facebook.token = socialUserData.accessToken; // we will save the token that facebook provides to the user
            newUser.facebook.email = socialUserData.email; // facebook can return multiple emails so we'll take the first
        }
        newUser.setPasswordForNewSocialUser();
        //social users don't need to register via email.
        newUser.registrationToken = undefined;
        newUser.registrationTokenExpires = undefined;
        // save the user
        newUser.save(function(err) {
            if (err) {
                callback(err);
            } else {
                callback(null, newUser);
            }
        });
    }
    // =========================================================================
    // Logout
    // =========================================================================
    app.get("/auth/logout", function(req, res) {
        //console.log('you are logged out'); //req.flash('success_msg', 'You are logged out');
        req.logout();
        req.session.destroy();
        res.redirect("/");
    });

}
