var isAuthenticated = require('./../middleware/isAuthenticated');
const User = require("./../models/user");

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
    var pageData = {};
    User.find({}).limit(10).sort({ createdAt: -1 }).select({ firstname: 1, lastname: 1, picture: 1, facebook:1 }).exec(function(err, users){
    //console.log(users.length); // 1000 only
    if (err) {

    }
    pageData.users = users;
    res.render('dashboard', pageData);
    });;
  /*
    User.find({}, 'firstname lastname picture',function(err, users) {
        if (err) {

        }
        var pageData = {users: users};
        res.render('dashboard', pageData);
    });
    */
  });
}
