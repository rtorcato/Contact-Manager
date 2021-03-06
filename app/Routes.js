var express = require('express'),
    fs = require("fs"),
    passport = require("passport"),
    router = express.Router(),
    path = require('path'),
    siteController = require('./controllers/SiteController'),
    authController = require('./controllers/AuthController'),
    errorController = require('./controllers/ErrorController'),
    isAuthenticated = require('./middleware/isAuthenticated');

// export the router
module.exports = router;
//Global vars
router.use(function(req, res, next) {
  res.locals.session = req.session;
  //  res.locals.flash = req.flash;
  res.locals.user = req.user || null;
  next();
});
// site routes ========================
router.get('/', siteController.showHome);
router.get('/home', siteController.showHome);
router.get('/dashboard', isAuthenticated, siteController.showDashboard);
router.get('/contacts', isAuthenticated, siteController.showContacts);
router.get('/contacts/create', isAuthenticated, siteController.createContact);
router.post('/contacts/create', isAuthenticated, siteController.createContact);
// Auth Routes  ===================
router.get('/auth/logout', authController.doLogout);
router.get('/auth/login/facebook', authController.doFacebookLogin);
router.get('/auth/login/facebook/callback', authController.doFacebookCallback);

//router.get('/@:username/:post_slug', nameCheckMiddleware, siteController.showProfile);
// Api Routes  ===================
router.get('/api', siteController.showApiHome);


// 404 catchall
router.use(errorController.show404);
// 500 catchall
router.use(errorController.showError);
