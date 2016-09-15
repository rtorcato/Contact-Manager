'use strict';
const express = require('express');
const app = express();
const HTTP = require('http').Server(app);
//
const helper = require("./app/helpers/general.js");
// =======================
// Config
// =======================
const config = require("./app/setup/Config").init(app);
const passport = require("./app/setup/Passport");
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
// Flash
// =======================
var flash = require('connect-flash');
app.use(flash());
// =======================
// Security
// =======================
const security = require('./app/setup/Security').init(app);
// =======================
// View Engine
// =======================
const views = require('./app/setup/ViewEngine').init(app);
// =======================
// Passport
// =======================
passport.init(app);
// =======================
// Routes
// =======================
app.use(require('./app/Routes'));
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
