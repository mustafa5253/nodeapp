var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var customerCounterSchema = require('./customer-sequence');

var CompanySchema = new Schema({
	name: { type: String, trim: true, required: true },
	owner_id: String,
	address: {
		state: {
			code: String,
			name: String
		},
		city: String,
		postal_code: String,
		address_line1: String,
		address_line2: String,
		gst_number: String
	},
	country: {
		code: String,
		name: String
	},
	subscription: { 
		start_date:{ type: Date, time: true, default: Date.now },
		end_date:{ type: Date, time: true },
	},
	created_by: String,
	created_at: { type: Date, time: true },
	updated_at: { type: Date, time: true },
});


CompanySchema.post('save', function(company) {

    customerCounterSchema.create({ company_id: company._id, seq: 1 }, function(error, seqence) {
        
        if(error) {
            return;
        }

    });

});

module.exports = mongoose.model('Company', CompanySchema);