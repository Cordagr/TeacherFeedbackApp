const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  date: { type: Date, default: Date.now },
  college: { type:String, required: true},
  role: { type: String, enum: ['student', 'teacher'], required: true },
  userID: {type:String, required: true}
});

module.exports = mongoose.model('User', userSchema);