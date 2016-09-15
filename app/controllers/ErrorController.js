var path = require('path');

module.exports = {
  show404: show404,
  showError: showError
};

function show404(req, res, next) {
  var data = {};
  data.urlAttempted = req.url;
  res.status(404).render("errors/404", data);
  //res.sendFile(path.join(__dirname, '../../404.html'));
}

// error
function showError(err, req, res, next) {
//  pageData.layout = 'error';
  if (app.get('env') === 'development') {
  //  console.error(err.stack);
  }
  res.status(err.status || 500);
  if (err.status == 404){
    // Define the content type
    //res.type('text/html');
    //  res.render('errors/404');
    var data = {};
    data.urlAttempted = req.url;
    res.status(404).render("errors/404", data);
  }else{
    //  pageData.devMode = true;
    var data = {};
     data.layout = 'error';
     data.errorMessage = err.message;
     data.error = err.stack;
    // Point at the 500.handlebars view
    res.render('errors/500',data);
  }
};
