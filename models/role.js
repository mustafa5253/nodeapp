var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RoleSchema = new Schema({
	name: { type: String, trim: true, required: true },
	permissions: [{ type: String, trim:true, required: true }],
	scopes: [{ type: String, trim: true, required: true}],
	company_id: String,
	created_by: String,
	created_at: { type: Date, time: true },
	updated_at: { type: Date, time: true },
});

module.exports = mongoose.model('Role', RoleSchema);