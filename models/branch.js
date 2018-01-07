var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var userModel = require('./user');
var companyModel = require('./company');

var branchSchema = new Schema({
	name: { type: String, trim: true, required: true },
	company_id: String,
	address: {
		state: {
			code: String,
			name: String
		},
		city: String,
		postal_code: String,
		address_line1: String,
		address_line2: String,
	},
	country: {
		code: String,
		name: String
	},
	gst_number: String,
	created_by: String,
	created_at: { type: Date, time: true },
	updated_at: { type: Date, time: true },
});

module.exports = mongoose.model('Branch', branchSchema);
