
module.exports.controller = function(app) {

  app.get('/home', function(req, res){
    res.redirect('/');
  });
  app.get('/', function(req, res){
    res.render('home');
  });

}
