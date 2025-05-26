import React, { useState, useEffect, useRef } from 'react';
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
  Badge,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from '@chakra-ui/react';
import { FiBookOpen, FiUser, FiSearch, FiLogOut, FiCalendar, FiPlus, FiPaperclip, FiFile } from 'react-icons/fi';
import axios from 'axios';
import { auth } from '../../firebase';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const TeacherDashboard = () => {
  
  const [className, setClassName] = useState('');
  const [meetingDays, setMeetingDays] = useState([]);
  const [meetingStartTime, setMeetingStartTime] = useState('09:00');
  const [meetingEndTime, setMeetingEndTime] = useState('10:00');
  const [inviteCode, setInviteCode] = useState('');
  const [inviteLink, setInviteLink] = useState('');
  const [teacherClasses, setTeacherClasses] = useState([]);
  
  const [selectedClassroom, setSelectedClassroom] = useState(null);
  const [sessionDate, setSessionDate] = useState('');
  const [endTime, setEndTime] = useState('');
  const [durationMinutes, setDurationMinutes] = useState(60);
  const [sessionNotes, setSessionNotes] = useState('');
  const [classSessions, setClassSessions] = useState({});
  const [selectedSession, setSelectedSession] = useState(null);
  const [attachmentFile, setAttachmentFile] = useState(null);
  const [activeTab, setActiveTab] = useState({});
  

  const fileInputRef = useRef(null);

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
  
  const {
    isOpen: isAttachmentModalOpen,
    onOpen: onAttachmentModalOpen,
    onClose: onAttachmentModalClose
  } = useDisclosure();
  
  const toast = useToast();
  const user = auth.currentUser;
  const navigate = useNavigate();

  // Initialize active tabs
  useEffect(() => {
    const newTabs = {};
    teacherClasses.forEach(classroom => {
      newTabs[classroom.inviteCode] = 'upcoming';
    });
    setActiveTab(newTabs);
  }, [teacherClasses]);

  const selectStyles = {
    bg: "gray.700",
    borderColor: "gray.600",
    color: "white",
    _hover: { borderColor: "teal.300" },
    sx: {
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

  
  const openCreateSessionModal = (classroom) => {
    setSelectedClassroom(classroom);
    
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];
    setSessionDate(formattedDate);
    
    const endTimeDate = new Date(today.getTime() + 60 * 60000);
    const formattedEndTime = endTimeDate.toISOString().split('.')[0].slice(0, -3);
    setEndTime(formattedEndTime);
    
    setDurationMinutes(60);
    setSessionNotes('');
    onSessionModalOpen();
  };

  
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
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/teacherActions/createClassroomSession`, {
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
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/teacherActions/getClassroomSessions/${classroomId}`);
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
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/teacherActions/getTeacherClassrooms/${user.email}`);
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

  const openAttachmentModal = (classroom, session) => {
    setSelectedClassroom(classroom);
    setSelectedSession(session);
    setAttachmentFile(null);
    onAttachmentModalOpen();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type !== 'application/pdf') {
        toast({
          title: 'Invalid file type',
          description: 'Only PDF files are allowed',
          status: 'error',
          duration: 4000,
          isClosable: true,
        });
        return;
      }
      setAttachmentFile(file);
    }
  };

  const handleUploadAttachment = async () => {
    if (!attachmentFile || !selectedClassroom) {
      toast({
        title: 'Missing information',
        description: 'Please select a PDF file to upload',
        status: 'warning',
        duration: 4000,
        isClosable: true,
      });
      return;
    }

    try {
      const formData = new FormData();
      formData.append('attachment', attachmentFile);
      formData.append('classroomId', selectedClassroom.inviteCode);

      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/teacherActions/attachTeacherAttachment`, 
        formData, 
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      toast({
        title: 'Success!',
        description: 'PDF attachment uploaded successfully',
        status: 'success',
        duration: 4000,
        isClosable: true,
      });

      // Refresh the sessions for this classroom
      fetchClassroomSessions(selectedClassroom.inviteCode);
      onAttachmentModalClose();
    } catch (error) {
      console.error('Error uploading attachment:', error);
      toast({
        title: 'Error',
        description: error.response?.data?.error || 'Failed to upload attachment',
        status: 'error',
        duration: 4000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    fetchTeacherClasses();
  }, [user?.email]);
  
  const handleTabChange = (classCode, tab) => {
    setActiveTab(prev => ({
      ...prev,
      [classCode]: tab
    }));
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  // Convert to simpler date format for display
  const formatSimpleDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return `${(date.getMonth() + 1)}/${date.getDate()}/${date.getFullYear()}`;
  };

  // Format time for better display
  const formatTimeDisplay = (timeString) => {
    if (!timeString) return '';
    try {
      const date = new Date(timeString);
      let hours = date.getHours();
      const minutes = date.getMinutes().toString().padStart(2, '0');
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      return `${hours}:${minutes} ${ampm}`;
    } catch (error) {
      return timeString; // fallback to original if parsing fails
    }
  };

  return (
    <Box minH="100vh" bg="#0e1525" color="white">
      {/* Header */}
      <Flex justify="space-between" align="center" p={4} borderBottom="1px solid" borderColor="gray.800">
        <Heading as="h2" size="lg">Teacher Dashboard</Heading>
        <Button
          rightIcon={<FiLogOut />}
          colorScheme="red"
          variant="solid"
          size="sm"
          onClick={handleSignOut}
        >
          Sign Out
        </Button>
      </Flex>

      {/* Navigation Help Text */}
      <Text textAlign="center" color="gray.400" py={4}>
        Choose your section to get started:
      </Text>

      {/* Navigation Buttons */}
      <Flex justify="center" gap={2} mb={8}>
        <Button leftIcon={<FiBookOpen />} variant="outline" colorScheme="whiteAlpha">
          Student Dashboard
        </Button>
        <Button leftIcon={<FiUser />} variant="outline" colorScheme="whiteAlpha">
          Profile
        </Button>
        <Button leftIcon={<FiSearch />} variant="outline" colorScheme="whiteAlpha">
          Search
        </Button>
      </Flex>

      {/* Main Content */}
      <Container maxW="container.lg" px={4}>
        <Flex justify="space-between" align="center" mb={6}>
          <Heading size="md">Your Classes</Heading>
          <Button 
            colorScheme="teal" 
            leftIcon={<FiPlus />}
            onClick={onClassModalOpen}
          >
            Create New Class
          </Button>
        </Flex>

        {/* Classes Grid */}
        <Box mt={4}>
          {teacherClasses.length === 0 ? (
            <Text color="gray.400" textAlign="center" py={8}>
              No classes created yet. Click 'Create New Class' to get started.
            </Text>
          ) : (
            <Flex flexWrap="wrap" justify="space-between" gap={4}>
              {teacherClasses.map((classroom) => (
                <Box 
                  key={classroom.inviteCode}
                  width={["100%", "100%", "48%"]}
                  mb={4}
                  borderRadius="md"
                  bg="#1c2333"
                  border="1px solid"
                  borderColor="gray.700"
                  overflow="hidden"
                >
                  {/* Class Header */}
                  <Box p={4} borderBottom="1px solid" borderColor="gray.700">
                    <Text fontWeight="bold" mb={1}>{classroom.className || `Class ${classroom.inviteCode}`}</Text>
                    <Flex fontSize="sm" color="gray.400" mb={1}>
                      <Text mr={1}>Invite Code:</Text>
                      <Code colorScheme="green" px={2} borderRadius="md" fontSize="xs">{classroom.inviteCode}</Code>
                    </Flex>
                    <Text fontSize="sm" color="gray.400">
                      Meeting: {classroom.meetingDays} {classroom.meetingTimes}
                    </Text>
                  </Box>

                  {/* Class Sessions Content */}
                  <Box>
                    <Flex borderBottom="1px solid" borderColor="gray.700">
                      <Box 
                        flex="1" 
                        textAlign="center" 
                        py={2} 
                        cursor="pointer"
                        borderBottom={activeTab[classroom.inviteCode] === 'upcoming' ? "2px solid" : "none"}
                        borderColor="teal.500"
                        color={activeTab[classroom.inviteCode] === 'upcoming' ? "white" : "gray.400"}
                        onClick={() => handleTabChange(classroom.inviteCode, 'upcoming')}
                      >
                        Upcoming Sessions
                      </Box>
                      <Box 
                        flex="1" 
                        textAlign="center" 
                        py={2} 
                        cursor="pointer"
                        borderBottom={activeTab[classroom.inviteCode] === 'past' ? "2px solid" : "none"}
                        borderColor="teal.500"
                        color={activeTab[classroom.inviteCode] === 'past' ? "white" : "gray.400"}
                        onClick={() => handleTabChange(classroom.inviteCode, 'past')}
                      >
                        Past Sessions
                      </Box>
                    </Flex>

                    {/* Sessions List */}
                    <Box maxH="280px" overflowY="auto">
                      {classSessions[classroom.inviteCode] && classSessions[classroom.inviteCode].length > 0 ? (
                        classSessions[classroom.inviteCode].map((session) => (
                          <Box 
                            key={session._id}
                            p={3}
                            borderBottom="1px solid" 
                            borderColor="gray.700"
                            _hover={{ bg: "#252e3f" }}
                          >
                            <Flex align="center" color="teal.300" mb={1}>
                              <Icon as={FiCalendar} mr={2} />
                              <Text fontSize="sm">{formatSimpleDate(session.sessionDate)}</Text>
                            </Flex>
                            
                            <Flex justify="space-between" fontSize="sm">
                              <Text>Start: {formatTimeDisplay(session.sessionDate)}</Text>
                              <Text>End: {formatTimeDisplay(session.endTime)}</Text>
                            </Flex>
                            
                            <Flex justify="space-between" align="center" mt={2}>
                              <Text fontSize="xs" color="gray.400">Duration: {session.durationMinutes} minutes</Text>
                              <Badge colorScheme="green" fontSize="xs">SCHEDULED</Badge>
                            </Flex>
                            
                            <Flex mt={3} justify="space-between" align="center">
                              <Button
                                size="xs"
                                leftIcon={<FiPaperclip />}
                                colorScheme="teal"
                                variant="outline"
                                onClick={() => openAttachmentModal(classroom, session)}
                              >
                                Add Attachment
                              </Button>
                              
                              {session.attachments && session.attachments.length > 0 && (
                                <Flex align="center" color="blue.300" fontSize="xs">
                                  <Icon as={FiFile} mr={1} />
                                  <Text>{session.attachments.length} attachment{session.attachments.length !== 1 ? 's' : ''}</Text>
                                </Flex>
                              )}
                            </Flex>
                          </Box>
                        ))
                      ) : (
                        <Box p={4} textAlign="center" color="gray.500">
                          No {activeTab[classroom.inviteCode]} sessions scheduled
                        </Box>
                      )}
                    </Box>
                    
                    {/* Create Session Button */}
                    <Box p={3} borderTop="1px solid" borderColor="gray.700">
                      <Button
                        size="sm"
                        width="full"
                        colorScheme="teal"
                        leftIcon={<FiCalendar />}
                        onClick={() => openCreateSessionModal(classroom)}
                      >
                        Create Session
                      </Button>
                    </Box>
                  </Box>
                </Box>
              ))}
            </Flex>
          )}
        </Box>
      </Container>

      {/* Create Class Modal */}
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

      {/* Create Session Modal */}
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

      {/* Attachment Modal */}
      <Modal isOpen={isAttachmentModalOpen} onClose={onAttachmentModalClose}>
        <ModalOverlay />
        <ModalContent bg="gray.800" color="white">
          <ModalHeader>Upload PDF Attachment</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedClassroom && selectedSession && (
              <>
                <Text mb={2}>Class: <b>{selectedClassroom.className}</b></Text>
                <Text mb={4}>Session: <b>{formatDate(selectedSession.sessionDate)}</b></Text>
              </>
            )}
            
            <FormControl mb={4}>
              <FormLabel>Select PDF File</FormLabel>
              <Input
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                p={1}
                bg="gray.700"
                ref={fileInputRef}
                sx={{
                  "::file-selector-button": {
                    height: "32px",
                    mr: 3,
                    border: "none",
                    background: "teal.500",
                    color: "white",
                    borderRadius: "md",
                    px: 4,
                    cursor: "pointer",
                  }
                }}
              />
            </FormControl>
            
            {attachmentFile && (
              <Box p={3} bg="gray.700" borderRadius="md" mb={4}>
                <Flex align="center">
                  <Icon as={FiFile} color="teal.300" boxSize={5} mr={2} />
                  <Text>{attachmentFile.name}</Text>
                </Flex>
              </Box>
            )}
            
            <Text fontSize="sm" color="gray.400">
              Only PDF files are allowed. Maximum file size: 10MB.
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onAttachmentModalClose}>
              Cancel
            </Button>
            <Button 
              colorScheme="teal" 
              onClick={handleUploadAttachment}
              isDisabled={!attachmentFile}
              leftIcon={<FiPaperclip />}
            >
              Upload Attachment
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default TeacherDashboard;