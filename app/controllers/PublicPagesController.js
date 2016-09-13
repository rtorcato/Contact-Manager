var isAuthenticated = require('./../middleware/isAuthenticated');
function goToHome(req, res){
  if (req.user){
    res.redirect('/dashboard');
  }else{
    res.render('home');
  }
}
module.exports.controller = function(app) {
  app.get('/home', function(req, res){
    goToHome(req, res);
  });
  app.get('/', function(req, res){
    goToHome(req, res);
  });
  app.get('/dashboard', isAuthenticated, function(req, res){
    res.render('dashboard');
  });
}
