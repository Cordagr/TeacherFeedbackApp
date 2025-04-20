import React from 'react';
import { Box, Button, Heading, SimpleGrid, Text } from '@chakra-ui/react';
import { Link,useNavigate } from 'react-router-dom';
import {signOut} from 'firebase/auth'
import {auth} from '../../firebase'

const MainDashboard = () => {
  const navigate = useNavigate()
  const handleSignOut = async () =>
  {
    try {
      await signOut(auth);
      navigate('/')
    } catch (error) {
      console.error('Error signing out:', error);
    }
  }

  return (
    <Box p={5} position="relative">
      {/* Sign Out Button */}
      <Box position="absolute" top={4} right={4}>
        <Button colorScheme="red" onClick={handleSignOut}>
          Sign Out
        </Button>
      </Box>

      <Heading as="h1" size="xl" textAlign="center">
        Welcome to the Dashboard
      </Heading>
      <Text mt={4} fontSize="lg" textAlign="center">
        Choose your section to get started:
      </Text>

      <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={5} mt={6}>
        <Button as={Link} to="/ClassDashboard" size="lg" colorScheme="teal">
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