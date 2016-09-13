module.exports = function(req, res, next) {
  // if user is authenticated in the session, carry on
  if (req.isAuthenticated()){
    return next();
  }
  // if they aren't redirect them to the home page
  req.flash("messageLevel", "danger");
  req.flash("message", "You are not authorized to view that page");
  res.redirect('/home?error=unauthorized');
}
