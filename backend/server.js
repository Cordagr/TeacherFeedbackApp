require('dotenv').config(); // Load environment variables from .env

const express = require('express');
const http = require('http');
const { createClient } = require('redis');
const { Server } = require('socket.io');
const cors = require('cors');
const connectDB = require('./db'); 

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*"
  }
});

// middleware set up //
app.use(cors());
app.use(express.json());

// Make io available to routes
app.set('io', io);

// Connect to MongoDB using environment variable
connectDB(process.env.DB_URI); // Use DB_URI from .env file

const registerRouter = require('./routes/register');
app.use('/api/auth', registerRouter);

const loginRouter = require('./routes/login');
app.use('/api/auth', loginRouter);

const userProfileRouter = require('./routes/userProfile');
app.use('/api/userProfile', userProfileRouter);

const classroomRouter = require('./routes/classroom')
app.use('/api/teacherActions', classroomRouter);

const studentActionsRouter = require('./routes/classroom');
app.use('/api/studentActions', studentActionsRouter);



// Connecting Send Grid for email notifications // 
const sgMail = require('@sendgrid/mail')
// sgMail.setApiKey(process.env.SENDGRID_API_KEY)

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log('New client connected:', socket.id);

  // Handle joining a classroom session
  socket.on('joinSession', (sessionId) => {
    socket.join(sessionId);
    console.log(`Client ${socket.id} joined session ${sessionId}`);
  });

  // Handle leaving a classroom session
  socket.on('leaveSession', (sessionId) => {
    socket.leave(sessionId);
    console.log(`Client ${socket.id} left session ${sessionId}`);
  });

  // Handle real-time feedback submission
  socket.on('submitFeedback', (data) => {
    const { sessionId, feedback, user, timestamp } = data;
    // Broadcast feedback to all clients in the session
    io.to(sessionId).emit('newFeedback', {
      feedback,
      user,
      timestamp: timestamp || new Date(),
      id: Date.now() + Math.random()
    });
    console.log(`Feedback submitted to session ${sessionId}:`, feedback);
  });

  // Handle real-time chat messages
  socket.on('sendMessage', (data) => {
    const { sessionId, message, user, timestamp, role } = data;
    // Broadcast message to all clients in the session
    io.to(sessionId).emit('newMessage', {
      message,
      user,
      role,
      timestamp: timestamp || new Date(),
      id: Date.now() + Math.random()
    });
    console.log(`Message sent to session ${sessionId}:`, message);
  });

  // Handle teacher announcements
  socket.on('sendAnnouncement', (data) => {
    const { sessionId, announcement, user, timestamp } = data;
    // Broadcast announcement to all clients in the session
    io.to(sessionId).emit('newAnnouncement', {
      announcement,
      user,
      timestamp: timestamp || new Date(),
      id: Date.now() + Math.random()
    });
    console.log(`Announcement sent to session ${sessionId}:`, announcement);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

// Connect Redis using environment variables (optional for scaling)
//const redisPublisher = createClient({
  //url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`
//});
//const redisSubscriber = createClient({
  //url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`
//});

//(async () => {
  //await redisPublisher.connect();
  //await redisSubscriber.connect();
//})();

// Listen on a dynamic port (use PORT from .env file or default to 3001)
const port = process.env.PORT || 3002;
server.listen(port, () => console.log(`Server running on port ${port}`));

module.exports = app;
