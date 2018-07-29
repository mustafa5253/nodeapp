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

    send3WayAlert: (req, data) => {

        var services = require('../services');

        // First of all notifiy use on socket
        req.app.io.sockets.in(req.user.company_id).emit('newNotification', { data: data });

        // Send SMS using MSG91
        // msg91.send('8962336708', 'Hello demo message', (err, response) => {
        //     console.log('msg91 error is :', err);
        //     console.log('msg91 response is :', response);
        // });

        // Send Email using Send grid
        // services.util.getAdminByCompanyId(req.user.company_id, (admin) => {
        //     admin = (admin && admin.length && admin.length === 1) ? admin[0] : null;
            
        //     if (admin) {
        //         sgMail.setApiKey(SENDGRID_API_KEY);
        //         sgMail.setSubstitutionWrappers('{{', '}}'); // Configure the substitution tag wrappers globally

        //         var email = {
        //             from: 'apnodedev@gmail.com',
        //             to: 'apmeena786@gmail.com',
        //             subject: 'Welcome to connect',
        //             templateId: MY_TEMPLATE_ID,
        //             substitutions: {
        //                 user_first_name: admin.first_name + ' ' + admin.last_name
        //             }
        //         };

        //         sgMail.send(email, (err, response) => {
        //             if (err) {
        //                 console.log('sendgrid err is :', err);
        //             } else {
        //                 console.log('Yay! Our templated email has been sent :');
        //             }
        //         });
        //     }
        // });
    }
}
