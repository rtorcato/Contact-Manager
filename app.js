'use strict';
var express     = require('express');
var app         = express();
var HTTPS = require("https").Server(app);
var HTTP = require('http').Server(app);
// Create our Express router
var router = express.Router();
//
var helper = require("./app/helpers/general.js");
//helper.getOembed('test');
//var oembed = require("oembed-auto");
// =======================
// Config
// =======================
var config = require("./app/setup/Config").init(app, express);
// =======================
// Logging
// =======================
const logging = require('./app/setup/Logging').init(app);
// =======================
// Database
// =======================
const databases = require('./app/setup/Databases').init(app);
// =======================
// Sessions
// =======================
const sessions = require('./app/setup/Sessions').init(app);
// =======================
// Security
// =======================
const security = require('./app/setup/Security').init(app);
// We are going to protect /api routes with JWT
// =======================
// Models
// =======================
const models = require('./app/setup/Models').init(app);
// =======================
// View Engine
// =======================
const views = require('./app/setup/ViewEngine').init(app);
// =======================
// Flash
// =======================
var flash = require('connect-flash');
app.use(flash());
// =======================
// Passport
// =======================
// //const passport = require("./app/setup/Passport");
//var setUpPassport = require("./app/setup/Passport").init(app);
// =======================
// API
// =======================
const apiRoutes = require('./app/setup/Api').init(app);
// =======================
// Routes
// =======================
const routes = require('./app/setup/Routes').init(app);
//
// Register all our routes
app.use(router);
// =======================
// Socket IO
// =======================
//const socketio = require('./app/setup/SocketIO').init(app, HTTP, HTTPS);

// =======================
// start the server ======
// =======================
const server = require('./app/setup/Server').init(app, HTTP, HTTPS);
//////////////////////////
module.exports = app;
