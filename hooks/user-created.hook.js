// After successfull task creation
// Whatever we need to do we will do here

const MSG91_AUTHKEY = '223100AZ7W1aF9S9J5b3512bf';
const MSG91_SENDERID = 'MIRROR';
const MSG91_ROUTE = '4'

const msg91 = require("msg91")(MSG91_AUTHKEY, MSG91_SENDERID, MSG91_ROUTE);
const SENDGRID_API_KEY = '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';
const MY_TEMPLATE_ID = 'dd70b806-8ed7-4581-a5e5-66c25a7121c3';
const sgMail = require('@sendgrid/mail');

module.exports = {

    send3WayAlert: (req, user) => {

        var services = require('../services');

            if (process.env.ENVIRONMENT === 'production') {

                try {
                    // Send SMS using MSG91
                    if (user.mobile && user.first_name && user.password) {
                        msg91.send(user.mobile, 'Hello '+ user.first_name +', welcome to Office Mirror. Your password is :'+ user.password, (err, response) => {
                            console.log('msg91 error is :', err);
                            console.log('msg91 response is :', response);
                        });
                    }
                    
                } catch(e) {

                }
                
                
                // Send Email using sendgrid
                sgMail.setApiKey(SENDGRID_API_KEY);

                sgMail.setSubstitutionWrappers('{{', '}}'); // Configure the substitution tag wrappers globally

                var email = {
                    from: 'apnodedev@gmail.com',
                    to: user.email,
                    subject: 'Welcome to Office Mirror',
                    templateId: MY_TEMPLATE_ID,
                    substitutions: {
                        user_first_name: user.first_name + ' ' + user.last_name,
                        pwd: user.password
                    }
                };

                try {

                    if (email && email.from && email.to) {
                        sgMail.send(email, (err, response) => {
                            if (err) {
                                console.log('sendgrid err is :', err);
                            } else {
                                console.log('Yay! Our templated email has been sent :');
                            }
                        });
                    }
                    
                } catch(e) {

                }
                
        }
    }
}
