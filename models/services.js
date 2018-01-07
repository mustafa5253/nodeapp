var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ServiceSchema = new Schema({
	name: { type: String, trim: true, required: true },
	is_active: { type: Boolean, dafault: true },
	company_id: String,
	created_by: String,
	created_at: { type: Date, time: true },
	updated_at: { type: Date, time: true },
});

module.exports = mongoose.model('Service', ServiceSchema);