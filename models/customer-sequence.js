var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CounterSchema = new Schema({
    company_id: {type: String, required: true},
    seq: { type: Number, default: 0 }
});

module.exports = mongoose.model('customerCounter', CounterSchema);