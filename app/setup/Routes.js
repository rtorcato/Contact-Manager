const fs = require("fs");

module.exports.init = function(app) {
  // =======================
  // all route middleware
  // =======================
  const routeAllMiddleware = require('./../middleware/routeAll').middleware(app);
  //var mainController = require('./app/controllers/main');
  //APP.get('/test2', mainController.main);
  //const guestController = require('./app/controllers/guestController');
  //const userController = require('./controllers/user');
  //const apiController = require('./controllers/api');
  //const contactController = require('./controllers/contact');

  //var controllers_path = __dirname + '/controllers'; //__dirname + '/app/controllers';
  //var controllers_path = __dirname + './controllers/';
  // =======================
  // ComingSoonHits Tracking
  // =======================
  // Example retrieve IP from request
  /*
  app.use(function (req, res, next) {
    var ip = req.header('x-forwarded-for') || req.connection.remoteAddress;
    console.log('ip:' + ip);
    next();
  });
  */
  if (process.env.APP_STATUS == 'SOON'){

    var ComingSoonHits = require("./../models/ComingSoonHits");
    app.use(function (req, res, next) {
    //console.log(remoteAddress);
    var ip = req.headers["X-Real-IP"] || req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.ip;
    /*
    var ipAddresses = {
      "1" : req.headers["X-Real-IP"] || '',
      "2": req.headers['x-forwarded-for'] || '' ,
      "4": req.connection.remoteAddress || '',
    //  "5": req.socket.remoteAddress || '',
    //  "6": req.connection.socket.remoteAddress || '',
      "7": req.ip || ''
    };
    //console.log(req.headers);
    //console.log(ipAddresses);
    */
    //  var ip = req.header('x-forwarded-for') || req.connection.remoteAddress;
    //  var maxmind = require('maxmind');
    //  var cityLookup = maxmind.open('./public/data/GeoLite2-City.mmdb');
    //  var city = cityLookup.get(ip);
    //  console.log(city);
      //req.get('http://ipinfo.io/'+ ip, {json: true});
      // create a todo, information comes from AJAX request from Angular
      ComingSoonHits.create({name : ip, ipaddress : ip, sitename: process.env.APP_NAME}, function(err, result) {
        if (err){}
      });
      next();
    });


    var ComingSoonMapHits = require("./../models/ComingSoonMapHits");
    app.get('/map/location/save', function(req, res){
      var ip = req.headers["X-Real-IP"] || req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.ip;
      var ipAddresses = {
        "1" : req.headers["X-Real-IP"] || '',
        "2": req.headers['x-forwarded-for'] || '' ,
        "4": req.connection.remoteAddress || '',
      //  "5": req.socket.remoteAddress || '',
      //  "6": req.connection.socket.remoteAddress || '',
        "7": req.ip || ''
      };
      //console.log('Latitude:' + req.query.lat + ' ' + 'Longtitude:' + req.query.long);
      ComingSoonMapHits.create({name : req.headers['x-forwarded-for'], ipaddress : ip, sitename: process.env.APP_NAME, latitude: req.query.lat, longtitude: req.query.long}, function(err, result) {
        if (err){}
      });
      res.json({hello:"there"});
    });
    app.get('/', function(req, res){res.render('comingsoon');});
  }else{
    ///we are not in coming soon mode
    fs.readdirSync('./app/controllers').forEach(function (controller) {
      var route = require( '../controllers/' + controller);
      route.controller(app);
      //var route = require('./app/controllers/' + controller);
      //route.controller(APP);
      //if(controller.substr(-3) == '.js') {
      //  var route = require('./app/controllers/' + controller);
        //route.controller(APP);
      //}
    });
    // =======================
    // error route middleware
    // =======================
    const routeErrorMiddleware = require('./../middleware/routeErrors').middleware(app);
  }
  /*

  var router = express.Router(); // get an instance of router
  fs.readdirSync('./app/controllers').forEach(function (file) {
    if(file.substr(-3) == '.js') {
        route = require('./app/controllers/' + file);
        route.controller(app);
    }
  });
  */

};
