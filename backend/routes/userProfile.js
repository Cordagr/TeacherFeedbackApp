const express = require('express');
const userProfileRouter = express.Router();
const StudentProfile = require('../models/StudentProfile');


userProfileRouter.post('/registerUserProfile', async (req, res) => {
  try {
    const { first_name, last_name, major, phone_number, current_standing } = req.body;

    const newProfile = new StudentProfile({
      first_name,
      last_name,
      major,
      phone_number,
      current_standing,
    });

    await newProfile.save();

    res.status(201).json({ message: 'Student profile created successfully' });
  } catch (err) {
    console.error('Error saving student profile:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = userProfileRouter;
