var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongoosePaginate = require('mongoose-paginate');

var userSchema = new Schema({
	first_name: { type: String, trim: true },
	last_name: { type: String, trim: true },
	gender: String,
	dob: { type: Date, time: true },
	profile_photo: String,
	mobile: {
		code: String,
		number: String
	},
	email: { type: String, unique: true, lowercase: true, trim: true },
	password: String,
	address: {
		state: {
			code: String,
			name: String
		},
		city: String,
		postal_code: String,
		address_line1: String,
		address_line2: String,
	},
	group_id: String,
	company_id: String,
	company_name: String,
	branch_id: String,
	user_type: String,
	plan_id: String,
	roles: Array,
	is_verified: {
		mobile: Boolean,
		email: Boolean
	},
	country: {
		code: String,
		name: String
	},
	created_by: String,
	active_status: String
},{
	timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
}
);

userSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('User', userSchema);
