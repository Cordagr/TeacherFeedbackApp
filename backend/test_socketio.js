// Test script to verify Socket.IO functionality
// Run with: node test_socketio.js

const io = require('socket.io-client');

const socket = io('http://localhost:3002');

socket.on('connect', () => {
  console.log('✓ Connected to server');
  
  // Test joining a session
  socket.emit('joinSession', 'TEST123');
  console.log('✓ Joined test session');
  
  // Test feedback submission
  socket.emit('submitFeedback', {
    sessionId: 'TEST123',
    feedback: 'This is a test feedback message',
    user: 'TestUser',
    timestamp: new Date()
  });
  console.log('✓ Submitted test feedback');
  
  // Test message sending
  socket.emit('sendMessage', {
    sessionId: 'TEST123',
    message: 'Hello from test client!',
    user: 'TestUser',
    role: 'student',
    timestamp: new Date()
  });
  console.log('✓ Sent test message');
});

socket.on('newFeedback', (data) => {
  console.log('✓ Received feedback:', data);
});

socket.on('newMessage', (data) => {
  console.log('✓ Received message:', data);
});

socket.on('disconnect', () => {
  console.log('✗ Disconnected from server');
});

socket.on('connect_error', (error) => {
  console.error('✗ Connection error:', error);
});

// Disconnect after 5 seconds
setTimeout(() => {
  console.log('📋 Test completed, disconnecting...');
  socket.disconnect();
  process.exit(0);
}, 5000);