var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var planSchema = new Schema({
	name: { type: String, trim: true, required: true },
	validity_in_days: Number,
	price: Number,
	currency: { code: String, name: String },
	country: { code: String, name: String },
	created_by: String,
	created_at: { type: Date, time: true },
	updated_at: { type: Date, time: true },
});

module.exports = mongoose.model('Plan', planSchema);
