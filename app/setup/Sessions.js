
module.exports.init = function(app) {
  const session     = require('express-session');
  const MongoStore  = require('connect-mongo')(session);
  const sessionExpiration = (1 * 24 * 60 * 60);
  var mongoose = app.get('mongoose');
  app.use(session({
    resave: true,
    saveUninitialized: true,
      secret: process.env.APP_SECRET ,
      store: new MongoStore({ mongooseConnection: mongoose.connection, ttl: sessionExpiration, autoReconnect: true  }
      )}));
      //cookie: { maxAge: 60000,secure:true }
};
