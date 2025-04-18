import React, { useState, useEffect } from 'react';
import {
  Box,
  Heading,
  Text,
  VStack,
  HStack,
  Divider,
  Button,
  Stack,
} from '@chakra-ui/react';

const ClassDashboard = () => {
  const [feedbackData, setFeedbackData] = useState([]);

  // Example feedback data (you would typically fetch this from your backend)
  useEffect(() => {
    const fetchedFeedback = [
      {
        classId: 1,
        classTitle: 'Calculus I',
        teacherName: 'Mr. Anderson',
        feedback: [
          {
            studentName: 'John Doe',
            teachingRating: 4,
            engagementRating: 5,
            classRating: 4,
            comments: 'Great class, very engaging!',
          },
          {
            studentName: 'Jane Smith',
            teachingRating: 3,
            engagementRating: 4,
            classRating: 4,
            comments: 'The class was good, but I think more examples would help.',
          },
        ],
      },
      {
        classId: 2,
        classTitle: 'Introduction to Psychology',
        teacherName: 'Ms. Carter',
        feedback: [
          {
            studentName: 'Sarah Lee',
            teachingRating: 5,
            engagementRating: 5,
            classRating: 5,
            comments: 'Fantastic teacher! Very interactive and helpful.',
          },
        ],
      },
    ];

    // Simulate fetching feedback from a backend
    setFeedbackData(fetchedFeedback);
  }, []);

  return (
    <Box p={6}>
      <Heading mb={6}>Class Dashboard</Heading>
      <VStack spacing={8} align="stretch">
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
