const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  classId: { type: mongoose.Schema.Types.ObjectId, ref: 'Classroom' },
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  teacherId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  rating: { type: Number, min: 1, max: 5 },
  comment: String,
  submittedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Feedback', feedbackSchema);
