// Import the Express framework for building the router
const express = require('express');
const router = express.Router();


// Define a POST route for user profile registration
router.post('/registerUserProfile', (req, res) => {
    // Handle user registration logic here
    res.json({ message: 'Registering User Profile' });
});

router.post('/deleteAccount', (req,res) =>
{
res.json({ message: 'Deleting User Account' });
})


// Export the router to be used in server.js
module.exports = router;