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

// Connect to MongoDB using environment variable
connectDB(process.env.DB_URI); // Use DB_URI from .env file

const registerRouter = require('./routes/register');
app.use('/api/auth', registerRouter);

const loginRouter = require('./routes/login');
app.use('/api/auth', loginRouter);

const userProfileRouter = require('./routes/userProfile');
app.use('/api/userProfile', userProfileRouter);

// Connect Redis using environment variables
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

//redisSubscriber.subscribe('feedback', (message) => {
  //const parsed = JSON.parse(message);
  //io.emit('new-feedback', parsed); // Push to connected frontends
//});

// Listen on a dynamic port (use PORT from .env file or default to 3001)
const port = process.env.PORT || 3001;
server.listen(port, () => console.log(`Server running on port ${port}`));

module.exports = app;
