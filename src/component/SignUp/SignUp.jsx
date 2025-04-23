import React, { useState } from 'react';
import {
  Box, 
  Button, 
  FormControl, 
  FormLabel, 
  Input,
  InputGroup,
  InputRightElement, 
  Heading, 
  Text, 
  VStack, 
  useToast,
  Flex,
  Icon,
  Divider
} from '@chakra-ui/react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase'; // adjust path as needed
import { useNavigate } from 'react-router-dom';
import { addUser } from '../../utils'; // Import your addUser function
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';

const SignUp = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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
        position: "top",
        variant: "subtle",
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
        position: "top",
        variant: "subtle",
      });
    }
    setLoading(false);
  };

  return (
    <Box minH="100vh" display="flex" justifyContent="center" alignItems="center" bg="black">
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
            Create an account
          </Heading>
          
          <form onSubmit={handleSignUp} style={{ width: '100%' }}>
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
                <FormLabel color="gray.300" fontSize="sm" fontWeight="medium">Passoword</FormLabel>
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
                colorScheme="blue"
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
                Sign up
              </Button>
            </VStack>
          </form>
          
          <Flex align="center" mt={2}>
            <Divider flex="1" borderColor="gray.600" />
            <Text px={3} color="gray.400" fontSize="sm">OR</Text>
            <Divider flex="1" borderColor="gray.600" />
          </Flex>
          
          <Flex direction="column" align="center">
            <Text color="gray.400" fontSize="sm" mb={2}>
              Already have an account?
            </Text>
            <Button 
              variant="outline" 
              colorScheme="whiteAlpha"
              width="100%"
              onClick={() => navigate('/signin')}
              borderColor="rgba(255, 255, 255, 0.2)"
              color="white"
              _hover={{ bg: "rgba(255, 255, 255, 0.05)" }}
            >
              Sign in
            </Button>
          </Flex>
        </VStack>
      </Box>
    </Box>
  );
};

export default SignUp;