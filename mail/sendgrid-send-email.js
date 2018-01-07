// const sgMail = require('@sendgrid/mail');
// sgMail.setApiKey('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');
// const msg = {
//   to: 'apmeena786@gmail.com',
//   from: 'apnodedev@gmail.com',
//   subject: 'Sending with SendGrid is Fun',
//   text: 'and easy to do anywhere, even with Node.js',
//   html: '<strong>and easy to do anywhere, even with Node.js</strong>',
// };

// module.exports = () => {
//     sgMail.send(msg).then((res) => {
//         console.log('the res from sendgrid is :', res);
//     });
// }
const SENDGRID_API_KEY = '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';
const MY_TEMPLATE_ID = 'dd70b806-8ed7-4581-a5e5-66c25a7121c3';

// var sendgrid = require('sendgrid')(process.env.SENDGRID_API_KEY);

// Note the html parameter - you must have this set or you'll get an error about having no
// body set

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(SENDGRID_API_KEY);
sgMail.setSubstitutionWrappers('{{', '}}'); // Configure the substitution tag wrappers globally

var email = {
    from: 'apnodedev@gmail.com',
    to: 'apmeena786@gmail.com',
    subject: 'Welcome to connect',
    templateId: MY_TEMPLATE_ID,
    substitutions: {
        user_first_name: 'John Doe'
    }
  };

// const host = 'https://mydomain.com';
// const resetToken = 'sdfdsf-wer234w-csdfrfq3r-sdcs';

// email.addSubstitution('%user_first_name%', 'John');
// email.addSubstitution('%reset_url%', `${host}/reset_password?token=${resetToken}`);

// email.addFilter('templates', 'enable', 1);
// email.addFilter('templates', 'template_id', MY_TEMPLATE_ID);



module.exports = () => {
    sgMail.send(email, (err, response) => {
        if (err) {
          console.log(err)
        } else {
          console.log('Yay! Our templated email has been sent')
        }
      });
};