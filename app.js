'use strict';
const express = require('express');
const app = express();
const flash = require('connect-flash');
//var HTTPS = require("https").Server(app);
const HTTP = require('http').Server(app);
//
const passport = require("./app/setup/Passport");
// Create our Express router
const router = express.Router();
//
const helper = require("./app/helpers/general.js");
// =======================
// Config
// =======================
const config = require("./app/setup/Config").init(app, express);
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
// =======================
// Models
// =======================
const models = require('./app/setup/Models').init(app);
// =======================
// View Engine
// =======================
const views = require('./app/setup/ViewEngine').init(app);
// =======================
// Passport
// =======================

passport.init(app);
// =======================
// API
// =======================
const apiRoutes = require('./app/setup/Api').init(app);
// =======================
// Routes
// =======================
const routes = require('./app/setup/Routes').init(app);
// Register all our routes
app.use(router);
// =======================
// Socket IO
// =======================
//const socketio = require('./app/setup/SocketIO').init(app, HTTP);

// =======================
// start the server ======
// =======================
const server = require('./app/setup/Server').init(app, HTTP);
//////////////////////////
module.exports = app;
