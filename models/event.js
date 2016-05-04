var mongoose = require('mongoose'),
		slug = require('mongoose-slug-generator');
mongoose.plugin(slug);

module.exports = mongoose.model('event',
	{
    id:String,
    title :String,
    allDay:Boolean,
    start:Date,
    end	:Date,
    url	:String,
    status: Number,
		details: String,
		noAttendees: Number,
		slug: { type: String, slug: "title", slug_padding_size: 2, unique: true }
	});
