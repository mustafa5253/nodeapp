const SENDGRID_API_KEY = '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';
const MY_TEMPLATE_ID = 'be92559d-6d0b-4bf2-b0ef-c558f2629dfa';
const sgMail = require('@sendgrid/mail');

module.exports = {

    sendEmail: (req, email) => {

        const toMailList = [];
        const attachmentList = [];

        email.to.forEach((toMail) => {
            toMailList.push(toMail.email);
        });

        email.attachments.forEach((attachment) => {
            attachmentList.push({
                name: attachment.fileName,
                content: attachment.preview
            });
        });

        var services = require('../services');

        // Send Email using sendgrid
        sgMail.setApiKey(SENDGRID_API_KEY);

        sgMail.setSubstitutionWrappers('{{', '}}'); // Configure the substitution tag wrappers globally

        var email = {
            from: email.from.email,
            to: toMailList,
            subject: email.subject,
            templateId: MY_TEMPLATE_ID,
            substitutions: {
                body: email.message
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
