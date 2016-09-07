var   chalk = require('chalk');

module.exports.init = function(app, HTTP, HTTPS) {
/*
HTTP.listen(3000, function(){
  console.log('listening on *:3000');
});*/

/*
var httpsOptions = {
   key: fs.readFileSync("path/to/private/key.pem"),
   cert: fs.readFileSync("path/to/certificate.pem")
};
HTTPS.createServer(httpsOptions, app).listen(443);
*/
var port = app.get('port');

server = HTTP.listen(port, function(err, res){
  if (err){
    console.log('server error');
    debug('server error');
    debug(err);
  }else{
    var host = server.address().address;
    var port = server.address().port;
    console.log('App started - press Ctrl-C to terminate');
  //  console.log('Express started on http://%s:%s' + ' press Ctrl-C to terminate', host, port);
    //console.log('Port: ' + port);
    console.log(chalk.bold.green('Host:') + '\t\t\t' + host);
    console.log(chalk.bold.green('Port:') + '\t\t\t' + port);
    console.log('Debugging: ' + chalk.bold.green(process.env.APP_DEBUG));
    console.log('App Status: ' + chalk.bold.green(process.env.APP_STATUS));
    console.log(chalk.bold.gray('Note: Launch app in debuging mode: DEBUG=APP node app'));
    // The path can be either a local path or an url
/*imageToAscii("https://octodex.github.com/images/octofez.png", {colored: false, height:'100',width:'100'},(err, converted) => {
    console.log(err || converted);
});*/
  }
});
// =======================
//notes ======
// =======================
///use nodemon or node app to start server
};
