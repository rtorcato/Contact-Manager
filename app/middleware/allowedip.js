var ALLOWED_IPS = [
  "127.0.0.2",
  "123.456.7.89"
];
const express        = require('express');
var api = express.Router();
api.use(function(req, res, next) {
//function ipCheck(req, res, next) {
  var userIsAllowed = ALLOWED_IPS.indexOf(req.ip) !== -1;
  if (!userIsAllowed) {
    res.status(401).send("Not authorized!");
  } else {
    next();
  }
});

module.exports = api;
