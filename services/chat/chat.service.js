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

		dcl.getAll('Chat', cb);
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

		dcl.getById(id, 'Chat', cb);
	},

	/**
     * getChatById
     */
	getChatById: (req, res) => {

		var chat_id = req.params.id;

		var cb = (response) => {
			if (response.status === 'success') {
				// do something with data
				if (response.data && response.data.length) {
					
					response.data = response.data[0];

				}

				res.send(response);
			} else {
				// do something with error
				res.send(response);
			}
		}

		dcl.getAllWhere('Chat', { id : chat_id }, null, cb);
	},

    /**
     * create
     */
	create: (req, res) => {

		let response = {};
		let data = req.body;

		console.log('the data to save osss :', data);

		validationEngine(data, 'chat', 'create', (isPassed, validationResult) => {
			if (isPassed) {
				let cb = (output) => {

					console.log('the output to save osss :', output);

					if (output.status === 'success') {
						// do something with data
						res.send(output);
					} else {
						// do something with error
						res.send(output);
					}
				}
				
				dcl.create(data, 'Chat', cb);

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

		validationEngine(data, 'Chat', 'update', (isPassed, validationResult) => {
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
				console.log('the data before save : ', data);
				dcl.update(id, data, 'Chat', cb);

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

		dcl.delete(id, 'Chat', cb);
	}
};

function modifyChat(chatList) {
	
	const newChatList = [];

	chatList.forEach((chat) => {
		newChatList.push({
			id: chat.id,
			name: 'A name',
			contactId: chat.dialog[0].who,
			unread: 5,
			lastMessageTime: chat.time
		});
	});

	return newChatList;
}