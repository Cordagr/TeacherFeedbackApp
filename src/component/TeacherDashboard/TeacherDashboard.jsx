import React, { useState, useEffect } from 'react';
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
  Checkbox,
  CheckboxGroup,
  Stack,
  Select,
} from '@chakra-ui/react';
import { FiBookOpen, FiUser, FiSearch, FiLogOut } from 'react-icons/fi';
import axios from 'axios';
import { auth } from '../../firebase';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const TeacherDashboard = () => {
  const [className, setClassName] = useState('');
  const [meetingDays, setMeetingDays] = useState([]);
  const [meetingTimes, setMeetingTimes] = useState('');
  const [inviteCode, setInviteCode] = useState('');
  const [inviteLink, setInviteLink] = useState('');
  const [teacherClasses, setTeacherClasses] = useState([]);
  const toast = useToast();
  const user = auth.currentUser;
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

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
        className: className,
        meetingDays: meetingDays.join(', '),
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
      setMeetingDays([]);
      setMeetingTimes('');
      fetchTeacherClasses(); // refresh class list
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

  const fetchTeacherClasses = async () => {
    if (user?.email) {
      try {
        const response = await axios.get(`http://localhost:3002/api/teacherActions/getTeacherClassrooms/${user.email}`);
        setTeacherClasses(response.data);
      } catch (error) {
        console.error('Error fetching classrooms:', error);
        toast({
          title: 'Error loading classrooms',
          description: 'Could not fetch your classes.',
          status: 'error',
          duration: 4000,
          isClosable: true,
        });
      }
    }
  };

  useEffect(() => {
    fetchTeacherClasses();
  }, [user?.email]);

  return (
    <Box minH="100vh" bg="black" color="white" py={10}>
      {/* Header */}
      <Container centerContent mb={10}>
        <Flex justify="space-between" align="center" w="full" maxW="container.lg" px={4}>
          <Heading as="h2" size="lg" color="gray.100">Welcome to the Dashboard</Heading>
          <Button
            rightIcon={<FiLogOut />}
            variant="outline"
            borderColor="red.500"
            color="red.400"
            _hover={{ bg: "rgba(229, 62, 62, 0.15)" }}
            size="sm"
            onClick={handleSignOut}
          >
            Sign Out
          </Button>
        </Flex>
        <Text mt={2} color="gray.400">Choose your section to get started:</Text>
      </Container>

     
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
          <CheckboxGroup
            colorScheme="teal"
            value={meetingDays}
            onChange={(values) => setMeetingDays(values)}
          >
            <Stack spacing={2} direction="column">
              <Checkbox value="Monday">Monday</Checkbox>
              <Checkbox value="Tuesday">Tuesday</Checkbox>
              <Checkbox value="Wednesday">Wednesday</Checkbox>
              <Checkbox value="Thursday">Thursday</Checkbox>
              <Checkbox value="Friday">Friday</Checkbox>
            </Stack>
          </CheckboxGroup>
        </FormControl>

        <FormControl mb={6}>
          <FormLabel color="gray.300">Meeting Times</FormLabel>
          <Select
            placeholder="Select meeting time"
            value={meetingTimes}
            onChange={(e) => setMeetingTimes(e.target.value)}
            bg="gray.800"
            borderColor="gray.600"
            color="white"
            _placeholder={{ color: 'gray.500' }}
            _hover={{ borderColor: 'teal.300' }}
            _focus={{ borderColor: 'teal.500', boxShadow: '0 0 0 1px teal.500' }}
          >
            <option style={{ backgroundColor: '#2D3748', color: 'white' }} value="8:00 - 9:30 AM">8:00 - 9:30 AM</option>
            <option style={{ backgroundColor: '#2D3748', color: 'white' }} value="10:00 - 11:30 AM">10:00 - 11:30 AM</option>
            <option style={{ backgroundColor: '#2D3748', color: 'white' }} value="1:00 - 2:30 PM">1:00 - 2:30 PM</option>
            <option style={{ backgroundColor: '#2D3748', color: 'white' }} value="3:00 - 4:30 PM">3:00 - 4:30 PM</option>
          </Select>
        </FormControl>

        <Button
          colorScheme="teal"
          onClick={handleCreateClass}
          isDisabled={!className || meetingDays.length === 0 || !meetingTimes}
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

      
      <Container maxW="container.md" mt={10}>
        <Heading size="md" mb={4} color="gray.100">Your Classes</Heading>

        {teacherClasses.length === 0 ? (
          <Text color="gray.400">No classes created yet.</Text>
        ) : (
          teacherClasses.map((classroom) => (
            <Box
              key={classroom._id}
              p={4}
              mb={4}
              borderRadius="md"
              bg="gray.800"
              border="1px solid rgba(255,255,255,0.1)"
            >
              <Text fontWeight="bold" fontSize="lg" color="teal.300">{classroom.className}</Text>
              <Text color="gray.400">Invite Code: <Code color="green.300">{classroom.inviteCode}</Code></Text>
              <Text color="gray.500" fontSize="sm">Meeting: {classroom.meetingDays} @ {classroom.meetingTimes}</Text>
            </Box>
          ))
        )}
      </Container>
    </Box>
  );
};

export default TeacherDashboard;
