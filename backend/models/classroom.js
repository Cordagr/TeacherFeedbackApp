const mongoose = require('mongoose');

const classroomSchema = new mongoose.Schema({
  name: String,
  teacherId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  inviteCode: String, 
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Classroom', classroomSchema);
