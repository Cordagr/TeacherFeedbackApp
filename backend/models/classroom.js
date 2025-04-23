const mongoose = require('mongoose');

const classroomSchema = new mongoose.Schema({
  teacherName: String,
  ownerTeacherEmail: { type: String, required:true },
  inviteCode: String, 
  createdAt: { type: Date, default: Date.now },
  students: [{ type: String}]
});
module.exports = mongoose.model('Classroom', classroomSchema);
