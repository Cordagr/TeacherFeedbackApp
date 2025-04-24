import React, { useState, useEffect } from 'react';
import {
  Box,
  Heading,
  Text,
  VStack,
  Stack,
  Divider,
  Button,
  Spinner,
  Input,
  FormControl,
  FormLabel,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Badge,
  Flex,
  IconButton
} from '@chakra-ui/react';
import { ArrowLeft } from 'lucide-react';
import axios from 'axios';
import { getAuth } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const ClassDashboard = () => {
  const [classrooms, setClassrooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [inviteCode, setInviteCode] = useState('');
  const [joiningClass, setJoiningClass] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    fetchClassrooms();
  }, []);

  const fetchClassrooms = async () => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;
      
      if (!user) {
        console.log('No user logged in');
        setLoading(false);
        return;
      }
      
      const email = user.email;
      
      const response = await axios.get(
        `http://localhost:3002/api/studentActions/getStudentClassrooms/${email}`
      );
      
      setClassrooms(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch classrooms', error);
      setLoading(false);
      toast({
        title: 'Error fetching classrooms',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleJoinClassroom = async () => {
    if (!inviteCode.trim()) {
      toast({
        title: 'Error',
        description: 'Please enter an invite code',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setJoiningClass(true);
    
    try {
      const auth = getAuth();
      const user = auth.currentUser;
      
      if (!user) {
        setJoiningClass(false);
        toast({
          title: 'Error',
          description: 'You must be logged in to join a classroom',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
        return;
      }
      
      const email = user.email;
      
      await axios.post(
        'http://localhost:3002/api/studentActions/joinClassroom',
        {
          email,
          inviteCode
        }
      );
      
      toast({
        title: 'Success',
        description: 'Successfully joined classroom',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      
      fetchClassrooms();
      onClose();
      setInviteCode('');
    } catch (error) {
      console.error('Failed to join classroom', error);
      toast({
        title: 'Error joining classroom',
        description: error.response?.data?.error || 'Failed to join classroom',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setJoiningClass(false);
    }
  };

  const handleSubmitFeedbackClick = (classroomId) => {
    toast({
      title: 'Feature coming soon',
      description: 'Feedback submission will be available in the next update',
      status: 'info',
      duration: 3000,
      isClosable: true,
    });
  };

  const handleBackToDashboard = () => {
    navigate('/dashboard');
  };

  if (loading) {
    return (
      <Box height="100vh" display="flex" alignItems="center" justifyContent="center" bg="black">
        <Spinner size="xl" thickness="4px" speed="0.65s" color="teal.400" />
      </Box>
    );
  }

  return (
    <Box p={6} bg="black" color="white" minHeight="100vh">
      <Stack direction={["column", "row"]} justify="space-between" align="center" mb={8}>
        <Flex align="center">
          <IconButton
            icon={<ArrowLeft />}
            aria-label="Back to Dashboard"
            variant="ghost"
            colorScheme="teal"
            mr={3}
            onClick={handleBackToDashboard}
          />
          <Heading mb={[4, 0]}>My Classes</Heading>
        </Flex>
        <Button colorScheme="teal" onClick={onOpen}>
          Join Classroom
        </Button>
      </Stack>

      <VStack spacing={8} align="stretch">
        {classrooms.length === 0 && (
          <Box 
            p={10} 
            borderWidth="1px" 
            borderRadius="lg" 
            borderColor="gray.700"
            textAlign="center"
          >
            <Text fontSize="lg">You are not part of any classrooms yet.</Text>
            <Button mt={4} colorScheme="teal" onClick={onOpen}>
              Join Your First Classroom
            </Button>
          </Box>
        )}
        
        {classrooms.map((classroom) => (
          <Box 
            key={classroom._id} 
            borderWidth="1px" 
            borderRadius="lg" 
            p={5} 
            borderColor="gray.700"
            bg="gray.900"
          >
            <Stack direction={["column", "row"]} justify="space-between" align={["flex-start", "center"]} mb={4}>
              <Heading size="md">
                {classroom.classTitle}
              </Heading>
              <Badge colorScheme="teal" p={2} borderRadius="md">
                Teacher: {classroom.teacherName}
              </Badge>
            </Stack>
            
            <Text fontSize="md" color="gray.400" mb={4}>
              {classroom.description || "No class description available"}
            </Text>
            
            <Divider my={4} borderColor="gray.600" />
            
            <Flex justify="space-between" align="center">
              <Text>How was your experience in this class?</Text>
              <Button 
                colorScheme="teal" 
                onClick={() => handleSubmitFeedbackClick(classroom._id)}
              >
                Submit Feedback
              </Button>
            </Flex>
          </Box>
        ))}
      </VStack>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent bg="gray.900" color="white">
          <ModalHeader>Join a Classroom</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Enter Classroom Invite Code</FormLabel>
              <Input
                placeholder="Enter code"
                value={inviteCode}
                onChange={(e) => setInviteCode(e.target.value)}
                bg="gray.800"
                borderColor="gray.600"
                _hover={{ borderColor: "teal.500" }}
                _focus={{ borderColor: "teal.500", boxShadow: "0 0 0 1px teal.500" }}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button 
              colorScheme="teal" 
              mr={3} 
              onClick={handleJoinClassroom}
              isLoading={joiningClass}
            >
              Join Classroom
            </Button>
            <Button variant="ghost" onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ClassDashboard;