const mysql     =    require('mysql');
const mongoose  = require('mongoose');// mongoose for mongodb
const dbDebug   = false;
var   chalk = require('chalk');
//var Sequelize = require('sequelize');
//const mongodb        = require('mongodb');
const pool      =    mysql.createPool({
    connectionLimit : 100, //important
    host     : 'localhost',
    port     :     33060,
    user     : 'homestead',
    password : 'secret',
    database : 'homestead',
    debug    :  true
});
/*
var Sequelize = require('sequelize');
var sequelize = new Sequelize('database', 'username', 'password');

var User = sequelize.define('user', {
  username: Sequelize.STRING,
  birthday: Sequelize.DATE
});

sequelize.sync().then(function() {
  return User.create({
    username: 'janedoe',
    birthday: new Date(1980, 6, 20)
  });
}).then(function(jane) {
  console.log(jane.get({
    plain: true
  }));
});
*/

module.exports.init = function(app) {
  //const dbServers = require('./../../config/db');
  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function() {!
    console.log('Database: ' + chalk.bold.green('mongodb connected'));
  });
  mongoose.connect(process.env.MONGO_DB);
  mongoose.connection.on('error', () => {
    console.log(chalk.bold.red('Database: ' + 'MongoDB Connection Error. Please make sure that MongoDB is running.'));
    process.exit(1);
  });
  app.set('mongoose', mongoose);
};
