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
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Textarea,
  NumberInput,
  NumberInputField,
  HStack,
} from '@chakra-ui/react';
import { FiBookOpen, FiUser, FiSearch, FiLogOut, FiCalendar, FiPlus } from 'react-icons/fi';
import axios from 'axios';
import { auth } from '../../firebase';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const TeacherDashboard = () => {
  // Existing state variables
  const [className, setClassName] = useState('');
  const [meetingDays, setMeetingDays] = useState([]);
  const [meetingStartTime, setMeetingStartTime] = useState('09:00');
  const [meetingEndTime, setMeetingEndTime] = useState('10:00');
  const [inviteCode, setInviteCode] = useState('');
  const [inviteLink, setInviteLink] = useState('');
  const [teacherClasses, setTeacherClasses] = useState([]);
  
  // New state variables for session creation
  const [selectedClassroom, setSelectedClassroom] = useState(null);
  const [sessionDate, setSessionDate] = useState('');
  const [endTime, setEndTime] = useState('');
  const [durationMinutes, setDurationMinutes] = useState(60);
  const [sessionNotes, setSessionNotes] = useState('');
  const [classSessions, setClassSessions] = useState({});
  

  const { 
    isOpen: isSessionModalOpen, 
    onOpen: onSessionModalOpen, 
    onClose: onSessionModalClose 
  } = useDisclosure();
  
  const { 
    isOpen: isClassModalOpen, 
    onOpen: onClassModalOpen, 
    onClose: onClassModalClose 
  } = useDisclosure();
  
  const toast = useToast();
  const user = auth.currentUser;
  const navigate = useNavigate();


  const selectStyles = {
    bg: "gray.700",
    borderColor: "gray.600",
    color: "white",
    _hover: { borderColor: "teal.300" },
    sx: {
      // targeting all option elements within this select
      "& option": {
        background: "gray.800",
        color: "white"
      }
    }
  };

  
  const generateTimeOptions = () => {
    const options = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 15) {
        const hourFormatted = hour.toString().padStart(2, '0');
        const minuteFormatted = minute.toString().padStart(2, '0');
        const time = `${hourFormatted}:${minuteFormatted}`;
        const displayTime = formatDisplayTime(hour, minute);
        options.push({ value: time, label: displayTime });
      }
    }
    return options;
  };

  // Format time for display (12-hour format)
  const formatDisplayTime = (hour, minute) => {
    const period = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    const minuteFormatted = minute.toString().padStart(2, '0');
    return `${hour12}:${minuteFormatted} ${period}`;
  };

  const timeOptions = generateTimeOptions();
  
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

    // Format meeting times
    const formatTime = (time) => {
      const [hours, minutes] = time.split(':');
      const hour = parseInt(hours);
      const period = hour >= 12 ? 'PM' : 'AM';
      const hour12 = hour % 12 || 12;
      return `${hour12}:${minutes} ${period}`;
    };

    const meetingTimes = `${formatTime(meetingStartTime)} - ${formatTime(meetingEndTime)}`;

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
      setMeetingStartTime('09:00');
      setMeetingEndTime('10:00');
      onClassModalClose();
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

  // New function to open modal for creating a session
  const openCreateSessionModal = (classroom) => {
    setSelectedClassroom(classroom);
    
    // Set default date to today
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];
    setSessionDate(formattedDate);
    
    // Set default end time to 1 hour from now
    const endTimeDate = new Date(today.getTime() + 60 * 60000);
    const formattedEndTime = endTimeDate.toISOString().split('.')[0].slice(0, -3);
    setEndTime(formattedEndTime);
    
    setDurationMinutes(60);
    setSessionNotes('');
    onSessionModalOpen();
  };

  // New function to create a classroom session
  const handleCreateSession = async () => {
    if (!selectedClassroom || !sessionDate) {
      toast({
        title: 'Missing information',
        description: 'Please fill in all required fields',
        status: 'warning',
        duration: 4000,
        isClosable: true,
      });
      return;
    }

    try {
      const response = await axios.post('http://localhost:3002/api/teacherActions/createClassroomSession', {
        inviteCode: selectedClassroom.inviteCode,
        sessionDate,
        endTime,
        durationMinutes,
        notes: sessionNotes
      });

      toast({
        title: 'Success!',
        description: 'Classroom session created successfully',
        status: 'success',
        duration: 4000,
        isClosable: true,
      });

      // Refresh the sessions for this classroom
      fetchClassroomSessions(selectedClassroom.inviteCode);
      onSessionModalClose();
    } catch (error) {
      console.error('Error creating session:', error);
      toast({
        title: 'Error',
        description: error.response?.data?.error || 'Failed to create classroom session',
        status: 'error',
        duration: 4000,
        isClosable: true,
      });
    }
  };

  const fetchClassroomSessions = async (classroomId) => {
    try {
      const response = await axios.get(`http://localhost:3002/api/teacherActions/getClassroomSessions/${classroomId}`);
      setClassSessions(prev => ({
        ...prev,
        [classroomId]: response.data
      }));
    } catch (error) {
      console.error('Error fetching classroom sessions:', error);
      toast({
        title: 'Error',
        description: 'Could not fetch classroom sessions',
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
        
        // fetching sessions for each classroom
        response.data.forEach(classroom => {
          fetchClassroomSessions(classroom.inviteCode);
        });
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


  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  return (
    <Box minH="100vh" bg="black" color="white" py={10}>
   
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

      {/* create Class Button */}
      <Container maxW="container.md">
        <Flex justify="flex-end" mb={4}>
          <Button 
            colorScheme="teal" 
            leftIcon={<FiPlus />}
            onClick={onClassModalOpen}
          >
            Create New Class
          </Button>
        </Flex>
      </Container>

      <Container maxW="container.md" mt={2}>
        <Heading size="md" mb={4} color="gray.100">Your Classes</Heading>

        {teacherClasses.length === 0 ? (
          <Text color="gray.400">No classes created yet. Click 'Create New Class' to get started.</Text>
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
              
             
              <Button
                mt={4}
                colorScheme="teal"
                size="sm"
                leftIcon={<FiCalendar />}
                onClick={() => openCreateSessionModal(classroom)}
              >
                Create Session
              </Button>
              
              
              {classSessions[classroom.inviteCode] && classSessions[classroom.inviteCode].length > 0 && (
                <Box mt={4}>
                  <Text fontWeight="bold" fontSize="sm" color="gray.300">Upcoming Sessions:</Text>
                  {classSessions[classroom.inviteCode].map((session) => (
                    <Box 
                      key={session._id} 
                      p={2} 
                      mt={2} 
                      borderRadius="md" 
                      bg="gray.700"
                      fontSize="sm"
                    >
                      <Text color="teal.200">Date: {formatDate(session.sessionDate)}</Text>
                      {session.endTime && <Text color="gray.300">End: {formatDate(session.endTime)}</Text>}
                      <Text color="gray.300">Duration: {session.durationMinutes} minutes</Text>
                      <Text color="gray.300">Status: {session.isOpen ? 'Open' : 'Closed'}</Text>
                      {session.notes && <Text color="gray.400">Notes: {session.notes}</Text>}
                    </Box>
                  ))}
                </Box>
              )}
            </Box>
          ))
        )}
      </Container>

      {/* creating a classroom */}
      <Modal isOpen={isClassModalOpen} onClose={onClassModalClose}>
        <ModalOverlay />
        <ModalContent bg="gray.800" color="white">
          <ModalHeader>Create New Classroom</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl mb={4}>
              <FormLabel>Class Name</FormLabel>
              <Input 
                placeholder="Enter class name"
                value={className}
                onChange={(e) => setClassName(e.target.value)}
                bg="gray.700"
                borderColor="gray.600"
              />
            </FormControl>
            
            <FormControl mb={4}>
              <FormLabel>Meeting Days</FormLabel>
              <CheckboxGroup 
                colorScheme="teal" 
                value={meetingDays}
                onChange={setMeetingDays}
              >
                <Stack spacing={2} direction="row" flexWrap="wrap">
                  <Checkbox value="Monday">Monday</Checkbox>
                  <Checkbox value="Tuesday">Tuesday</Checkbox>
                  <Checkbox value="Wednesday">Wednesday</Checkbox>
                  <Checkbox value="Thursday">Thursday</Checkbox>
                  <Checkbox value="Friday">Friday</Checkbox>
                  <Checkbox value="Saturday">Saturday</Checkbox>
                  <Checkbox value="Sunday">Sunday</Checkbox>
                </Stack>
              </CheckboxGroup>
            </FormControl>
            
            <FormControl mb={4}>
              <FormLabel>Meeting Times</FormLabel>
              <HStack spacing={2} align="center">
                <Select
                  value={meetingStartTime}
                  onChange={(e) => setMeetingStartTime(e.target.value)}
                  {...selectStyles}
                >
                  {timeOptions.map((option) => (
                    <option key={option.value} value={option.value} style={{backgroundColor: '#2D3748', color: 'white'}}>
                      {option.label}
                    </option>
                  ))}
                </Select>
                <Text>to</Text>
                <Select
                  value={meetingEndTime}
                  onChange={(e) => setMeetingEndTime(e.target.value)}
                  {...selectStyles}
                >
                  {timeOptions.map((option) => (
                    <option key={option.value} value={option.value} style={{backgroundColor: '#2D3748', color: 'white'}}>
                      {option.label}
                    </option>
                  ))}
                </Select>
              </HStack>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClassModalClose}>
              Cancel
            </Button>
            <Button colorScheme="teal" onClick={handleCreateClass}>
              Create Class
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Modal for creating classroom session */}
      <Modal isOpen={isSessionModalOpen} onClose={onSessionModalClose}>
        <ModalOverlay />
        <ModalContent bg="gray.800" color="white">
          <ModalHeader>Create Classroom Session</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedClassroom && (
              <Text mb={4}>Creating session for: <b>{selectedClassroom.className}</b></Text>
            )}
            
            <FormControl mb={4}>
              <FormLabel>Session Date</FormLabel>
              <Input 
                type="datetime-local" 
                value={sessionDate}
                onChange={(e) => setSessionDate(e.target.value)}
                bg="gray.700"
                borderColor="gray.600"
              />
            </FormControl>
            
            <FormControl mb={4}>
              <FormLabel>End Time</FormLabel>
              <Input 
                type="datetime-local" 
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                bg="gray.700"
                borderColor="gray.600"
              />
            </FormControl>
            
            <FormControl mb={4}>
              <FormLabel>Duration (minutes)</FormLabel>
              <NumberInput 
                min={15} 
                max={240} 
                value={durationMinutes}
                onChange={(value) => setDurationMinutes(parseInt(value))}
                bg="gray.700"
                borderColor="gray.600"
              >
                <NumberInputField bg="gray.700" />
              </NumberInput>
            </FormControl>
            
            <FormControl mb={4}>
              <FormLabel>Session Notes</FormLabel>
              <Textarea 
                placeholder="Add any notes for this session"
                value={sessionNotes}
                onChange={(e) => setSessionNotes(e.target.value)}
                bg="gray.700"
                borderColor="gray.600"
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onSessionModalClose}>
              Cancel
            </Button>
            <Button colorScheme="teal" onClick={handleCreateSession}>
              Create Session
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default TeacherDashboard;