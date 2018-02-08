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
	attachments: {
		type: Array,
		items: [
			{
				type: Object,
				items: {
					uuid: { type: String },
					name: { type: String },
					path: { type: String },
					id: { type: String }
				}
			}
		]
	},
	checklists: Array,
	activities: Array,
	checkItems: Number,
	checkItemsChecked: Number,
	service: String,
	comments: [{ message: String, user_name: String, time: { type: String } }],
	created_by: String,
	created_at: { type: Date, time: true },
	updated_at: { type: Date, time: true },
});


TaskSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Task', TaskSchema);
