var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DocumentNamesSchema = new Schema({
    name: { type: String, required: true, unique: true, dropDups: true },
	created_at: { type: Date, time: true, default: Date.now },
	updated_at: { type: Date, time: true, default: Date.now }
});

module.exports = mongoose.model('DocumentNames', DocumentNamesSchema);