var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongoosePaginate = require('mongoose-paginate');
var customerCounterSchema = require('./customer-sequence');

var userSchema = new Schema({
	first_name: { type: String, trim: true },
	last_name: { type: String, trim: true },
	gender: String,
	dob: { type: Date, time: true },
	profile_photo: String,
	mobile: String,
	email: { type: String, unique: true, lowercase: true, trim: true },
	password: String,
	// address: {
	// 	state: {
	// 		code: String,
	// 		name: String
	// 	},
	// 	city: String,
	// 	postal_code: String,
	// 	address_line1: String,
	// 	address_line2: String,
	// },
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
	active_status: String,
	
    firm_name: String,
    gst_number: String,
    aadhar_number: String,
    tan_number: String,
    cin_number: String,
    pan_number: String,
    address: String,
    key_person: String,
    status: String,

    sequence_number: { type: String }, // Auto increment

    chatList: [{
    	id: String,
    	contactId: String,
    	lastMessageTime: { type: Date, time: true },
    	name: String,
    	unread: Number
    }]
},
{
	timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});



userSchema.pre('save', function(next) {

    var user = this;

    if (user.user_type === 'customer') {
    	
	    customerCounterSchema.findOneAndUpdate({ company_id: user.company_id }, { $inc: { seq: 1 } }, function(error, counter) {
	        
	        if(error) {
	            return next(error);
	        }

	        if (counter) {

	        	user.sequence_number = counter.seq;

	        }

	        next();

	    });

    } else {
    	next();
    }
});

userSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('User', userSchema);
