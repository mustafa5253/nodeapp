/**
 * users.js
 *
 * @description :: Server-side logic for managing users.
 */

var dcl = require('../../dcl');
var validationEngine = require('../../validation-engine');
var afterCreateUserHook = require('../../hooks/user-created.hook');

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
 			
 			var condition = {};

 			if (req.user.user_type === 'super_admin') {
 				condition = { 'user_type': req.user_type };
 			} else {
 				condition = { 'user_type': req.user_type, company_id: req.user.company_id };
 			}

			dcl.getPaginatedList('User', condition, req.page, req.count, cb);
					
		} else {
			res.send({
				status: 'error',
				data: [],
				message: 'User type not found in request.'
			});
		}
       
    },

    /**
     * list of all employee
     */
    getAllEmployees: (req, res) => {

    	var cb = (response) => {
			if(response.status === 'success'){
				// do something with data
				res.send(response);
			} else {
				// do something with error
				res.send(response);
			}
		}

		const condition = { 'user_type': 'employee', company_id: req.user.company_id };
		const fields = '_id first_name last_name email';

		dcl.getAllWhere('User', condition, fields, cb);
       
    }, 

    /**
     * list of all admins
     */
    getAllAdmins: (req, res) => {

    	var cb = (response) => {
			if(response.status === 'success'){
				// do something with data
				res.send(response);
			} else {
				// do something with error
				res.send(response);
			}
		}

		const condition = { 'user_type': 'admin' };
		const fields = '_id first_name last_name email';

		dcl.getAllWhere('User', condition, fields, cb);
       
    },

    getContactListForChat: (req, res) => {

    	var cb = (response) => {
			if(response.status === 'success') {
				// do something with data
				response.data = formatContactsForChat(response.data);
				res.send(response);
			} else {
				// do something with error
				res.send(response);
			}
		}

		const condition = { 'user_type': 'admin' };
		const fields = '_id first_name last_name email';

		dcl.getAllWhere('User', condition, fields, cb);
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

  		// var socketio = req.app.get('socketio');
		// socketio.emit('newNotification', { message: 'A new user is created.' });

        validationEngine(data, 'user', 'create', (isPassed, validationResult) => {
        	if (isPassed) {
        		let cb = (output) => {
					if(output.status === 'success'){
						// do something with data
						afterCreateUserHook.send3WayAlert(req, output.data);
						res.send(output);
					} else {
						// do something with error
						res.send(output);
					}
				}

				// data.password = '12345';
				data.password = generateRandomPassword();

				if (process.env.ENVIRONMENT === 'development') {
					console.log('Generated password is :', data.password);
				}

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

    changePassword: (req, res) => {

    	let response = {};

    	let id = req.user._id;
        let data = req.body;

        if (data.current_password && data.new_password && data.new_password === data.confirm_password) {

        	dcl.getById(id, 'User', (userInfo) => {
        		if (userInfo.status === 'success') {
        			if (userInfo.data.password === data.current_password) {

						dcl.update(id, { password: data.new_password }, 'User', (updatePasswordResponse) => {
							if(updatePasswordResponse.status === 'success'){
								// do something with data
								res.send(updatePasswordResponse);
							} else {
								// do something with error
								res.send(updatePasswordResponse);
							}
						});					

        			} else {
			        	response.status = 'validationFailed';
						response.errors = 'Current password does\'t match.';
				   		res.status(200).json(response);
			        }
        		}
        	});


        } else {
        	response.status = 'validationFailed';
			response.errors = 'New password and Confirm password should be same.';
	   		res.status(200).json(response);
        }


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

function formatContactsForChat(users) {

	const newUserList = [];

	users.forEach((user) => {

		newUserList.push({
			id: user._id,
			name: user.first_name + ' ' + user.last_name,
			avatar: 'assets/images/avatars/alice.jpg',
	        status: 'online',
	        mood: 'I never sign anything until I pretend to read it first..'
		});
	});

	return newUserList;
}

function generateRandomPassword() {

	// 6 digit random number
	return Math.floor(100000 + Math.random() * 900000);
}