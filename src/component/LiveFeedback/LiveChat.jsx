import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import {
  Box,
  VStack,
  HStack,
  Text,
  Input,
  Button,
  Badge,
  Flex,
  Heading,
  Avatar,
  InputGroup,
  InputRightElement
} from '@chakra-ui/react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase';
import { BiSend } from 'react-icons/bi';

const socket = io(process.env.REACT_APP_BACKEND_URL || 'http://localhost:3002');

const LiveChat = ({ sessionId, userRole = 'student' }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [connected, setConnected] = useState(false);
  const [submission, setSubmission] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [user] = useAuthState(auth);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (!sessionId) return;

    // Join the session room
    socket.emit('joinSession', sessionId);
    setConnected(true);

    // Listen for new messages
    socket.on('newMessage', (data) => {
      setMessages(prev => [...prev, data]);
    });

    // Listen for announcements (teacher only)
    socket.on('newAnnouncement', (data) => {
      setMessages(prev => [...prev, { ...data, isAnnouncement: true }]);
    });

    // Handle connection status
    socket.on('connect', () => {
      console.log('Connected to chat server');
      setConnected(true);
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from chat server');
      setConnected(false);
    });

    // Load existing messages
    loadExistingMessages();

    // Cleanup on unmount
    return () => {
      socket.emit('leaveSession', sessionId);
      socket.off('newMessage');
      socket.off('newAnnouncement');
      socket.off('connect');
      socket.off('disconnect');
    };
  }, [sessionId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const loadExistingMessages = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL || 'http://localhost:3002'}/api/teacherActions/getSessionMessages/${sessionId}`
      );
      if (response.ok) {
        const data = await response.json();
        setMessages(data.messages || []);
      }
    } catch (error) {
      console.error('Error loading messages:', error);
    }
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !connected) return;

    const messageData = {
      sessionId,
      message: newMessage,
      user: user?.email || 'Anonymous',
      role: userRole,
      timestamp: new Date(),
      type: 'chat'
    };

    try {
      // Send via API for persistence
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL || 'http://localhost:3002'}/api/teacherActions/sendMessage`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...messageData, classroomId: sessionId })
        }
      );

      if (response.ok) {
        // Also emit via Socket.IO for real-time updates
        socket.emit('sendMessage', messageData);
        setNewMessage('');
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  // Submission logic
  const handleSendSubmission = async () => {
    if (!submission.trim() || !connected) return;
    setIsSubmitting(true);
    const submissionData = {
      sessionId,
      message: submission,
      user: user?.email || 'Anonymous',
      role: userRole,
      timestamp: new Date(),
      type: 'submission'
    };
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL || 'http://localhost:3002'}/api/teacherActions/sendMessage`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...submissionData, classroomId: sessionId })
        }
      );
      if (response.ok) {
        socket.emit('sendMessage', submissionData);
        setSubmission('');
      }
    } catch (error) {
      console.error('Error sending submission:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getUserDisplayName = (email) => {
    if (!email) return 'Anonymous';
    return email.split('@')[0];
  };

  const getRoleColor = (role) => {
    return role === 'teacher' ? 'blue.400' : 'green.400';
  };

  return (
    <Box 
      bg="gray.800" 
      borderRadius="lg"
      border="1px solid"
      borderColor="gray.600"
      height="500px"
      display="flex"
      flexDirection="column"
      minHeight="400px"
      maxHeight="500px"
      overflow="hidden"
    >
      {/* Header */}
      <Flex justify="space-between" align="center" p={4} borderBottom="1px solid" borderColor="gray.600">
        <Heading size="md" color="white">Live Chat</Heading>
        <Badge 
          colorScheme={connected ? 'green' : 'red'} 
          variant="solid"
        >
          {connected ? 'Connected' : 'Disconnected'}
        </Badge>
      </Flex>

      {/* Messages */}
      <Box 
        flex="1" 
        overflowY="auto" 
        p={4}
        minHeight="0"
        css={{
          '&::-webkit-scrollbar': {
            width: '4px',
          },
          '&::-webkit-scrollbar-track': {
            width: '6px',
          },
          '&::-webkit-scrollbar-thumb': {
            background: '#4A5568',
            borderRadius: '24px',
          },
        }}
      >
        {messages.length === 0 ? (
          <Text color="gray.400" textAlign="center" py={8}>
            No messages yet. Start the conversation!
          </Text>
        ) : (
          <VStack spacing={3} align="stretch">
            {messages.map((message, index) => (
              <Box key={message.id || index}>
                {message.isAnnouncement ? (
                  <Box
                    bg="orange.900"
                    p={3}
                    borderRadius="md"
                    border="1px solid"
                    borderColor="orange.500"
                  >
                    <HStack>
                      <Badge colorScheme="orange" variant="solid" fontSize="xs">
                        ANNOUNCEMENT
                      </Badge>
                      <Text color="gray.300" fontSize="xs">
                        {formatTimestamp(message.timestamp)}
                      </Text>
                    </HStack>
                    <Text color="white" mt={2} fontWeight="semibold">
                      {message.announcement || message.message}
                    </Text>
                  </Box>
                ) : message.type === 'submission' ? (
                  <Box
                    bg="teal.900"
                    p={3}
                    borderRadius="md"
                    border="1px solid"
                    borderColor="teal.400"
                  >
                    <HStack>
                      <Badge colorScheme="teal" variant="solid" fontSize="xs">
                        SUBMISSION
                      </Badge>
                      <Text color="gray.300" fontSize="xs">
                        {formatTimestamp(message.timestamp)}
                      </Text>
                    </HStack>
                    <Text color="white" mt={2} fontWeight="semibold">
                      {message.message}
                    </Text>
                  </Box>
                ) : (
                  <HStack align="start" spacing={3}>
                    <Avatar 
                      size="sm" 
                      name={getUserDisplayName(message.user)}
                      bg={getRoleColor(message.role)}
                    />
                    <Box flex="1">
                      <HStack spacing={2} mb={1}>
                        <Text 
                          color={getRoleColor(message.role)} 
                          fontSize="sm" 
                          fontWeight="semibold"
                        >
                          {getUserDisplayName(message.user)}
                        </Text>
                        <Badge 
                          size="sm" 
                          colorScheme={message.role === 'teacher' ? 'blue' : 'green'}
                          variant="subtle"
                        >
                          {message.role}
                        </Badge>
                        <Text color="gray.400" fontSize="xs">
                          {formatTimestamp(message.timestamp)}
                        </Text>
                      </HStack>
                      <Text color="white" fontSize="sm">
                        {message.message}
                      </Text>
                    </Box>
                  </HStack>
                )}
              </Box>
            ))}
            <div ref={messagesEndRef} />
          </VStack>
        )}
      </Box>

      {/* Message Input */}
      <Box p={4} borderTop="1px solid" borderColor="gray.600" bg="gray.800" zIndex={1}>
        <VStack spacing={3} align="stretch" mb={0}>
          <InputGroup>
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type a message..."
              bg="gray.700"
              borderColor="gray.600"
              color="white"
              _placeholder={{ color: 'gray.400' }}
              _hover={{ borderColor: 'teal.500' }}
              _focus={{ borderColor: 'teal.500', boxShadow: '0 0 0 1px teal' }}
              disabled={!user}
            />
            <InputRightElement>
              <Button
                size="sm"
                colorScheme="teal"
                onClick={handleSendMessage}
                disabled={!user || !newMessage.trim()}
                leftIcon={<BiSend />}
              >
                Send
              </Button>
            </InputRightElement>
          </InputGroup>
          {/* Submission input */}
          <InputGroup>
            <Input
              value={submission}
              onChange={(e) => setSubmission(e.target.value)}
              placeholder="Post a feedback submission..."
              bg="gray.700"
              borderColor="gray.600"
              color="white"
              _placeholder={{ color: 'gray.400' }}
              _hover={{ borderColor: 'teal.400' }}
              _focus={{ borderColor: 'teal.400', boxShadow: '0 0 0 1px teal' }}
              disabled={!user || isSubmitting}
              maxLength={500}
            />
            <InputRightElement>
              <Button
                size="sm"
                colorScheme="teal"
                onClick={handleSendSubmission}
                isLoading={isSubmitting}
                loadingText="Posting..."
                disabled={!user || !submission.trim() || isSubmitting}
              >
                Submit
              </Button>
            </InputRightElement>
          </InputGroup>
        </VStack>
      </Box>
    </Box>
  );
};

export default LiveChat;