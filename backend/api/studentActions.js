// Import the Express framework for building the router
const express = require('express');
const router = express.Router();


// Define a POST route for user profile registration
router.post('/postFeedback', (req, res) => {
    // Handle user registration logic here
    res.json({ message: 'Posting Feedback' });
});

router.post('/leaveFeedbackRoom', (req,res) =>
{
res.json({ message: 'Leaving Feedback Room' });
})

// Export the router to be used in server.js
module.exports = router;