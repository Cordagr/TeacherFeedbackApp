// Import the Express framework for building the router
const express = require('express');
const router = express.Router();


// Define a POST route for user profile registration
router.post('/makeFeedbackRoom', (req, res) => {
    // Handle user registration logic here
    res.json({ message: 'Registering User Profile' });
});

router.post('/deleteFeedbackRoom', (req,res) =>
{
res.json({ message: 'Deleting Feedback Room' });
})

router.post('/editFeedbackRoom', (req,res) =>
{
res.json({ message: 'Editing Feedback Room' });
})

router.post('/exportFeedback', (req,res) =>
{
res.json({ message: 'Exporting Feedback Room' });
})


// Export the router to be used in server.js
module.exports = router;