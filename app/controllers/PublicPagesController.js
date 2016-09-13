
module.exports.controller = function(app) {

  app.get('/home', function(req, res){
    res.redirect('/');
  });
  app.get('/', function(req, res){
    res.render('home');
  });
  app.get('/dashboard', function(req, res){
    res.render('dashboard');
  });

}
