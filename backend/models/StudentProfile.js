const mongoose = require('mongoose');

const studentProfileSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  major: {
    type: String,
    required: true,
  },
  phone_number: {
    type: String,
    required: true,
    match: [/^\d{10}$/, 'Please enter a valid phone number']
  },
  current_standing: {
    type: String,
    enum: ['Freshman', 'Sophomore', 'Junior', 'Senior'],
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('StudentProfile', studentProfileSchema);

