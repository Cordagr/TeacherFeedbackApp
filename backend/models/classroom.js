const mongoose = require('mongoose');

const classroomSchema = new mongoose.Schema({
  teacherName: String,
  ownerTeacherEmail: { type: String, required: true },
  inviteCode: { type: String, required: true },
  meetingTimes: { type: String, required: true },
  meetingDays: [{ type: String, required: true }],
  createdAt: { type: Date, default: Date.now },
  students: [{ type: String }]
});

module.exports = mongoose.model('Classroom', classroomSchema);
