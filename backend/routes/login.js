const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/register'); // Ensure you have a User model defined

const loginRouter = express.Router();

loginRouter.post('/login', async (req, res) => {
  const userData = {
    email: req.body.email,
    password: req.body.password
  };

  if (!userData.email || !userData.password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    // Find the user by email
    const user = await User.findOne({ email: userData.email });
    if (!user) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    // Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(userData.password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user._id }, 'your_jwt_secret', { expiresIn: '1h' });

    // Respond with the token
    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = loginRouter;