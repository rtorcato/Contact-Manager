
module.exports.middleware = function(app) {
//  var pageData = app.get('pageData');
    // route errors =========================================================
    /*
  app.use(function(req, res) {
    pageData.layout = 'error';
    pageData.urlAttempted = req.url;
    res.status(404).render("errors/404", pageData);
    //response.statusCode = 404;
    //response.end("404!");
  });
  */

  // catch 404 and forward to error handler
  app.use(function(req, res, next) {
    var err = new Error('Not Found');
    //console.log(req.url);
    err.status = 404;
    next(err);
  });



  // error
  app.use(function(err, req, res, next) {
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
  });

};
