const express = require('express');
const userProfileRouter = express.Router();
const StudentProfile = require('../models/StudentProfile');


userProfileRouter.post('/registerUserProfile', async (req, res) => {
  try {
    const {first_name, last_name, major, phone_number, current_standing, email} = req.body;
    console.log('Received profile submission:', req.body);
    const newProfile = new StudentProfile({
      first_name,
      last_name,
      major,
      phone_number,
      current_standing,
      email,
    });
    await newProfile.save();
    res.status(201).json({ message: 'Student profile created successfully' });
  } catch (err) {
    console.error('Error saving student profile:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Fetch status on user profile (checkign if userProfile has been created already)
userProfileRouter.get('/getUserProfileStatus/:email', async (req, res) => {
const { email } = req.params;

  try {
    const existingProfile = await StudentProfile.findOne({ email });

    if (existingProfile) {
      res.status(200).json({ exists: true, profile: existingProfile });
    } else {
      res.status(200).json({ exists: false });
    }
  } catch (err) {
    console.error('Error checking user profile:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


module.exports = userProfileRouter;
