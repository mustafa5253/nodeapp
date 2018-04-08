var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongoosePaginate = require('mongoose-paginate');

var DocumentSchema = new Schema({
    document_name: { type: String, required: true },
    document_type: { type: String, required: true },
	fieldname: { type: String, required: true },
	originalname: { type: String, required: true },
	encoding: { type: String, required: true },
	mimetype: { type: String, required: true },
	destination: { type: String, required: true },
	filename: { type: String, required: true },
	path: { type: String, required: true },
	size: { type: String, required: true },
	created_by: String,
	created_at: { type: Date, time: true },
	updated_at: { type: Date, time: true },
});

DocumentSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Document', DocumentSchema);