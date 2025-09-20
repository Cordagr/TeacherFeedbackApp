import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { Box, VStack, Text, Badge, Flex, Heading } from '@chakra-ui/react';

const socket = io(process.env.REACT_APP_BACKEND_URL || 'http://localhost:3002');

const LiveFeedback = ({ sessionId, userRole = 'teacher' }) => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    if (!sessionId) return;

    // Join the session room
    socket.emit('joinSession', sessionId);
    setConnected(true);

    // Listen for new feedback
    socket.on('newFeedback', (data) => {
      setFeedbacks(prev => [data, ...prev]);
    });

    // Handle connection status
    socket.on('connect', () => {
      console.log('Connected to server');
      setConnected(true);
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from server');
      setConnected(false);
    });

    // Cleanup on unmount
    return () => {
      socket.emit('leaveSession', sessionId);
      socket.off('newFeedback');
      socket.off('connect');
      socket.off('disconnect');
    };
  }, [sessionId]);

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString();
  };

  return (
    <Box 
      bg="gray.800" 
      p={4} 
      borderRadius="lg" 
      maxH="400px" 
      overflowY="auto"
      border="1px solid"
      borderColor="gray.600"
    >
      <Flex justify="space-between" align="center" mb={4}>
        <Heading size="md" color="white">Live Feedback</Heading>
        <Badge 
          colorScheme={connected ? 'green' : 'red'} 
          variant="solid"
        >
          {connected ? 'Connected' : 'Disconnected'}
        </Badge>
      </Flex>
      
      {feedbacks.length === 0 ? (
        <Text color="gray.400" textAlign="center" py={8}>
          No feedback yet. Waiting for student responses...
        </Text>
      ) : (
        <VStack spacing={3} align="stretch">
          {feedbacks.map((feedback) => (
            <Box 
              key={feedback.id}
              bg="gray.700" 
              p={3} 
              borderRadius="md"
              borderLeft="4px solid"
              borderLeftColor="teal.400"
            >
              <Flex justify="space-between" align="start" mb={2}>
                <Text color="teal.300" fontSize="sm" fontWeight="semibold">
                  {feedback.user || 'Anonymous'}
                </Text>
                <Text color="gray.400" fontSize="xs">
                  {formatTimestamp(feedback.timestamp)}
                </Text>
              </Flex>
              <Text color="white" fontSize="sm">
                {feedback.feedback}
              </Text>
            </Box>
          ))}
        </VStack>
      )}
    </Box>
  );
};

export default LiveFeedback;
