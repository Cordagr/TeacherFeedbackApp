const express = require('express');
const Classroom = require('../models/classroom');
const crypto = require('crypto');

const classroomRouter = express.Router();

const generateInviteCode = () => crypto.randomBytes(4).toString('hex');


classroomRouter.post('/createClassroom', async (req, res) => {
  try {
    const { teacherName, ownerTeacherEmail, meetingDays, meetingTimes } = req.body;

    const inviteCode = Math.random().toString(36).substring(2, 8).toUpperCase();

    const classroom = new Classroom({
      teacherName,
      ownerTeacherEmail,
      inviteCode,
      meetingDays,
      meetingTimes,
    });

    await classroom.save();

    const inviteLink = `http://localhost:3000/join/${inviteCode}`;

    res.status(200).json({ classroom, inviteLink });
  } catch (error) {
    console.error('Error creating classroom:', error);
    res.status(400).json({ error: 'Failed to create classroom' });
  }
});


classroomRouter.post('/joinClassroom', async (req, res) => {
  const { email, inviteCode } = req.body;

  if (!email || !inviteCode) {
    return res.status(400).json({ error: 'Student email and invite code are required' });
  }

  try {
    const classroom = await Classroom.findOne({ inviteCode });

    if (!classroom) {
      return res.status(404).json({ error: 'Invalid invite code' });
    }

    if (classroom.students.includes(email)) {
      return res.status(400).json({ message: 'Student already joined this classroom' });
    }

    classroom.students.push(email);
    await classroom.save();

    res.status(200).json({ message: 'Joined classroom successfully', classroom });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to join classroom' });
  }
});

classroomRouter.get('/getStudentClassrooms/:email', async(req,res) =>
{
const {inviteCode, email} = req.params;
  try {
    // edit need to make sure student is also in classroom // 
    const classrooms = await Classroom.find({students: email});
    res.status(200).json(classrooms);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch classrooms' });
  }
})


classroomRouter.get('/getTeacherClassrooms/:email', async(req,res) => 
{
  const { email } = req.params;
  try {
    const classrooms = await Classroom.find({ ownerTeacherEmail: email });
    res.status(200).json(classrooms);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch classrooms' });
  }
})

module.exports = classroomRouter;
