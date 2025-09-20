import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Heading, 
  Grid, 
  GridItem, 
  Button, 
  Text, 
  Flex,
  Badge,
  useToast
} from '@chakra-ui/react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase';
import LiveFeedbackSubmission from '../LiveFeedback/LiveFeedbackSubmission';
import LiveChat from '../LiveFeedback/LiveChat';
import LiveFeedback from '../LiveFeedback/LiveFeedback';
import axios from 'axios';

const LiveSession = () => {
  const { sessionId } = useParams();
  const navigate = useNavigate();
  const [user] = useAuthState(auth);
  const [sessionInfo, setSessionInfo] = useState(null);
  const [userRole, setUserRole] = useState('student');
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  useEffect(() => {
    if (sessionId && user?.email) {
      fetchSessionInfo();
      determineUserRole();
    }
  }, [sessionId, user?.email]);

  const fetchSessionInfo = async () => {
    try {
      // Fetch classroom info to verify access
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/teacherActions/getStudentsInClassroom/${sessionId}`
      );
      
      if (response.data) {
        setSessionInfo({ classroomId: sessionId });
      }
    } catch (error) {
      console.error('Error fetching session info:', error);
      toast({
        title: 'Error',
        description: 'Could not access this session',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      navigate('/dashboard');
    } finally {
      setLoading(false);
    }
  };

  const determineUserRole = async () => {
    try {
      // Check if user is a teacher by looking for classrooms they own
      const teacherResponse = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/teacherActions/getTeacherClassrooms/${user.email}`
      );
      
      const isTeacher = teacherResponse.data.some(classroom => 
        classroom.inviteCode === sessionId
      );
      
      setUserRole(isTeacher ? 'teacher' : 'student');
    } catch (error) {
      console.error('Error determining user role:', error);
      setUserRole('student'); // Default to student
    }
  };

  const handleBackToDashboard = () => {
    navigate('/dashboard');
  };

  if (loading) {
    return (
      <Box 
        minH="100vh" 
        bg="#0e1525" 
        color="white" 
        display="flex" 
        alignItems="center" 
        justifyContent="center"
      >
        <Text>Loading session...</Text>
      </Box>
    );
  }

  return (
    <Box minH="100vh" bg="#0e1525" color="white" p={6}>
      {/* Header */}
      <Flex justify="space-between" align="center" mb={6}>
        <Box>
          <Heading size="lg" color="teal.300">Live Session</Heading>
          <Text color="gray.400" fontSize="sm">
            Session ID: {sessionId}
          </Text>
        </Box>
        <Flex align="center" gap={4}>
          <Badge 
            colorScheme={userRole === 'teacher' ? 'blue' : 'green'} 
            variant="solid"
            px={3}
            py={1}
          >
            {userRole.toUpperCase()}
          </Badge>
          <Button 
            variant="outline" 
            colorScheme="gray"
            onClick={handleBackToDashboard}
          >
            Back to Dashboard
          </Button>
        </Flex>
      </Flex>

      {/* Main Content */}
      {userRole === 'teacher' ? (
        // Teacher View - Show live feedback display and chat
        <Grid templateColumns="1fr 1fr" gap={6} height="calc(100vh - 150px)">
          <GridItem>
            <LiveFeedback sessionId={sessionId} userRole="teacher" />
          </GridItem>
          <GridItem>
            <LiveChat sessionId={sessionId} userRole="teacher" />
          </GridItem>
        </Grid>
      ) : (
        // Student View - Show feedback submission and chat
        <Grid templateColumns="1fr 1fr" gap={6} height="calc(100vh - 150px)">
          <GridItem>
            <LiveFeedbackSubmission 
              sessionId={sessionId} 
              isAnonymous={true} 
            />
          </GridItem>
          <GridItem>
            <LiveChat sessionId={sessionId} userRole="student" />
          </GridItem>
        </Grid>
      )}

      {/* Instructions */}
      <Box 
        mt={6} 
        p={4} 
        bg="gray.800" 
        borderRadius="md" 
        border="1px solid" 
        borderColor="gray.600"
      >
        <Text fontSize="sm" color="gray.300">
          {userRole === 'teacher' ? (
            <>
              <strong>Teacher Instructions:</strong> Monitor live feedback from students in real-time. 
              Use the chat to communicate with students and answer questions during the session.
            </>
          ) : (
            <>
              <strong>Student Instructions:</strong> Submit anonymous feedback about the class and 
              participate in the live chat. Your feedback helps improve the learning experience.
            </>
          )}
        </Text>
      </Box>
    </Box>
  );
};

export default LiveSession;