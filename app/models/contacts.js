// Load required packages
var mongoose = require('mongoose');

// Define our beer schema
var Schema   = new mongoose.Schema({
  firstname: String,
  lastname: String,
  createdAt: { type: Date, default: Date.now },
  phone: String,
  email: String,
  company: String,
  jobtitle: String,
  userId: String,
  profileImage: String
});
// Export the Mongoose model
module.exports = mongoose.model('Contact', Schema);
