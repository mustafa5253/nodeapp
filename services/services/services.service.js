/**
 * servics.js
 *
 * @description :: Server-side logic for managing services.
 */

var dcl = require('../../dcl');
var validationEngine = require('../../validation-engine');


module.exports = {

    /**
     * list
     */
	list: (req, res) => {

		var cb = (response) => {
			if (response.status === 'success') {
				// do something with data
				res.send(response);
			} else {
				// do something with error
				res.send(response);
			}
		}

		dcl.getAll('Service', cb);
	},

    /**
     * show
     */
	show: (req, res) => {

		var id = req.params.id;

		var cb = (response) => {
			if (response.status === 'success') {
				// do something with data
				res.send(response);
			} else {
				// do something with error
				res.send(response);
			}
		}

		dcl.getById(id, 'Service', cb);
	},

    /**
     * create
     */
	create: (req, res) => {

		let response = {};
		let data = req.body;

		if (req.user && req.user.company_id) {
			data.company_id = req.user.company_id;
		} else {
			res.send({ status: 'error', data: 'You do not have any company.' });
		}

		validationEngine(data, 'services', 'create', (isPassed, validationResult) => {
			if (isPassed) {
				let cb = (output) => {
					if (output.status === 'success') {
						// do something with data
						res.send(output);
					} else {
						// do something with error
						res.send(output);
					}
				}
				dcl.create(data, 'Service', cb);

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

		validationEngine(data, 'services', 'update', (isPassed, validationResult) => {
			if (isPassed) {
				let cb = (output) => {
					if (output.status === 'success') {
						// do something with data
						res.send(output);
					} else {
						// do something with error
						res.send(output);
					}
				}

				dcl.update(id, data, 'Service', cb);

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
			if (response.status === 'success') {
				// do something with data
				res.send(response);
			} else {
				// do something with error
				res.send(response);
			}
		}

		dcl.delete(id, 'Service', cb);
	}
};