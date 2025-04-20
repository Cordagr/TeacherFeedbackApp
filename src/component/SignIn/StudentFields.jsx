import React, { useState, useEffect } from 'react';
import {
  Box, Input, Button, VStack, FormLabel, Heading, useToast,
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
      await axios.post('http://localhost:3001/api/userProfile/registerUserProfile', profileData);
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
    <Box maxW="md" mx="auto" mt={10} p={6} borderWidth={1} borderRadius="xl" boxShadow="md">
      <Heading size="lg" mb={6} textAlign="center">Complete Your Profile</Heading>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <Box w="100%">
            <FormLabel>First Name</FormLabel>
            <Input name="first_name" value={formData.first_name} onChange={handleChange} required />
          </Box>
          <Box w="100%">
            <FormLabel>Last Name</FormLabel>
            <Input name="last_name" value={formData.last_name} onChange={handleChange} required />
          </Box>
          <Box w="100%">
            <FormLabel>Major</FormLabel>
            <Input name="major" value={formData.major} onChange={handleChange} />
          </Box>
          <Box w="100%">
            <FormLabel>Phone Number</FormLabel>
            <Input name="phone_number" value={formData.phone_number} onChange={handleChange} />
          </Box>
          <Box w="100%">
            <FormLabel>Current Standing</FormLabel>
            <Input name="current_standing" value={formData.current_standing} onChange={handleChange} />
          </Box>
          <Button colorScheme="teal" type="submit" w="full">Submit Profile</Button>
        </VStack>
      </form>
    </Box>
  );
};

export default StudentReviewForm;
