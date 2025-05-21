const express = require('express');
const Classroom = require('../models/classroom');
const ClassroomSession = require('../models/classroomSession');
const cron = require('node-cron');
const crypto = require('crypto');
const sgMail = require('@sendgrid/mail');
const multer = require('multer');
const path = require('path');
const classroomRouter = express.Router();
const fs = require('fs');
// Firebase imports - choose one approach:
// OPTION 1: CommonJS approach
const { db } = require('../firebase');
// OPTION 2: ES Module approach (would require converting entire file to use import/export)
// import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
// import { db } from '../../src/firebase';

const generateInviteCode = () => crypto.randomBytes(4).toString('hex');

const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${ext}`;
    cb(null, uniqueName);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'application/pdf') {
    cb(null, true);
  } else {
    cb(new Error('Only PDF files are allowed'), false);
  }
};

const upload = multer({ storage, fileFilter });

classroomRouter.post('/createClassroom', async (req, res) => {
  try {
    const { teacherName, ownerTeacherEmail, meetingDays, meetingTimes, className } = req.body;

    const inviteCode = Math.random().toString(36).substring(2, 8).toUpperCase();

    const classroom = new Classroom({
      teacherName,
      ownerTeacherEmail,
      className,
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

classroomRouter.get('/getStudentClassrooms/:email', async(req,res) => {
  const { email } = req.params;
  try {
    const classrooms = await Classroom.find({students: email});
    res.status(200).json(classrooms);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch classrooms' });
  }
});

classroomRouter.get('/getTeacherClassrooms/:email', async(req,res) => {
  const { email } = req.params;
  try {
    const classrooms = await Classroom.find({ ownerTeacherEmail: email });
    res.status(200).json(classrooms);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch classrooms' });
  }
});

async function fetchAllStudents(classroomId) {
  try {
    const classroom = await Classroom.findOne({ inviteCode: classroomId });
    if (!classroom) {
      throw new Error('Classroom not found');
    }
    return classroom.students;
  } catch (error) {
    console.error('Error fetching students:', error);
    throw error;
  }
}


classroomRouter.post('/createClassroomSession', async(req,res) => {
  const { inviteCode, sessionDate, endTime, durationMinutes, notes } = req.body;
  try {
    const classroom = await Classroom.findOne({ inviteCode });
    if (!classroom) {
      return res.status(404).json({ error: 'Classroom not found' });
    }

    const classroomId = inviteCode;

    // Fetch students for the classroom
    const students = await fetchAllStudents(classroomId);
    
    
    const studentEmailObjects = students.map(email => ({ email }));
    
    const classroomSession = new ClassroomSession({
      classroomId,
      sessionDate: new Date(sessionDate),
      endTime: endTime ? new Date(endTime) : null,
      durationMinutes: durationMinutes || 60,
      notes: notes || '',
      isOpen: false,
      studentEmails: studentEmailObjects
    });

    await classroomSession.save();
  
    res.status(200).json({ message: 'Classroom session created successfully', classroomSession });
  } catch (error) {
    console.error('Error creating classroom session:', error);
    res.status(400).json({ error: 'Failed to create classroom session', details: error.message });
  }
});


classroomRouter.get('/getClassroomSessions/:classroomId', async(req,res) => {
  const { classroomId } = req.params;
  try {
    const sessions = await ClassroomSession.find({ classroomId });
    res.status(200).json(sessions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch classroom sessions' });
  }
});

classroomRouter.get('/getStudentsInClassroom/:classroomId', async(req,res) => {
  const { classroomId } = req.params;
  try {
    const classroom = await Classroom.findOne({ inviteCode: classroomId });
    if (!classroom) {
      return res.status(404).json({ error: 'Classroom not found' });
    }
    
    const students = classroom.students;
    res.status(200).json({ students });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch students' });
  }
});
 
// Feedback anonymous route
classroomRouter.post('/postAnonymousFeedback', async (req, res) => {
  const { classroomId, feedback } = req.body;
  try {
    const session = await ClassroomSession.findOne({ classroomId, isOpen: true });
    if (!session) {
      return res.status(404).json({ error: 'No open session found for this classroom' });
    }

    if (!session.feedback) {
      session.feedback = [];
    }

    session.feedback.push({ feedback, timestamp: new Date() });
    await session.save();

    res.status(200).json({ message: 'Feedback recorded successfully', session });
  } catch (error) {
    console.error('Error recording feedback:', error);
    res.status(500).json({ error: 'Failed to record feedback' });
  }
});

classroomRouter.post('/attachTeacherAttachment', upload.single('attachment'), async (req, res) => {
  const { classroomId } = req.body;
  const filePath = req.file ? req.file.path : null;

  if (!filePath) {
    return res.status(400).json({ error: 'Only PDF attachments are allowed' });
  }

  try {
    const session = await ClassroomSession.findOne({ classroomId, isOpen: true });

    if (!session) {
      return res.status(404).json({ error: 'No open session found for this classroom' });
    }

    session.attachments.push({
      attachment: filePath,
      timestamp: new Date()
    });

    await session.save();

    res.status(200).json({ message: 'PDF attached successfully', session });
  } catch (error) {
    console.error('Error attaching PDF:', error);
    res.status(500).json({ error: 'Failed to attach PDF' });
  }
});

// Convert to CommonJS style
const addNotification = async (studentId, message) => {
  try {
    // Using CommonJS approach with require
    const { collection, addDoc, serverTimestamp } = require('firebase/firestore');
    const notifRef = collection(db, 'students', studentId, 'notifications');
    await addDoc(notifRef, {
      message,
      read: false,
      createdAt: serverTimestamp(),
    });
    console.log('Notification sent');
  } catch (err) {
    console.error('Error adding notification:', err);
  }
};

// Implementing sending notification as a teacher to students specifically
classroomRouter.post('/postAnnouncement', async(req, res) => {
  const { classroomId, message } = req.body;
  if(!classroomId) {
    return res.status(400).json({error: "No required classroom identifier provided"});
  }
  
  try {
    const classroomSession = await ClassroomSession.findOne({classroomId, isOpen: true}); 
    
    if(!classroomSession) {
      return res.status(404).json({error: 'Classroom session is closed or does not exist'});
    }
    
    if(!classroomSession.announcements) {
      classroomSession.announcements = [];
    }
    
    classroomSession.announcements.push({
      message,
      timestamp: new Date()
    });
    
    await classroomSession.save();
    
    // Send notifications to students
    await addNotification(classroomId, message);
    
    res.status(200).json({ message: 'Announcement posted successfully', classroomSession });
  } catch(error) {
    console.error('Error posting announcement', error);
    res.status(500).json({ error: 'Failed to post announcement' });
  }
});

cron.schedule('* * * * *', async () => {
  const now = new Date();

  await ClassroomSession.updateMany(
    { isOpen: false, sessionDate: { $lte: now } },
    { isOpen: true }
  );

  await ClassroomSession.updateMany(
    { isOpen: true, endTime: { $lte: now } },
    { isOpen: false }
  );

  console.log(`[CRON] Session statuses updated at ${now.toISOString()}`);
});

// TODO: Automatic live chat during open sessions
// TODO: Implement categorization of labels attachments
// TODO: Implement notification system for students and teachers through email

module.exports = classroomRouter;