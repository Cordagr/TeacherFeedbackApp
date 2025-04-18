// Import the Express framework for building the router
const express = require('express');
const router = express.Router();


// Define a POST route for user registration
router.post('/register', (req, res) => {
    // Handle user registration logic here
    res.json({ message: 'Registration successful' });
});

// Define a POST route for user login
router.post('/login', (req, res) => {
    // Handle user login logic here
    res.json({ message: 'Login successful' });
});


// Export the router to be used in server.js
module.exports = router;
