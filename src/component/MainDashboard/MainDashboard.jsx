import React from 'react';
import { Box, Button, Heading, SimpleGrid, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const MainDashboard = () => {
  return (
    <Box p={5}>
      <Heading as="h1" size="xl" textAlign="center">
        Welcome to the Dashboard
      </Heading>
      <Text mt={4} fontSize="lg" textAlign="center">
        Choose your section to get started:
      </Text>
      <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={5} mt={6}>
        <Button as={Link} to="/StudentDashboard" size="lg" colorScheme="teal">
          Student Dashboard
        </Button>
        <Button as={Link} to="/profile" size="lg" colorScheme="purple">
          Profile
        </Button>
        <Button as={Link} to="/search" size="lg" colorScheme="orange">
          Search
        </Button>
      </SimpleGrid>
    </Box>
  );
};

export default MainDashboard;
