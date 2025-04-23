import React, { useState, useEffect } from 'react';
import {
  Box, 
  Button, 
  FormControl, 
  FormLabel, 
  Input, 
  Heading, 
  Text, 
  VStack, 
  useToast, 
  Spinner,
  InputGroup,
  InputRightElement,
  Flex,
  Divider
} from '@chakra-ui/react';
import { signInWithEmailAndPassword as firebaseSignIn, onAuthStateChanged } from 'firebase/auth';
import { auth, signInWithGoogle } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import { AccountType } from '../SignIn/AccountType';
import { LoginFields } from '../SignIn/LoginFields';
import StudentReviewForm from './StudentFields';
import CollegeFields from './CollegeFields';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';

const SignIn = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [page, setPage] = useState(0); // 0 = login, 1 = account type, etc.
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  // Check if user is already signed in and has a profile
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        try {
          const res = await fetch(`http://localhost:3002/api/userProfile/getUserProfileStatus/${currentUser.email}`);
          const data = await res.json();

          if (data.exists) {
            navigate('/dashboard');
          }
        } catch (err) {
          console.error("Error checking profile:", err);
        }
      }

      setLoading(false); // stop showing loading screen
    });

    return () => unsubscribe();
  }, [navigate]);

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
        position: "top",
        variant: "subtle",
      });
      setPage(1); // Go to next step
    } catch (error) {
      toast({
        title: "Sign-in failed.",
        description: error.message,
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "top",
        variant: "subtle",
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
        position: "top",
        variant: "subtle",
      });
      setPage(1);
    } catch (error) {
      toast({
        title: "Google Sign-in failed.",
        description: error.message,
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "top",
        variant: "subtle",
      });
    }
    setLoading(false);
  };

  const isLoggedIn = !!user;

  // Show loading spinner while checking auth/profile
  if (loading) {
    return (
      <Box minH="100vh" display="flex" justifyContent="center" alignItems="center" bg="black">
        <Spinner size="xl" color="white" thickness="4px" />
      </Box>
    );
  }

  return (
    <Box minH="100vh" display="flex" justifyContent="center" alignItems="center" bg="black">
      {
        page === 1 && isLoggedIn ? (
          <AccountType setPage={setPage} />
        ) : page === 2 && isLoggedIn ? (
          <StudentReviewForm setPage={setPage} />
        ) : page === 3 && isLoggedIn ? (
          <CollegeFields setPage={setPage} />
        ) : (
          <Box
            w="100%"
            maxW="450px"
            p={8}
            borderRadius="xl"
            bg="rgba(25, 25, 25, 0.8)"
            backdropFilter="blur(10px)"
            boxShadow="0 4px 30px rgba(0, 0, 0, 0.5)"
            border="1px solid rgba(255, 255, 255, 0.05)"
          >
            <VStack spacing={6} align="stretch">
              <Heading 
                textAlign="center" 
                fontSize="3xl" 
                color="white" 
                letterSpacing="wide"
                fontWeight="bold"
              >
                Sign in
              </Heading>
              
              <form onSubmit={handleSignIn} style={{ width: '100%' }}>
                <VStack spacing={5} align="stretch">
                  <FormControl id="email" isRequired>
                    <FormLabel color="gray.300" fontSize="sm" fontWeight="medium">Email address</FormLabel>
                    <Input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      bg="rgba(255, 255, 255, 0.06)"
                      border="1px solid rgba(255, 255, 255, 0.1)"
                      color="white"
                      _hover={{ bg: "rgba(255, 255, 255, 0.08)" }}
                      _focus={{ borderColor: "blue.400", boxShadow: "0 0 0 1px blue.400" }}
                      placeholder="your@email.com"
                      size="lg"
                    />
                  </FormControl>
                  
                  <FormControl id="password" isRequired>
                    <FormLabel color="gray.300" fontSize="sm" fontWeight="medium">Password</FormLabel>
                    <InputGroup>
                      <Input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        bg="rgba(255, 255, 255, 0.06)"
                        border="1px solid rgba(255, 255, 255, 0.1)"
                        color="white"
                        _hover={{ bg: "rgba(255, 255, 255, 0.08)" }}
                        _focus={{ borderColor: "blue.400", boxShadow: "0 0 0 1px blue.400" }}
                        placeholder="••••••••"
                        size="lg"
                      />
                      <InputRightElement width="4.5rem" h="100%">
                        <Button
                          h="1.75rem"
                          size="sm"
                          bg="transparent"
                          _hover={{ bg: "transparent" }}
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <ViewOffIcon color="gray.300" />
                          ) : (
                            <ViewIcon color="gray.300" />
                          )}
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                  </FormControl>
                  
                  <Button
                    type="submit"
                    size="lg"
                    width="100%"
                    mt={4}
                    isLoading={loading}
                    bg="white"
                    color="black"
                    _hover={{ bg: "gray.200" }}
                    _active={{ bg: "gray.300" }}
                    borderRadius="md"
                    fontWeight="bold"
                    letterSpacing="wide"
                  >
                    Sign in
                  </Button>
                </VStack>
              </form>
              
              <Flex align="center" mt={2}>
                <Divider flex="1" borderColor="gray.600" />
                <Text px={3} color="gray.400" fontSize="sm">OR</Text>
                <Divider flex="1" borderColor="gray.600" />
              </Flex>
              
              <Button
                onClick={handleGoogleSignIn}
                size="lg"
                width="100%"
                isLoading={loading}
                bg="red.500"
                color="white"
                _hover={{ bg: "red.600" }}
                _active={{ bg: "red.700" }}
                borderRadius="md"
                fontWeight="bold"
                letterSpacing="wide"
              >
                Sign with Google
              </Button>
              
              <Flex direction="column" align="center" mt={2}>
                <Text color="gray.400" fontSize="sm" mb={2}>
                  Don't have an account?
                </Text>
                <Button 
                  variant="outline" 
                  colorScheme="whiteAlpha"
                  width="100%"
                  onClick={() => navigate('/signup')}
                  borderColor="rgba(255, 255, 255, 0.2)"
                  color="white"
                  _hover={{ bg: "rgba(255, 255, 255, 0.05)" }}
                >
                  Sign up
                </Button>
              </Flex>
            </VStack>
          </Box>
        )
      }
    </Box>
  );
};

export default SignIn;