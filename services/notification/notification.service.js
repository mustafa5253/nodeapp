/**
 * branch.js
 *
 * @description :: Server-side logic for managing notifications.
 */

var dcl = require('../../dcl');

var notifications = [
    {
        title: 'There are many variations of passages of Lorem Ipsum available',
        user_name: 'mustafa bagwala',
        email_id: 'abc@gmail.com',
        date_added: '07-01-18',
        task_id: '04'
    },
    {
        title: 'If you are going to use a passage of Lorem Ipsum.',
        user_name: 'arpit meena',
        email_id: 'xyzabc@gmail.com',
        date_added: '06-01-18',
        task_id: '03,'
    },
    {
        title: 'There are many variations of passages of Lorem Ipsum available.',
        user_name: 'John papa',
        email_id: 'abc@gmail.com',
        date_added: '05-01-18',
        task_id: '02'
    },
    {
        title: 'Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text.',
        user_name: 'jonahhattan andrew',
        email_id: 'abc@gmail.com',
        date_added: '05-01-18',
        task_id: '01'
    }
];

module.exports = {

    /**
     * list
     */
    list: (req, res) => {

        res.send({ status: 'status', data: notifications });

    },
    
    /**
     * update
     */
    update: (req, res) => {

    	let id = req.params.id;
    	let data = req.body;

        var cb = (response) => {
			if(response.status === 'success'){
				// do something with data
				res.send(response);
			} else {
				// do something with error
				res.send(response);
			}
		}
       
        dcl.update(id, data, 'Notification', cb);
    },

    /**
     * remove
     */
    remove: (req, res) => {
        let id = req.params.id;

        var cb = (response) => {
			if(response.status === 'success'){
				// do something with data
				res.send(response);
			} else {
				// do something with error
				res.send(response);
			}
		}
       
        dcl.delete(id, 'Notification', cb);
    }
};