const mongoose = require('mongoose');

const TeacherProfileSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: false,
  },
  last_name: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  subject: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  classes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Class',
    },
  ],
  phone_number: 
  {
    
    type: String,
    required: true,
    match: [/^\d{10}$/, 'Please enter a valid phone number']
  }
  
});

module.exports = mongoose.model('TeacherProfile', TeacherProfileSchema);