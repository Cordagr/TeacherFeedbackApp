const mongoose = require('mongoose');

const enrollmentSchema = new mongoose.Schema({
  classId: { type: mongoose.Schema.Types.ObjectId, ref: 'Classroom' },
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  joinedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Enrollment', enrollmentSchema);