
var helmet = require('helmet'); //https://www.npmjs.com/package/helmet
var cors = require('cors');
//const express_enforces_ssl = require('express-enforces-ssl'); //https://github.com/aredo/express-enforces-ssl
var lusca = require('lusca'); //https://www.npmjs.com/package/lusca
//const limiter = require('connect-ratelimit');//https://www.npmjs.com/package/connect-ratelimit

module.exports.init = function(app) {

    app.disable('x-powered-by'); // Block the header from containing information about the server
    // =======================
    // limiter
    // =======================
    /*
    var limiterOptions = {
        whitelist: ['127.0.0.1'],
        blacklist: ['localhost', 'example.com'],
        normal: { totalRequests: 0, every: 60 * 60 * 1000 }
    }
    app.use(limiter(limiterOptions));
    */
    //check for old packages in your console
    //npm outdated --depth 0
    app.enable('trust proxy');
    if (process.env.NODE_ENV === 'production') {
        //app.use(require('express-enforces-ssl')());
    }

    // =======================
    // Helmet
    // =======================
    var ms = require("ms");
    app.use(helmet());
    // Hide X-Powered-By
    app.use(helmet.hidePoweredBy());
    //app.use(helmet.hidePoweredBy({ setTo: 'all your base are belong to us' }));
    // Implement Strict-Transport-Security
    app.use(helmet.hsts({
          maxAge: ms("1 year"),
          includeSubdomains: true
    }));
    app.use(helmet.xssFilter());
    app.use(helmet.noCache())
    app.use(helmet.frameguard("deny"));
    app.use(helmet.noSniff());
    // Implement CSP with Helmet
    /*
    app.use(helmet.csp({
      defaultSrc: ["'self'"],
      scriptSrc: ['*.google-analytics.com'],
      styleSrc: ["'unsafe-inline'"],
      imgSrc: ['*.google-analytics.com'],
      connectSrc: ["'none'"],
      fontSrc: [],
      objectSrc: [],
      mediaSrc: [],
      frameSrc: []
    }));
    */

    // =======================
    // lusca
    // =======================
    //app.use(lusca.csrf());
    app.use(lusca.xframe('SAMEORIGIN'));
    //app.use(lusca.csp({ /* ... */}));
    //app.use(lusca.xssProtection(true));
    app.use(lusca.p3p('ABCDEF'));
    //app.use(lusca.hsts({ maxAge: 31536000 }));
    //app.use(lusca.nosniff());

    // =======================
    // Enforce SSL
    // =======================

    //app.use(express_enforces_ssl());



    // =======================
    // Cors
    // =======================

    var whitelist = ['http://example1.com', 'http://example2.com'];
    var corsOptions = {
        //origin: 'http://example.com',
        origin: function(origin, callback) {
            var originIsWhitelisted = whitelist.indexOf(origin) !== -1;
            callback(null, originIsWhitelisted);
        }
    };
    app.use(cors(corsOptions));

    // =======================
    // CSRF
    // =======================
    //var csrf = require('csurf');
    //app.use(csrf());
    /*
    var csrfProtection = require('csurf')({ cookie: false });
    app.use(csrfProtection);

    app.use(function(req, res, next) {
      res.locals.csrfToken = req.csrfToken();
      next();
    });
    */
};
