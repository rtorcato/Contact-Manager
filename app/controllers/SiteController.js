var path = require('path');
const User = require("./../models/user");

module.exports = {
  showHome: showHome,
  showApiHome: showApiHome,
  showDashboard: showDashboard,
  showContacts: showContacts,
  createContact: showContactCreate,
  editContact: showContactEdit,
};

function goToHome(req, res){
  //console.log(req.user);
  if (req.user){
    //console.log('redirect to dashboard');
    res.redirect('/dashboard');
  }else{
    var pageData = {};
    User.find({}).limit(10).sort({ createdAt: -1 }).select({ firstname: 1, lastname: 1, picture: 1, facebook:1 }).exec(function(err, users){
      //console.log(users.length); // 1000 only
      if (err) {
      }
      pageData.users = users;
      res.render('home', pageData);
    });
  }
}

function showHome(req, res) {
  goToHome(req, res);
}

function showApiHome(req, res){
  var data = {message:'welcome to the best api on earth'};
  res.status(200).json(data);
}

function showContacts(req, res) {
  var pageData = {};
  res.render('dashboard', pageData);
}

function showDashboard(req, res) {
  var pageData = {};
  res.render('dashboard', pageData);
}
function showContactEdit(req, res) {
  var pageData = {};
  res.render('contacts/edit', pageData);
}
function showContactCreate(req, res) {
  var pageData = {};
  res.render('contacts/create', pageData);
  //res.sendFile(path.join(__dirname, '../../contact.html'));
}
