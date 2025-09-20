import React, { useEffect, useState } from 'react';
import { 
  Box, 
  Heading, 
  VStack, 
  Text, 
  Badge, 
  Grid, 
  GridItem, 
  Tabs, 
  TabList, 
  TabPanels, 
  Tab, 
  TabPanel,
  Card,
  CardHeader,
  CardBody,
  Button,
  Flex
} from '@chakra-ui/react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase';
import axios from 'axios';
import LiveFeedbackSubmission from '../LiveFeedback/LiveFeedbackSubmission';
import LiveChat from '../LiveFeedback/LiveChat';

const StudentDashboard = () => {
  const [classes, setClasses] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [activeSessions, setActiveSessions] = useState([]);
  const [selectedSession, setSelectedSession] = useState(null);
  const [user] = useAuthState(auth);

  useEffect(() => {
    if (user?.email) {
      fetchStudentData();
      fetchActiveSessions();
    }
  }, [user?.email]);

  const fetchStudentData = async () => {
    try {
      // Fetch joined classes
      const classResponse = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/teacherActions/getStudentClassrooms/${user.email}`
      );
      setClasses(classResponse.data || []);
    } catch (error) {
      console.error('Error fetching student data:', error);
    }
  };

  const fetchActiveSessions = async () => {
    try {
      // This would need to be implemented in the backend
      // For now, we'll simulate with the joined classes
      setActiveSessions(classes.filter(cls => cls.hasActiveSession));
    } catch (error) {
      console.error('Error fetching active sessions:', error);
    }
  };

  return (
    <Box minH="100vh" bg="#0e1525" color="white" p={5}>
      <Heading mb={6} color="teal.300">Student Dashboard</Heading>

      <Tabs variant="enclosed" colorScheme="teal">
        <TabList mb="1em">
          <Tab>My Classes</Tab>
          <Tab>Live Sessions</Tab>
          <Tab>Notifications</Tab>
        </TabList>
        
        <TabPanels>
          {/* Classes Tab */}
          <TabPanel>
            <Box>
              <Heading size="md" mb={4}>Joined Classes</Heading>
              {classes.length === 0 ? (
                <Text color="gray.400">You haven't joined any classes yet.</Text>
              ) : (
                <Grid templateColumns="repeat(auto-fit, minmax(300px, 1fr))" gap={4}>
                  {classes.map((cls, index) => (
                    <Card key={index} bg="gray.800" color="white">
                      <CardHeader>
                        <Heading size="sm">{cls.className || `Class ${cls.inviteCode}`}</Heading>
                      </CardHeader>
                      <CardBody>
                        <Text fontSize="sm" color="gray.300">
                          Invite Code: {cls.inviteCode}
                        </Text>
                        <Text fontSize="sm" color="gray.300" mt={2}>
                          Meeting: {cls.meetingDays} {cls.meetingTimes}
                        </Text>
                        <Button 
                          mt={3} 
                          size="sm" 
                          colorScheme="teal"
                          onClick={() => setSelectedSession(cls.inviteCode)}
                        >
                          Join Live Session
                        </Button>
                      </CardBody>
                    </Card>
                  ))}
                </Grid>
              )}
            </Box>
          </TabPanel>

          {/* Live Sessions Tab */}
          <TabPanel>
            <Box>
              <Heading size="md" mb={4}>Live Session</Heading>
              {selectedSession ? (
                <Grid templateColumns="1fr 1fr" gap={6} height="600px">
                  <GridItem>
                    <LiveFeedbackSubmission 
                      sessionId={selectedSession} 
                      isAnonymous={true} 
                    />
                  </GridItem>
                  <GridItem>
                    <LiveChat 
                      sessionId={selectedSession} 
                      userRole="student" 
                    />
                  </GridItem>
                </Grid>
              ) : (
                <Box textAlign="center" py={8}>
                  <Text color="gray.400" mb={4}>
                    Select a class from the "My Classes" tab to join a live session
                  </Text>
                  <Text fontSize="sm" color="gray.500">
                    You can submit feedback and chat with your teacher and classmates in real-time
                  </Text>
                </Box>
              )}
            </Box>
          </TabPanel>

          {/* Notifications Tab */}
          <TabPanel>
            <Box>
              <Heading size="md" mb={4}>Notifications</Heading>
              <VStack align="start" spacing={3}>
                {notifications.length === 0 ? (
                  <Text color="gray.400">No notifications yet</Text>
                ) : (
                  notifications.map((note, index) => (
                    <Box key={index} p={3} bg="gray.800" borderRadius="md" width="100%">
                      <Flex align="center" mb={2}>
                        <Badge colorScheme="blue" mr={2}>New</Badge>
                        <Text fontSize="xs" color="gray.400">
                          {new Date(note.createdAt).toLocaleString()}
                        </Text>
                      </Flex>
                      <Text>{note.message}</Text>
                    </Box>
                  ))
                )}
              </VStack>
            </Box>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default StudentDashboard;