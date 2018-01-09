var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate');

var TaskSchema =new Schema({
	title: { type: String, trim: true, required: true },
	priority: String,
	is_active: Boolean,
	description: String,
	assigned_to: String,
	assigned_by: String,
	company_id: String,
	branch_id: String,
	status: String,
	attachments: [{ url: String, name: String }],
	comments: [{ message: String, user_id: String, time: { type: Date, time: true }}],
	created_by: String,
	created_at: { type: Date, time: true },
	updated_at: { type: Date, time: true },
});


TaskSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Task', TaskSchema);
