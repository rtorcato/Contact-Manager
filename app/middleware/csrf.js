var csrf = require('csurf');

module.exports.csrfProtection = function() {
  return csrf({ cookie: false });
}
