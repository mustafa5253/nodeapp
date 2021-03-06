/**
 * users.js
 *
 * @description :: Server-side logic for managing users.
 */

var dcl = require('../../dcl');
var validationEngine = require('../../validation-engine');
var fs = require('fs');

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

		// const condition = { created_by: req.user._id };
		const condition = { $or:[ {'created_by':req.user._id }, { 'created_for':req.user._id } ] };
		// dcl.getAll('Document', cb);
		dcl.getPaginatedList('Document', condition, req.page, req.count, cb);
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

		dcl.getById(id, 'Document', cb);
	},

	getUserDocs: (req, res) => {

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

		var condition = { created_by: id };

		dcl.getAllWhere('Document', condition, null, cb);
	},

    /**
     * create
     */
	create: (req, res) => {

		let response = {};
		// Combine two objects
		let data = Object.assign(req.body, req.file);

		validationEngine(data, 'document', 'create', (isPassed, validationResult) => {
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

				if(data.attachments && data.attachments.length) {
					data.attachments = data.attachments.map(function(item) {
						return item['id'];
					});
				}

				data.created_by = req.user._id;

				dcl.create(data, 'Document', cb);

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

		validationEngine(data, 'document', 'update', (isPassed, validationResult) => {
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

				if(data.attachments && data.attachments.length) {
					data.attachments = data.attachments.map(function(item) {
						return item['id'];
					});
				}

				dcl.update(id, data, 'Document', cb);

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
	remove: (req, res, callBack) => {
		let id = req.params.id;

		var cb = (response) => {
			if (response.status === 'success') {
				callBack(response.data);
				// fs.unlink(response.data.path, (err) => {
				// 	res.send(response);
				// })
				// do something with data
			} else {			
				// do something with error
				res.send(response);
			}
		}

		dcl.delete(id, 'Document', cb);
	},

	/**
     * get names of all documents
     */
	getDocumentNames: (req, res) => {

		var cb = (response) => {
			if (response.status === 'success') {
				// do something with data
				res.send(response);
			} else {
				// do something with error
				res.send(response);
			}
		}

		dcl.getAll('DocumentNames', cb);
	}
};