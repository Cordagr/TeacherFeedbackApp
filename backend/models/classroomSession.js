mongoose = require('mongoose');

const classroomSessionSchema = new mongoose.Schema({
    classroomId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Classroom',
      required: true,
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
    createdAt: {
      type: Date,
      default: Date.now,
    }
  });
  