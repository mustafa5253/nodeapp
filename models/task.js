var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate');

var TaskSchema = new Schema({
	title: { type: String, trim: true, required: true },
	priority: String,
	description: String,
	assigned_to: String,
	assigned_by: String,
	company_id: String,
	branch_id: String,
	status: String,
	attachments: [{ type: Schema.Types.ObjectId, ref: 'Document' }],
	checklists: Array,
	activities: Array,
	checkItems: Number,
	checkItemsChecked: Number,
	services: [{ type: Schema.Types.ObjectId, ref: 'Service' }],
	comments: [{ message: String, user: { type: Schema.Types.ObjectId, ref: 'User' }, time: { type: Date, time: true } }],
	created_by: String,
	updated_by: String,
	created_at: { type: Date, time: true },
	updated_at: { type: Date, time: true },
});


TaskSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Task', TaskSchema);
