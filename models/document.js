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
	destination: { type: String },
	filename: { type: String },
	path: { type: String },
	document_id: { type: Schema.Types.ObjectId, ref: 'DocumentNames' },
	size: { type: String, required: true },
	created_by: String,
	created_for: String,
	created_at: { type: Date, time: true },
	updated_at: { type: Date, time: true },

    bucket: { type: String },
    key: { type: String },
    acl: { type: String },
    contentType: { type: String },
    contentDisposition: { type: String },
    storageClass: { type: String },
    serverSideEncryption: { type: String },
    metadata: { type: String },
    location: { type: String },
    etag: { type: String }

});

DocumentSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Document', DocumentSchema);