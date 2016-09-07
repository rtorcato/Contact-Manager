//const fs = require("fs");
//var debug = require('debug')('app');///DEBUG=APP node app
const morgan = require('morgan');
//winston.level = process.env.LOG_LEVEL ;
//const winston = require('winston');
module.exports.init = function(app) {
  if (process.env.APP_LOGGING == 'true') {
    app.use(morgan('dev'));
  }
  /*if (NODE_ENV === "development") {
    app.use(logger('dev'));// log every request to the console //("short")
      winston.log('info', 'Hello log files!', {
        someKey: 'some-value'
      });
  }
  */
};
