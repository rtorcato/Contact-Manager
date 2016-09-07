var express = require('express');
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var User = require('./../models/user');
var fs = require('fs');
var path = require('path');
//var COMMENTS_FILE = path.join(__dirname, 'comments.json');
//var auth = jwt({secret: process.env.API_TOKEN_KEY, userProperty: 'payload'});

function tokenProtected(req, res, next) {
  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  // decode token
  if (token) {
    // verifies secret and checks exp
    jwt.verify(token, process.env.API_TOKEN_KEY, function(err, decoded) {
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;
        next();
      }
    });
  } else {
    // if there is no token return an error
    return res.status(403).send({ success: false, message: 'No token provided.' });
  }
}
module.exports.init = function(app) {
    var apiRouter = new express.Router();
    var route = require('../controllers-api/ContactController');
    //route.controller(apiRouter);
    //route = require('../controllers-api/UserController');
    route.controller(apiRouter);
    // route to show a random message (GET http://localhost:8080/api/)
    apiRouter.get('/', function(req, res) {
        res.json({ message: 'Welcome to the coolest API on earth!' });
    });

    // route to return all users (GET http://localhost:8080/api/users)
    apiRouter.get('/userlist', function(req, res) {
        User.find({}, function(err, users) {
            res.json(users);
        });
    });

    ///get api token
    apiRouter.post('/authenticate', function(req, res) {
        User.findOne({ email: req.body.email }, function(err, user) {
            if (err) throw err;
            if (!user) {
                res.json({ success: false, message: 'Authentication failed. User not found.' });
            } else if (user) {
                // check if password matches
                if (!user.validPassword(req.body.password)){
                  res.json({ success: false, message: 'Authentication failed. Wrong password.' });
                }else{
                  // if user is found and password is right create a token
                  res.json({ success: true, message: 'Enjoy your token!', token: user.generateJWT() });
                }
            }
        });
    });
    //
    apiRouter.get('/protected', tokenProtected, function(req, res) {
      //headers:x-access-token
    //  console.log(req.decoded);
        res.json({ message: 'Welcome to the coolest token protected API on earth!' });
    });


    apiRouter.get('/comments', function(req, res) {
      fs.readFile(process.cwd()+'/public/comments.json', function(err, data) {
        if (err) {
          console.error(err);
          process.exit(1);
        }
        res.json(JSON.parse(data));
      });
    });
    //
    app.use('/api', apiRouter);
};
