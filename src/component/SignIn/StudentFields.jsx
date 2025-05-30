import React, { useState, useEffect } from 'react';
import {
  Box,
  Input,
  Button,
  VStack,
  FormLabel,
  Heading,
  useToast,
  Text,
  FormControl,
} from '@chakra-ui/react';
import axios from 'axios';
import { auth } from '../../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const StudentReviewForm = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [userEmail, setUserEmail] = useState('');
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    major: '',
    phone_number: '',
    current_standing: '',
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserEmail(user.email);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const profileData = {
      ...formData,
      email: userEmail,
    };

    try {
      await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/userProfile/registerUserProfile`,
        profileData
      );
      toast({
        title: 'Profile Created',
        description: 'Your profile has been successfully registered.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
    } catch (err) {
      console.error('Error registering profile:', err);
      toast({
        title: 'Error',
        description: 'Could not submit your profile.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box
      maxW="lg"
      mx="auto"
      mt={16}
      p={8}
      borderRadius="2xl"
      boxShadow="lg"
      bg="white"
      border="1px solid"
      borderColor="gray.100"
    >
      <Heading size="xl" mb={4} textAlign="center">
        Complete Your Student Profile
      </Heading>
      <Text mb={6} fontSize="sm" color="gray.600" textAlign="center">
        This helps us personalize your dashboard and class experience.
      </Text>
      <form onSubmit={handleSubmit}>
        <VStack spacing={5}>
          <FormControl isRequired>
            <FormLabel>First Name</FormLabel>
            <Input
              name="first_name"
              placeholder="Enter your first name"
              value={formData.first_name}
              onChange={handleChange}
              rounded="xl"
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Last Name</FormLabel>
            <Input
              name="last_name"
              placeholder="Enter your last name"
              value={formData.last_name}
              onChange={handleChange}
              rounded="xl"
            />
          </FormControl>

          <FormControl>
            <FormLabel>Major</FormLabel>
            <Input
              name="major"
              placeholder="e.g., Computer Science"
              value={formData.major}
              onChange={handleChange}
              rounded="xl"
            />
          </FormControl>

          <FormControl>
            <FormLabel>Phone Number</FormLabel>
            <Input
              name="phone_number"
              placeholder="e.g., (123) 456-7890"
              value={formData.phone_number}
              onChange={handleChange}
              rounded="xl"
            />
          </FormControl>

          <FormControl>
            <FormLabel>Current Standing</FormLabel>
            <Input
              name="current_standing"
              placeholder="e.g., Freshman, Sophomore"
              value={formData.current_standing}
              onChange={handleChange}
              rounded="xl"
            />
          </FormControl>

          <Button
            colorScheme="teal"
            size="lg"
            w="full"
            rounded="2xl"
            type="submit"
            mt={2}
          >
            Submit Profile
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default StudentReviewForm;
