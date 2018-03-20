var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var NotificationSchema = new Schema({

    title: { type: String, required: true },
    user_name: { type: String, required: true },
    email_id: { type: String, required: true },
    date_added: '05-01-18',
    task_id: '02',
    created_by: String,
	created_at: { type: Date, time: true },
	updated_at: { type: Date, time: true },
});

module.exports = mongoose.model('Notification', NotificationSchema);