var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PaymentSchema = new Schema({
		
	  company_id: { type: String, required: true },
	  user_id: { type: Schema.Types.ObjectId, ref: 'User' },
	  user_type: { type: String, required: true },

	  id: { type: String, required: true },
	  entity: { type: String },
	  amount: { type: Number, required: true },
	  currency: { type: String },
	  status: { type: String },
	  order_id: { type: String },
	  invoice_id: { type: String },
	  international: { type: Boolean },
	  method: { type: String },
	  amount_refunded: { type: Number },
	  refund_status: { type: String },
	  captured: { type: Boolean },
	  description: { type: String },
	  card_id: { type: String },
	  bank: { type: String },
	  wallet: { type: String },
	  vpa: { type: String },
	  email: { type: String },
	  contact: { type: String },
	  notes: { type: Object },
	  fee: { type: Number },
	  tax: { type: Number },
	  error_code: { type: String },
	  error_description: { type: String },
	  created_at: { type: Date, time: true }
});

module.exports = mongoose.model('Payment', PaymentSchema);