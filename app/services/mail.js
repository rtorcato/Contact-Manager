var mailgun = require('mailgun-js')({
    apiKey: process.env.MAILGUN_KEY,
    domain: process.env.MAILGUN_DOMAIN
});
var nunjucks = require('nunjucks');
var emailPath = process.cwd() + '/views/emails/';
var emailTemplatePath = process.cwd() + '/views/layouts/emails/';
var viewLayout = emailTemplatePath + 'email.html';


function setCommonViewVars(data){
  data.vars.viewLayout = viewLayout;
  data.vars.baseUrl = process.env.BASE_URL;
  data.vars.appName = process.env.APP_NAME;
  data.vars.assetPath = process.env.ASSET_PATH;
  data.vars.year = new Date().getFullYear();
  return data;
}

module.exports.mailgun = {
    sendMail: function(emailFile, data) {
        data = setCommonViewVars(data);
        data.html = nunjucks.render(emailPath + emailFile + '.html', data.vars);
        mailgun.messages().send(data, function(error, body) {
          if (error){
            console.log('Oh no: ' + error);
          }else{
            console.log('mail is sent');
          }
        });
        console.log('mail sending');
    }
};

/*
var data = {
  to: {}}, array or string
  from: 'admin@approckets.com',
  subject: 'Hello there!',
  body: 'Test Email!!!',
  options: {'X-Campaign-Id': 'something'},
  data: {appTitle:'Test App Title'}
  emailFile: 'views/emails/emailTest.html';
};
*/
/*
var data = {
from: 'Excited User <me@samples.mailgun.org>',
to: 'serobnic@mail.ru',
subject: 'Hello',
text: 'Testing some Mailgun awesomness!',
vars: {},
//attachment: filepath
};*/
/*
mg.sendText(  mailObj.from, mailObj.to,
  mailObj.subject, emailMessage ,mailObj.options,
  function(err) {
      if (err){
        console.log('Oh noes: ' + err);
      } else {
        console.log('Success');
      }
  });
}
*/



/*
module.exports.services = {
   mailgun: {
     key: 'key-9ec377520959644a33a57da255b4ddbc',
     domain: 'sandbox82633ae20d4440d7ac18cfe367a76eb3.mailgun.org',
     secret: 'key-9ec377520959644a33a57da255b4ddbc',
   },
};
*/
