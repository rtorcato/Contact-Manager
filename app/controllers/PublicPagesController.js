
module.exports.controller = function(app) {

  app.get('/home', function(req, res){
    res.redirect('/');
  });
  app.get('/services', function(req, res){
    res.render('services');
  });
  app.get('/about', function(req, res){
    res.render('about');
  });
  app.get('/workportfolio', function(req, res){
    res.render('portfolio');
  });
  app.get('/', function(req, res){
  	res.render('home');
  });
  app.get('/products', function(req, res){
    res.render('products');
  });
  app.get('/resume', function(req, res) {
      var pageData = {};
      res.render('resume', pageData);
  });
  app.get('/contact', function(req, res) {
      //allowedip.ipCheck(req, res, next);
      //var allowedip = require('./../middleware/allowedip');
      //var sentMessages = req.session.contactusMessages;
      //recaptcha.init(RecaptchaPublicKey, RecaptchaPrivateKey);
      var pageData = {
        messagesContactUsSent: req.session.messagesContactUsSent,
        maxMessages: 5
      };
      res.render('contact', pageData);
  });
}
