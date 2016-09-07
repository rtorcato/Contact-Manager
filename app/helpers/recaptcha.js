var Recaptcha = require('recaptcha').Recaptcha;
var RecaptchaPublicKey = process.env.RECAPTCHA_PUBLIC;
var RecaptchaPrivateKey = process.env.RECAPTCHA_PRIVATE;

module.exports = {

  getRecaptcha: function(){
    var recaptcha = new Recaptcha(RecaptchaPublicKey, RecaptchaPrivateKey);
    return recaptcha.toHTML();
  },

  runRecaptcha: function(req) {
    var recaptchaData = {
        remoteip: req.connection.remoteAddress,
        challenge: req.body.recaptcha_challenge_field,
        response: req.body.recaptcha_response_field
    };
      var promise = new Promise(function(resolve, reject) {
        var recaptcha = new Recaptcha(RecaptchaPublicKey, RecaptchaPrivateKey, recaptchaData);
          recaptcha.verify(function(success, error_code) {
              if (!success) {
                  var errors = [{param: 'recaptcha', msg: 'Verification Code Failed', value: error_code }];
                  reject(errors);
              } else {
                  resolve(success);
              }
          });
      });
      return promise;
  }
}
