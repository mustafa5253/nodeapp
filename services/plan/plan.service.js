/**
 * plans.js
 *
 * @description :: Server-side logic for managing plans.
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

        var conditions =  {};

        if (req.user.user_type === 'super_admin') {
            conditions = { created_by: req.user._id };
        }

        if (req.user.user_type === 'admin') {
            if (req.count > 25) {
                conditions = { company_id: 'super_admin_company', created_for: 'admin' };
            } else {
                conditions = { created_by: req.user._id };
            }
        }

        if (req.user.user_type === 'customer') {
            conditions = { company_id: req.user.company_id };
        }
       
        dcl.getPaginatedList('Plan', conditions, req.page, req.count, cb); 
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
       
        dcl.getById(id, 'Plan', cb);
    },

    /**
     * create
     */
    create: (req, res) => {

        let response = {};
        let data = req.body;

        validationEngine(data, 'plan', 'create', (isPassed, validationResult) => {
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
                    

                if (req.user.user_type === 'super_admin') {
                    data.created_for = 'admin';
                    data.company_id = 'super_admin_company';
                }

                if (req.user.user_type === 'admin') {
                    data.company_id = req.user.company_id;
                    data.created_for = 'customer';
                }

        		dcl.create(data, 'Plan', cb);

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

        validationEngine(data, 'plan', 'update', (isPassed, validationResult) => {
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
       
        		dcl.update(id, data, 'Plan', cb);
        		
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
       
        dcl.delete(id, 'Plan', cb);
    }
};