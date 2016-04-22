var mongoose = require('mongoose');

module.exports = mongoose.model('agenda',
	{
    id:String,
    title :String,
    allDay:Boolean,
    start:Date,
    end	:Date,
    url	:String,
    status: Number,
		details: String,
		noAttendees: Number
	});
