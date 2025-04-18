import React, { useState } from 'react';
import {
  Box, Button, FormControl, FormLabel, Input, Heading, Text, VStack, useToast
} from '@chakra-ui/react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase'; // adjust path as needed
import { useNavigate } from 'react-router-dom';
import { addUser } from '../../utils'; // Import your addUser function

const SignUp = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignUp = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      // Create the user with Firebase authentication
      const userCredential = await createUserWithEmailAndPassword(auth, form.email, form.password);
      
      // Prepare the user data for Firestore
      const userInfo = {
        email: form.email,
        type: 'student', // Add any other fields you need here (e.g., user type, name, etc.)
        // Add additional data as required
      };

      // Add the user to Firestore
      await addUser(userInfo);

      toast({
        title: "Account created!",
        description: "You're now registered and logged in.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      
      // Redirect to the dashboard or home page after successful signup
      navigate('/dashboard'); // Change this to where you want the user to go after signup

    } catch (error) {
      toast({
        title: "Signup failed.",
        description: error.message,
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
    setLoading(false);
  };

  return (
    <Box minH="100vh" display="flex" justifyContent="center" alignItems="center" bg="gray.100">
      <VStack spacing={6} bg="white" p={8} rounded="md" shadow="md" w="100%" maxW="400px">
        <Heading>Sign Up</Heading>
        <form onSubmit={handleSignUp} style={{ width: '100%' }}>
          <FormControl id="email" isRequired mb={4}>
            <FormLabel>Email address</FormLabel>
            <Input type="email" name="email" value={form.email} onChange={handleChange} />
          </FormControl>
          <FormControl id="password" isRequired mb={6}>
            <FormLabel>Password</FormLabel>
            <Input type="password" name="password" value={form.password} onChange={handleChange} />
          </FormControl>
          <Button
            type="submit"
            colorScheme="blue"
            width="100%"
            isLoading={loading}
          >
            Sign Up
          </Button>
        </form>
        <Text fontSize="sm">
          Already have an account? <Button variant="link" colorScheme="blue" onClick={() => navigate('/signin')}>Sign In</Button>
        </Text>
      </VStack>
    </Box>
  );
};

export default SignUp;
