const express = require('express');
const Classroom = require('../models/classroom');
const crypto = require('crypto');

const classroomRouter = express.Router();

const generateInviteCode = () => crypto.randomBytes(4).toString('hex');


classroomRouter.post('/createClassroom', async (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: 'Name and teacher email are required' });
  }

  const inviteCode = generateInviteCode();

  try {
    const classroom = new Classroom({
      name,
      teacherEmail: email,
      inviteCode,
      students: []
    });

    await classroom.save();

    res.status(201).json({
      message: 'Classroom created successfully',
      inviteLink: `https://teacherFeedbackApp/join/${inviteCode}`,
      classroom
    });


  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create classroom' });
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

module.exports = classroomRouter;
