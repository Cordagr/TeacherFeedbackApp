import React, { useEffect, useState } from 'react';
import { Box, Heading, VStack, Text, Badge } from '@chakra-ui/react';
import { getStudentData } from '../api'; // your API call to fetch joined classes & notifications

const StudentDashboard = () => {
  const [classes, setClasses] = useState([]);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { joinedClasses, notifications } = await getStudentData();
      setClasses(joinedClasses);
      setNotifications(notifications);
    };
    fetchData();
  }, []);

  return (
    <Box p={5}>
      <Heading mb={4}>Student Dashboard</Heading>

      <Box mb={6}>
        <Heading size="md" mb={2}>Notifications</Heading>
        <VStack align="start">
          {notifications.length === 0 ? (
            <Text>No notifications yet</Text>
          ) : (
            notifications.map((note, index) => (
              <Text key={index}><Badge colorScheme="blue">New</Badge> {note.message}</Text>
            ))
          )}
        </VStack>
      </Box>

      <Box>
        <Heading size="md" mb={2}>Joined Classes</Heading>
        <VStack align="start">
          {classes.length === 0 ? (
            <Text>You haven’t joined any classes yet.</Text>
          ) : (
            classes.map((cls, index) => (
              <Text key={index}>{cls.className}</Text>
            ))
          )}
        </VStack>
      </Box>
    </Box>
  );
};

export default StudentDashboard;
