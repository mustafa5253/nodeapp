/**
 * users.js
 *
 * @description :: Server-side logic for managing users.
 */

var dcl = require('../../dcl');
var validationEngine = require('../../validation-engine');

module.exports = {

    /**
     * list
     */
    list: (req, res) => {

    	var cb = (response) => {
			if(response.status === 'success'){
				// do something with data
				res.send(response);
			} else {
				// do something with error
				res.send(response);
			}
		}

		if(req.user_type){
			const condition = { 'user_type': req.user_type };
			dcl.getPaginatedList('User', condition, req.page, req.count, cb);			
		} else {
			res.send({
				status: 'error',
				data: 'User type not found in request.'
			});
		}
       
    },

    /**
     * show
     */
    show: (req, res) => {

        var id = req.params.id;

        var cb = (response) => {
			if(response.status === 'success'){
				// do something with data
				res.send(response);
			} else {
				// do something with error
				res.send(response);
			}
		}
       
        dcl.getById(id, 'User', cb);
    },

    /**
     * create
     */
    create: (req, res) => {

        let response = {};
        let data = req.body;

        validationEngine(data, 'user', 'create', (isPassed, validationResult) => {
        	if (isPassed) {
        		let cb = (output) => {
					if(output.status === 'success'){
						// do something with data
						res.send(output);
					} else {
						// do something with error
						res.send(output);
					}
				}

				data.password = '12345';

				if((req.user.user_type === 'admin' || req.user.user_type === 'employee') && (data.user_type === 'employee' || data.user_type == 'customer')) {
					// Either Admin creating Staff employee and customers or
					// Employee creating customers
					if(req.user && req.user.company_id) {
						data.company_id = req.user.company_id;
						dcl.create(data, 'User', cb);
					} else {
						res.send({ status: 'error', data: 'You do not have any company.'});
					}
				} else if(req.user.user_type === 'super_admin' && data.user_type === 'admin') {
					// Super admin creating admin
					// here first we need to create admin's company
					dcl.create({ name: data.company_name, created_by: req.user._id }, 'Company', function(response) {
						if(response.status === 'success') {
							data.company_id = response.data._id;
							dcl.create(data, 'User', cb);
						} else {
							res.send(response);
						}
					});

				} else {
					response.status = 'Unauthorize';
					response.errors = 'You are not allowed to create this user.';
					res.status(401).json(response);
				}
				
        	} else {
        		response.status = 'validationFailed';
        		response.errors = validationResult.errors;
		   		res.status(400).json(response);
        	}
        });
    },

    /**
     * update
     */
    update: (req, res) => {

    	let response = {};

    	let id = req.params.id;
        let data = req.body;

        validationEngine(data, 'user', 'update', (isPassed, validationResult) => {
        	if (isPassed) {
        		let cb = (output) => {
					if(output.status === 'success'){
						// do something with data
						res.send(output);
					} else {
						// do something with error
						res.send(output);
					}
				}

				if(data.new_password) {
					if(data.password === req.user.password) {
						data.password = data.new_password;
						dcl.update(id, data, 'User', cb);
					} else {
						response.status = 'validationFailed';
						response.errors = 'Current password not matched.';
						res.status(400).json(response);
					}
				} else {
					if(!data.password){
						data.password = req.user.password;
					}
					dcl.update(id, data, 'User', cb);					
				}

        	} else {
        		response.status = 'validationFailed';
				response.errors = validationResult.errors;
		   		res.status(400).json(response);
        	}
        });
    },

    /**
     * remove
     */
    remove: (req, res) => {
        let id = req.params.id;
		
		deleteUser(id).then((response) => {
			res.send(response);
		}).catch((err) => {
			res.send(err);			
		});

        // var cb = (response) => {
		// 	if(response.status === 'success'){
		// 		// do something with data
		// 		res.send(response);
		// 	} else {
		// 		// do something with error
		// 		res.send(response);
		// 	}
		// }
       
        // dcl.delete(id, 'User', cb);
    }
};

function deleteUser(user_id) {
	return new Promise((resolve, reject) => {
		dcl.delete(user_id, 'User', ((response) => {
			if(response.status === 'success') {
				resolve(response);
			} else {
				reject(response);
			}
		}));
	});
}