import React, { useState } from 'react';
import {
  Box,
  Button,
  Heading,
  Input,
  Text,
  Code,
  useToast,
  FormControl,
  FormLabel,
  Container,
  Flex,
  Icon,
} from '@chakra-ui/react';
import { FiBookOpen, FiUser, FiSearch, FiLogOut } from 'react-icons/fi';
import axios from 'axios';
import { auth } from '../../firebase';

const TeacherDashboard = () => {
  const [className, setClassName] = useState('');
  const [meetingDays, setMeetingDays] = useState('');
  const [meetingTimes, setMeetingTimes] = useState('');
  const [inviteCode, setInviteCode] = useState('');
  const [inviteLink, setInviteLink] = useState('');
  const toast = useToast();
  const user = auth.currentUser;

  const handleCreateClass = async () => {
    if (!user) {
      toast({
        title: 'Authentication error',
        description: 'You must be logged in to create a class',
        status: 'error',
        duration: 4000,
        isClosable: true,
      });
      return;
    }

    try {
      const response = await axios.post('http://localhost:3002/api/teacherActions/createClassroom', {
        teacherName: user.displayName || 'Teacher',
        ownerTeacherEmail: user.email,
        meetingDays,
        meetingTimes,
      });

      setInviteCode(response.data.classroom.inviteCode);
      setInviteLink(response.data.inviteLink);

      toast({
        title: 'Class created!',
        description: 'Invite link generated successfully.',
        status: 'success',
        duration: 4000,
        isClosable: true,
      });

      setClassName('');
      setMeetingDays('');
      setMeetingTimes('');
    } catch (error) {
      console.error('Error creating classroom:', error);
      toast({
        title: 'Error',
        description: error.response?.data?.error || 'Failed to create classroom',
        status: 'error',
        duration: 4000,
        isClosable: true,
      });
    }
  };

  return (
    <Box minH="100vh" bg="black" color="white" py={10}>
      {/* Top Header */}
      <Container centerContent mb={10}>
        <Flex justify="space-between" align="center" w="full" maxW="container.lg" px={4}>
          <Heading as="h2" size="lg" color="gray.100">Welcome to the Dashboard</Heading>
          <Button
            rightIcon={<FiLogOut />}
            colorScheme="red"
            variant="outline"
            size="sm"
            onClick={() => auth.signOut()}
          >
            Sign Out
          </Button>
        </Flex>
        <Text mt={2} color="gray.400">Choose your section to get started:</Text>
      </Container>

      {/* Dashboard Tabs */}
      <Flex justify="center" gap={6} mb={12} wrap="wrap">
        <Button leftIcon={<FiBookOpen />} colorScheme="whiteAlpha" variant="outline" size="lg">
          Student Dashboard
        </Button>
        <Button leftIcon={<FiUser />} colorScheme="whiteAlpha" variant="outline" size="lg">
          Profile
        </Button>
        <Button leftIcon={<FiSearch />} colorScheme="whiteAlpha" variant="outline" size="lg">
          Search
        </Button>
      </Flex>

      {/* Class Creation Section */}
      <Container
        maxW="container.md"
        bg="gray.900"
        borderRadius="lg"
        p={8}
        boxShadow="xl"
        border="1px solid rgba(255,255,255,0.1)"
      >
        <Heading size="md" mb={4} color="gray.100">Create a Class</Heading>

        <FormControl mb={4}>
          <FormLabel color="gray.300">Class Name</FormLabel>
          <Input
            value={className}
            placeholder="Enter class name"
            onChange={(e) => setClassName(e.target.value)}
            bg="gray.800"
            borderColor="gray.600"
            color="white"
          />
        </FormControl>

        <FormControl mb={4}>
          <FormLabel color="gray.300">Meeting Days</FormLabel>
          <Input
            value={meetingDays}
            placeholder="e.g. Monday, Wednesday"
            onChange={(e) => setMeetingDays(e.target.value)}
            bg="gray.800"
            borderColor="gray.600"
            color="white"
          />
        </FormControl>

        <FormControl mb={6}>
          <FormLabel color="gray.300">Meeting Times</FormLabel>
          <Input
            value={meetingTimes}
            placeholder="e.g. 2:00-3:30 PM"
            onChange={(e) => setMeetingTimes(e.target.value)}
            bg="gray.800"
            borderColor="gray.600"
            color="white"
          />
        </FormControl>

        <Button
          colorScheme="teal"
          onClick={handleCreateClass}
          isDisabled={!className || !meetingDays || !meetingTimes}
          width="full"
          mb={6}
        >
          Create Class
        </Button>

        {inviteCode && (
          <Box p={4} borderRadius="md" bg="gray.800" borderColor="gray.700" borderWidth="1px">
            <Text fontWeight="bold" color="gray.100" mb={2}>Invite Link:</Text>
            <Code color="teal.300" whiteSpace="pre-wrap">{inviteLink}</Code>
            <Text fontSize="sm" mt={2} color="gray.500">Share this link with students to join the class.</Text>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default TeacherDashboard;
