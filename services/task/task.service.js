/**
 * servics.js
 *
 * @description :: Server-side logic for managing services.
 */

var dcl = require('../../dcl');
var validationEngine = require('../../validation-engine');
var afterCreateTaskHook = require('../../hooks/task-created.hook');

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

		var conditions = {};

		if (req.user.user_type === 'customer') {
			conditions = { company_id: req.user.company_id, created_by: req.user._id };
		} else if(req.user.user_type === 'employee') {
			conditions = { company_id: req.user.company_id };
		} else {
			conditions = { company_id: req.user.company_id };
		}

		dcl.getPaginatedList('Task', conditions, req.page, req.count, cb);
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

		// dcl.getById(id, 'Task', cb);
		dcl.getByIdAndPopulate(id, 'attachments services comments.user', 'Task', cb);
	},

    /**
     * create
     */
	create: (req, res) => {

		// req.app.io.emit('tasksListRequested', { key:"value" });

		
		let response = {};
		let data = req.body;

		if (req.user && req.user.company_id) {
			data.company_id = req.user.company_id;
		} else {
			res.send({ status: 'error', data: 'You do not have any company.' });
		}

		validationEngine(data, 'task', 'create', (isPassed, validationResult) => {
			if (isPassed) {
				let cb = (output) => {
					if (output.status === 'success') {
						// do something with data
						// Send 3 way notifications
						afterCreateTaskHook.send3WayAlert(req, output.data);
						res.send(output);
					} else {
						// do something with error
						res.send(output);
					}
				}
				
				data.created_at = Date.now();
				data.updated_at = Date.now();
				dcl.create(data, 'Task', cb);

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

		if (req.user && req.user.company_id) {
			data.company_id = req.user.company_id;
		} else {
			res.send({ status: 'error', data: 'You do not have any company.' });
		}

		validationEngine(data, 'task', 'update', (isPassed, validationResult) => {
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

				dcl.update(id, data, 'Task', cb);

			} else {
				response.status = 'validationFailed';
				response.errors = validationResult.errors;
				res.status(400).json(response);
			}
		});
	},

	/**
     * update status of the task
     */
	updateStatus: (req, res) => {

		let response = {};

		let id = req.params.id;
		let data = req.body;

		if (req.user && req.user.company_id) {
			// data.company_id = req.user.company_id;
		} else {
			return res.send({ status: 'error', data: 'You do not have any company.' });
		}

		let cb = (output) => {
			if (output.status === 'success') {
				// do something with data
				res.send(output);
			} else {
				// do something with error
				res.send(output);
			}
		}

		data.updated_at = Date.now();
		data.updated_by = req.user._id;
		
		dcl.update(id, data, 'Task', cb);
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

		dcl.delete(id, 'Task', cb);
	}
};