const mongoose  = require('mongoose');// mongoose for mongodb
const dbDebug   = false;
var   chalk = require('chalk');
//const bluebird = require('bluebird');

module.exports.init = function(app) {
  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function() {!
    console.log('Database: ' + chalk.bold.green('mongodb connected'));
  });
  mongoose.Promise = require('bluebird');
  mongoose.connect(process.env.MONGO_DB);
  mongoose.connection.on('error', () => {
    console.log(chalk.bold.red('Database: ' + 'MongoDB Connection Error. Please make sure that MongoDB is running.'));
    process.exit(1);
  });
  app.set('mongoose', mongoose);
};
