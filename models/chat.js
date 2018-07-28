var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ChatSchema = new Schema({
    
    id: String,
	dialog: [{
		who: String, 
		message: String,
		time: { type: Date, time: true, default: Date.now }
	}],

	created_at: { type: Date, time: true, default: Date.now },
	updated_at: { type: Date, time: true, default: Date.now }
});

module.exports = mongoose.model('Chat', ChatSchema);