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
} from '@chakra-ui/react';
import axios from 'axios';
import { getAuth } from 'firebase/auth';

const ClassDashboard = () => {
  const [feedbackData, setFeedbackData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const auth = getAuth();
        const user = auth.currentUser;

        if (!user) {
          console.log('No user logged in');
          return;
        }

        const email = user.email;

        // To update //
        const response = await axios.get(
          `https://your-backend-api.com/api/classrooms?email=${email}`
        );

        setFeedbackData(response.data);
      } catch (error) {
        console.error('Failed to fetch feedback', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeedback();
  }, []);

  if (loading) {
    return <Spinner size="xl" thickness="4px" speed="0.65s" color="teal.500" />;
  }

  return (
    <Box p={6}>
      <Heading mb={6}>Class Dashboard</Heading>
      <VStack spacing={8} align="stretch">
        {feedbackData.length === 0 && (
          <Text fontSize="lg">You are not part of any classrooms yet.</Text>
        )}
        {feedbackData.map((classFeedback) => (
          <Box key={classFeedback.classId} borderWidth="1px" borderRadius="lg" p={5}>
            <Heading size="md" mb={4}>
              {classFeedback.classTitle} - {classFeedback.teacherName}
            </Heading>
            <Text fontSize="sm" color="gray.500" mb={4}>
              {classFeedback.feedback.length} Feedbacks
            </Text>

            {classFeedback.feedback.map((feedback, index) => (
              <Box key={index} mb={6} p={4} borderWidth="1px" borderRadius="lg">
                <Stack spacing={4}>
                  <Text fontWeight="bold">Feedback from {feedback.studentName}</Text>
                  <Text>
                    <strong>Teaching Rating:</strong> {feedback.teachingRating} / 5
                  </Text>
                  <Text>
                    <strong>Class Engagement:</strong> {feedback.engagementRating} / 5
                  </Text>
                  <Text>
                    <strong>Class Rating:</strong> {feedback.classRating} / 5
                  </Text>
                  <Text>
                    <strong>Comments:</strong> {feedback.comments}
                  </Text>
                </Stack>
                <Divider my={4} />
              </Box>
            ))}

            <Button colorScheme="teal" size="sm">
              Mark Feedback as Reviewed
            </Button>
          </Box>
        ))}
      </VStack>
    </Box>
  );
};

export default ClassDashboard;
