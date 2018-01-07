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
       
        dcl.getAll('User', cb);
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
     * carController.update()
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

				if(!data.password){
					data.password = '12345';
				}
       
        		dcl.update(id, data, 'User', cb);
        		
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