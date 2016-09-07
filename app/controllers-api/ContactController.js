var mailService = require('./../services/mail');
var maxMessages = 10;

module.exports.controller = function(router) {
    router.get('/contact', function(req, res) {
      res.json({message:"this is contact api"});
    }),
    router.post('/contact', function(req, res) {
      req.checkBody('name', 'Name is required').notEmpty();
      req.checkBody('email', 'Email is required').notEmpty();
      req.checkBody('email', 'Email is not valid').isEmail();
      req.checkBody('message', 'Message is required').notEmpty();
      var errors = req.validationErrors();
      if (errors) {
          return res.json({message: 'Validation errors',  type:'error', validationErrors: errors});
      }
      var messagesSent = req.session.messagesContactUsSent;
      if (messagesSent >= maxMessages){
        //if we are above max don't send
        return res.json({message: 'Sorry, you have already sent the maximum amount of messages sent for this session.',  type:'error-maxmessages'});
      }
      var mailObj = {
          to: process.env.APP_MAIL_CONTACT,
          from: req.body.email,
          subject: 'Contact Message from ' + process.env.APP_NAME,
          vars: {
              userEmail: req.body.email,
              //phone: req.body.phone,
              name: req.body.name,
              message: req.body.message,
          }
      };
      mailService.mailgun.sendMail('email-contact', mailObj);
      //set message sent variable
      if (!messagesSent) {
          req.session.messagesContactUsSent = 1;
      } else {
          req.session.messagesContactUsSent += 1;
      }
      res.json({message: 'Message sent!',  type:'success'});
    })
}
