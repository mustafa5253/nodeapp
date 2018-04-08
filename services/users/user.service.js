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

				if(data.user_type === 'employee' || data.user_type == 'customer'){
					console.log('req.user is --- :', req.user);
					if(req.user && req.user.company_id){
						data.company_id = req.user.company_id;
						dcl.create(data, 'User', cb);
					} else {
						res.send({ status: 'error', data: 'You do not have any company.'});
					}
				} else {
					dcl.create(data, 'User', cb);					
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

        var cb = (response) => {
			if(response.status === 'success'){
				// do something with data
				res.send(response);
			} else {
				// do something with error
				res.send(response);
			}
		}
       
        dcl.delete(id, 'User', cb);
    }
};