import React, { useState, useEffect } from 'react';
import {
  Box, Button, FormControl, FormLabel, Input, Heading, Text, VStack, useToast
} from '@chakra-ui/react';
import { signInWithEmailAndPassword as firebaseSignIn, onAuthStateChanged } from 'firebase/auth';
import { auth, signInWithGoogle } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import { AccountType } from '../SignIn/AccountType';
import { LoginFields } from '../SignIn/LoginFields';
import { StudentReviewForm } from './StudentFields';
import CollegeFields from './CollegeFields';




const SignIn = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0); // Start from login page
  const [user, setUser] = useState(null);

  // Check if user is signed in
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignIn = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      await firebaseSignIn(auth, form.email, form.password);
      toast({
        title: "Successfully signed in!",
        description: "Welcome back.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      setPage(1); // Go to next page
    } catch (error) {
      toast({
        title: "Sign-in failed.",
        description: error.message,
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
    setLoading(false);
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      await signInWithGoogle();
      toast({
        title: "Successfully signed in with Google!",
        description: "Welcome back.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      setPage(1);
    } catch (error) {
      toast({
        title: "Google Sign-in failed.",
        description: error.message,
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
    setLoading(false);
  };

  // Protect access to steps 1, 2, 3
  const isLoggedIn = !!user;

  return (
    <Box minH="100vh" display="flex" justifyContent="center" alignItems="center" bg="gray.100">
      {
        page === 1 && isLoggedIn ? (
          <AccountType setPage={setPage} />
        ) : page === 2 && isLoggedIn ? (
          <StudentReviewForm setPage={setPage} />
        ) : page === 3 && isLoggedIn ? (
          <CollegeFields setPage={setPage} />
        ) : (
          <VStack spacing={6} bg="white" p={8} rounded="md" shadow="md" w="100%" maxW="400px">
            <Heading>Sign In</Heading>
            <form onSubmit={handleSignIn} style={{ width: '100%' }}>
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
                Sign In
              </Button>
            </form>

            <Button
              onClick={handleGoogleSignIn}
              colorScheme="red"
              width="100%"
              isLoading={loading}
            >
              Sign in with Google
            </Button>

            <Text fontSize="sm">
              Don't have an account? <Button variant="link" colorScheme="blue" onClick={() => navigate('/signup')}>Sign Up</Button>
            </Text>
          </VStack>
        )
      }
    </Box>
  );
};

export default SignIn;
