import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { 
  Box, 
  Textarea, 
  Button, 
  VStack, 
  FormControl,
  FormLabel,
  useToast,
  Badge,
  Flex,
  Heading
} from '@chakra-ui/react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase';

const socket = io(process.env.REACT_APP_BACKEND_URL || 'http://localhost:3002');

const LiveFeedbackSubmission = ({ sessionId, isAnonymous = true }) => {
  const [feedback, setFeedback] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [connected, setConnected] = useState(false);
  const [user] = useAuthState(auth);
  const toast = useToast();

  useEffect(() => {
    if (!sessionId) return;

    // Join the session room
    socket.emit('joinSession', sessionId);
    setConnected(true);

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
      socket.off('connect');
      socket.off('disconnect');
    };
  }, [sessionId]);

  const handleSubmit = async () => {
    if (!feedback.trim()) {
      toast({
        title: 'Error',
        description: 'Please enter some feedback',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Submit via API for persistence
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL || 'http://localhost:3002'}/api/teacherActions/postAnonymousFeedback`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          classroomId: sessionId, 
          feedback,
          user: isAnonymous ? 'Anonymous' : (user?.email || 'Anonymous')
        })
      });

      if (response.ok) {
        // Also emit via Socket.IO for real-time updates
        socket.emit('submitFeedback', {
          sessionId,
          feedback,
          user: isAnonymous ? 'Anonymous' : (user?.email || 'Anonymous'),
          timestamp: new Date()
        });

        setFeedback('');
        toast({
          title: 'Success',
          description: 'Feedback submitted successfully',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      } else {
        throw new Error('Failed to submit feedback');
      }
    } catch (error) {
      console.error('Error submitting feedback:', error);
      toast({
        title: 'Error',
        description: 'Failed to submit feedback',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box 
      bg="gray.800" 
      p={4} 
      borderRadius="lg"
      border="1px solid"
      borderColor="gray.600"
    >
      <Flex justify="space-between" align="center" mb={4}>
        <Heading size="md" color="white">Submit Feedback</Heading>
        <Badge 
          colorScheme={connected ? 'green' : 'red'} 
          variant="solid"
        >
          {connected ? 'Connected' : 'Disconnected'}
        </Badge>
      </Flex>
      
      <VStack spacing={4}>
        <FormControl>
          <FormLabel color="gray.300">Your Feedback</FormLabel>
          <Textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Share your thoughts about this class..."
            bg="gray.700"
            borderColor="gray.600"
            color="white"
            _placeholder={{ color: 'gray.400' }}
            _hover={{ borderColor: 'teal.500' }}
            _focus={{ borderColor: 'teal.500', boxShadow: '0 0 0 1px teal' }}
            rows={4}
            maxLength={500}
          />
        </FormControl>
        
        <Button 
          colorScheme="teal" 
          onClick={handleSubmit}
          isLoading={isSubmitting}
          loadingText="Submitting..."
          disabled={!connected || !feedback.trim()}
          w="full"
        >
          Submit {isAnonymous ? 'Anonymous ' : ''}Feedback
        </Button>
      </VStack>
    </Box>
  );
};

export default LiveFeedbackSubmission;
  