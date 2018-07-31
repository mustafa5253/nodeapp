// After successfull task creation
// Whatever we need to do we will do here

const MSG91_AUTHKEY = '223100AZ7W1aF9S9J5b3512bf';
const MSG91_SENDERID = 'MIRROR';
const MSG91_ROUTE = '4'

const msg91 = require("msg91")(MSG91_AUTHKEY, MSG91_SENDERID, MSG91_ROUTE);
const SENDGRID_API_KEY = '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';
const MY_TEMPLATE_ID = '4ef9ce72-ca9c-4c28-a4fd-0e81a470cc1d';
const sgMail = require('@sendgrid/mail');

module.exports = {

    send3WayAlert: (req, payment) => {

        var services = require('../services');

        // if (user && user.user_type === 'admin') {

            if (process.env.ENVIRONMENT === 'production') {
                // Send SMS using MSG91

                const payment_amount = payment.amount / 100;

                const message = 'Thank you '+ req.user.first_name +', we have received your payment of INR: '+ payment_amount;

                
                try {

                    if (req.user && req.user.mobile && message) {

                        msg91.send(req.user.mobile, message, (err, response) => {
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
                    to: req.user.email,
                    subject: 'Office Mirror Payment',
                    templateId: MY_TEMPLATE_ID,
                    substitutions: {
                        user_first_name: req.user.first_name + ' ' + req.user.last_name,
                        amount: payment_amount
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
        // }
    }
}
