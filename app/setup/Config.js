const dotenv = require('dotenv');
//const NODE_ENV = require("node-env");
const path = require("path");
const favicon = require('serve-favicon');
const events = require('events');
const moment = require("moment"); // http://momentjs.com/
const jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
//const imageToAscii = require("image-to-ascii");
//const environment = process.env.NODE_ENV;
//connect-assets
//const _ = require('lodash');
const bodyParser = require('body-parser'); // pull information from HTML POST (express4)
const expressValidator = require('express-validator');
//const useragent = require('useragent');
const faker = require('faker');
const flash = require('connect-flash');
const uuid = require('uuid');
const methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
const formidable = require('formidable'); // Formidable is required to accept file uploads
var config = require('./../../config/app'); // get our main app config file

require('datejs'); //https://www.npmjs.com/package/datejs


module.exports.init = function(app, express) {
    //app.use(csurf);
    dotenv.load({ path: '.env' }); //Load environment variables from .env file, where API keys and passwords are configured.
    const port = process.env.PORT || 8081; // set our port
    app.set('port', port);
    app.set('port-socketio', 8181);
    app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT


    var compression = require('compression');
    // Add content compression middleware
    app.use(compression());
    /*
        if ('development' == app.get('env')) {
            //  APP.use(express.errorHandler());// development only
        }
        */
    //
    var publicPath = './public'; //path.resolve(__dirname, "public");
    var oneDay = 86400000;

    //app.use(express.compress());

    app.use(express.static(publicPath, { maxAge: oneDay })); // set the static files location /public/img will be /img for users
    // get all data/stuff of the body (POST) parameters
    //app.use(express.bodyParser());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
    // In this example, the formParam value is going to get morphed into form body format useful for printing.
    app.use(expressValidator({
        errorFormatter: function(param, msg, value) {
            var namespace = param.split('.'),
                root = namespace.shift(),
                formParam = root;

            while (namespace.length) {
                formParam += '[' + namespace.shift() + ']';
            }
            return {
                param: formParam,
                msg: msg,
                value: value
            };
        }
    }));
    //app.use(bodyParser.urlencoded({ extended: devMode })); // parse application/x-www-form-urlencoded
    app.use(favicon(publicPath + '/ico/favicon.ico'));
    // Import credentials which are used for secure cookies
    // Install the cookie middleware
    const config = require('./../../config/app');
    app.set('superSecret', config.secret); // secret variable
    //app.use(require('cookie-parser')(config.cookieSecret));
    var cookieParser = require('cookie-parser');
    app.use(cookieParser(config.cookieSecret));

    // Disable etag headers on responses
    //app.disable('etag');

    //app.use(csrf({ cookie: true }));
    ///pass local data to views
    /*var pageData = {
      appName: 'AppRockets',
      csrf: 'CSRF token here',
      csrf_token: '',
    };*/
    //APP.set('pageData', pageData);
    app.locals.APP_STATUS = process.env.APP_STATUS;
    if (process.env.APP_STATUS == 'DEV'){
      app.locals.devMode = true;
    }else{
      app.locals.devMode = false;
    }

    app.locals.foo = "bar";
    app.locals.appName = process.env.APP_NAME; //process.env.APP_NAME
    app.locals.baseURL = process.env.BASE_URL;
    app.locals.fbAppID = process.env.FACEBOOK_APP_ID;
    app.locals.assetURL = process.env.ASSET_PATH;
    app.locals.cssVersion = process.env.CSS_VERSION;
    app.locals.jsVersion = process.env.JS_VERSION;
    app.locals.pageSummaryImage = app.locals.assetURL + 'ico/site_thumbnail.jpg';
    app.locals.thisPageURL = app.locals.baseURL + '';
    var date = new Date();
    app.locals.date = {year:date.getFullYear(), month: date.getMonth()+1, day: date.getDate()};
    //app.use(express.favicon());
};
