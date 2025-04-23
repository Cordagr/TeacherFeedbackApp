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
  const [page, setPage] = useState(0);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

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
      setLoading(false);
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
      setPage(1);
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

  if (loading) {
    return (
      <Box minH="100vh" display="flex" justifyContent="center" alignItems="center" bg="black">
        <Spinner size="xl" color="white" thickness="4px" />
      </Box>
    );
  }

  return (
    <Box minH="100vh" position="relative" bg="black" overflow="hidden">
      {/* SVG Background */}
      <Box 
        position="absolute" 
        top="0" 
        left="0" 
        width="100%" 
        height="100%" 
        zIndex={0}
        dangerouslySetInnerHTML={{
          __html: `
            <svg viewBox="0 0 1000 600" xmlns="http://www.w3.org/2000/svg">
              <!-- Background base -->
              <rect width="100%" height="100%" fill="#000000" />
              
              <!-- Abstract grid lines -->
              <g opacity="0.07">
                <path d="M0,100 L1000,100" stroke="#4299E1" stroke-width="1" />
                <path d="M0,200 L1000,200" stroke="#4299E1" stroke-width="0.5" />
                <path d="M0,300 L1000,300" stroke="#4299E1" stroke-width="1" />
                <path d="M0,400 L1000,400" stroke="#4299E1" stroke-width="0.5" />
                <path d="M0,500 L1000,500" stroke="#4299E1" stroke-width="1" />
                
                <path d="M100,0 L100,600" stroke="#4299E1" stroke-width="0.5" />
                <path d="M300,0 L300,600" stroke="#4299E1" stroke-width="1" />
                <path d="M500,0 L500,600" stroke="#4299E1" stroke-width="0.5" />
                <path d="M700,0 L700,600" stroke="#4299E1" stroke-width="1" />
                <path d="M900,0 L900,600" stroke="#4299E1" stroke-width="0.5" />
              </g>
              
              <!-- Abstract curved shapes -->
              <path d="M-100,300 Q200,100 400,350 T900,250" stroke="#805AD5" stroke-width="60" fill="none" opacity="0.05" />
              <path d="M100,600 Q400,450 700,550 T1100,400" stroke="#3182CE" stroke-width="80" fill="none" opacity="0.06" />
              
              <!-- Circles -->
              <circle cx="150" cy="150" r="100" fill="#D53F8C" opacity="0.04" />
              <circle cx="850" cy="450" r="120" fill="#805AD5" opacity="0.05" />
              <circle cx="500" cy="300" r="150" fill="#3182CE" opacity="0.03" />
              
              <!-- Abstract data points -->
              <g opacity="0.15">
                <circle cx="200" cy="200" r="3" fill="white" />
                <circle cx="250" cy="180" r="2" fill="white" />
                <circle cx="300" cy="220" r="3" fill="white" />
                <circle cx="350" cy="190" r="2" fill="white" />
                <circle cx="400" cy="210" r="3" fill="white" />
                
                <circle cx="600" cy="400" r="3" fill="white" />
                <circle cx="650" cy="380" r="2" fill="white" />
                <circle cx="700" cy="420" r="3" fill="white" />
                <circle cx="750" cy="390" r="2" fill="white" />
                <circle cx="800" cy="410" r="3" fill="white" />
              </g>
              
              <!-- Abstract data lines -->
              <g opacity="0.1">
                <path d="M200,200 L250,180 L300,220 L350,190 L400,210" stroke="white" stroke-width="1" fill="none" />
                <path d="M600,400 L650,380 L700,420 L750,390 L800,410" stroke="white" stroke-width="1" fill="none" />
              </g>
              
              <!-- Decorative corners -->
              <path d="M0,0 L50,0 L50,5 L5,5 L5,50 L0,50 Z" fill="#4299E1" opacity="0.2" />
              <path d="M950,0 L1000,0 L1000,50 L995,50 L995,5 L950,5 Z" fill="#4299E1" opacity="0.2" />
              <path d="M0,550 L0,600 L50,600 L50,595 L5,595 L5,550 Z" fill="#4299E1" opacity="0.2" />
              <path d="M950,595 L995,595 L995,550 L1000,550 L1000,600 L950,600 Z" fill="#4299E1" opacity="0.2" />
            </svg>
          `
        }}
      />

      {/* Keep the original blur effects for additional depth */}
      <Box position="absolute" top="10%" left="5%" width="300px" height="300px" bg="purple.400" opacity={0.06} filter="blur(120px)" borderRadius="50%" zIndex={0} />
      <Box position="absolute" bottom="30%" right="25%" width="250px" height="250px" bg="blue.400" opacity={0.05} filter="blur(100px)" borderRadius="30%" zIndex={0} />
      <Box position="absolute" top="30%" right="30%" width="200px" height="200px" bg="pink.300" opacity={0.04} filter="blur(80px)" borderRadius="full" zIndex={0} />

      {/* Foreground content */}
      <Box
        position="relative"
        zIndex={1}
        display="flex"
        justifyContent="center"
        alignItems="center"
        minH="100vh"
        px={4}
      >
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
              position="relative"
              _before={{
                content: '""',
                position: "absolute",
                top: "-1px",
                left: "-1px",
                right: "-1px",
                bottom: "-1px",
                background: "linear-gradient(45deg, rgba(66, 153, 225, 0.3) 0%, rgba(128, 90, 213, 0.3) 50%, rgba(213, 63, 140, 0.3) 100%)",
                borderRadius: "xl",
                zIndex: -1,
                opacity: 0.2,
                filter: "blur(8px)"
              }}
            >
              <VStack spacing={6} align="stretch">
                <Heading textAlign="center" fontSize="3xl" color="white" letterSpacing="wide" fontWeight="bold">
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
    </Box>
  );
};

export default SignIn;