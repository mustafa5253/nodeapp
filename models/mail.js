var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var mailSchema = new Schema({
	from: { 
		name: { type: String, trim: true, required: true },
		avatar: { type: String, trim: true },
		email: { type: String, trim: true, required: true }
	},
	to: { 
		name: { type: String, trim: true, required: true },
		email: { type: String, trim: true, required: true }
	},
	subject: { type: String, trim: true },
	message: { type: String, trim: true, required: true },
	read: Boolean,
	starred: Boolean,
	important: Boolean,
	hasAttachments: Boolean,
	labels: [String],
	folder: Number,
    attachments: [{
		type: { type: String, trim: true },
		fileName: { type: String, trim: true },
		preview: { type: String, trim: true },
		url: { type: String, trim: true },
		size: { type: String, trim: true },
	}],
	created_by: String,
	created_at: { type: Date, time: true },
	updated_at: { type: Date, time: true },
});

module.exports = mongoose.model('Mail', mailSchema);
