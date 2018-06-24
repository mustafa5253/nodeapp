var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ServiceSchema = new Schema({
	name: { type: String, trim: true, required: true },
	is_active: { type: Boolean, dafault: true },
	company_id: String,
	documents: [{ type: Schema.Types.ObjectId, ref: 'DocumentNames' }],
	description: String,
	created_by: String,
	created_at: { type: Date, time: true },
	updated_at: { type: Date, time: true },
});

let autoPopulateLead = function(next) {
  this.populate('documents');
  next();
};

ServiceSchema.
  pre('findOne', autoPopulateLead).
  pre('find', autoPopulateLead);

module.exports = mongoose.model('Service', ServiceSchema);