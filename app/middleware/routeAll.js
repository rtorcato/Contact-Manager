var User = require("./../models/user");

var middleware = function(app) {
    app.use(function(req, res, next) {
      //console.log("Request IP: " + req.url);
      //console.log("Request date: " + new Date());
      //Global vars
      /*res.locals.errors = req.flash("error");
      res.locals.infos = req.flash("info");
      res.locals.success_msg = req.flash('success_msg');
      res.locals.error_msg = req.flash('error_msg');
      res.locals.error = req.flash('error');
      */
      res.locals.session = req.session;
    //  res.locals.flash = req.flash;
      res.locals.user = req.user || null;
      next();
    });
    app.use(function (err, req, res, next) {
      if (err.code !== 'EBADCSRFTOKEN') return next(err)
      // handle CSRF token errors here
      res.status(403)
      res.send('session has expired or form tampered with')
    });

/*
    app.use(function(req, res, next) {
      //res.locals.currentUser = req.user;
      //res.locals.errors = req.flash("error");
      //res.locals.infos = req.flash("info");
      if (!req.session) {
          req.session.count = 1;
      } else {
          req.session.count++;
      }
      req.session.save(function(){
        console.log('setting session');
      });
      if (!req.session.count) {
        req.session.count = 0;
      }
      console.log('value in session ' + req.session.count);
      next();
    });
    */



};
module.exports.middleware = middleware;
