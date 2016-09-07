
module.exports.init = function(app) {
  const session     = require('express-session');
  const MongoStore  = require('connect-mongo')(session);
  const config = require('./../../config/app');
  var mongoose = app.get('mongoose');
  app.use(session({
    resave: true,
    saveUninitialized: true,
      secret: app.get('superSecret'),
      store: new MongoStore({ mongooseConnection: mongoose.connection, ttl: config.sessionExpiration, autoReconnect: true  }
      )}));
      //cookie: { maxAge: 60000,secure:true }
};
