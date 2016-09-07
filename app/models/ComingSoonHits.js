// grab the mongoose module
var mongoose = require('mongoose');

// define our nerd model
// module.exports allows us to pass this to other files when it is called
module.exports = mongoose.model('ComingSoonHits', {
	name : {type : String, default: ''},
	createdAt: { type: Date, default: Date.now },
	ipaddress : {type : String, default: ''},
	sitename : {type : String, default: 'tripstreamer'}
});
