var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate');

var planSchema = new Schema({
	name: { type: String, trim: true, required: true },
	validity_in_days: Number,
	price: Number,
	storage_limit: Number, // In GB
	number_of_users: Number,
	company_id: String,
	created_by: String, // 'admin' || 'super_admin'
	created_at: { type: Date, time: true },
	updated_at: { type: Date, time: true },
},
{
	timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

planSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Plan', planSchema);
