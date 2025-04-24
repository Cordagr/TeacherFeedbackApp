const mongoose = require('mongoose');

const classroomSessionSchema = new mongoose.Schema({
  classroomId: {
    type: String,
    required: true,
    index: true
  },
  sessionDate: {
    type: Date,
    required: true,
  },
  endTime: {
    type: Date,
  },
  durationMinutes: {
    type: Number,
    default: 60,
  },
  isOpen: {
    type: Boolean,
    default: false,
  },
  attendance: [
    {
      studentEmail: String,
      joinedAt: Date,
    }
  ],
  notes: {
    type: String,
    default: '',
  },
  attachments: [
    {
      attachment: String,           
      timestamp: { type: Date, default: Date.now }
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

const ClassroomSession = mongoose.model('ClassroomSession', classroomSessionSchema);
module.exports = ClassroomSession;
