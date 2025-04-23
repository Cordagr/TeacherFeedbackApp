const mongoose = require('mongoose');

const classroomSchema = new mongoose.Schema({
  teacherName: String,
  ownerTeacherEmail: { type: String, required:true },
  inviteCode: {type: String, required:true}, 
  meetingTimes: {type: String, required:True},
  meetingDays: {type: String, required:True},
  createdAt: { type: Date, default: Date.now },
  students: [{ type: String}]
});
module.exports = mongoose.model('Classroom', classroomSchema);
