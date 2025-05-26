import React, { useState, useEffect } from 'react';
import {
  Box,
  Heading,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
  useToast,
  Text,
  Container,
  Divider,
  useColorModeValue,
  Stack,
} from '@chakra-ui/react';
import axios from 'axios';
import { auth } from '../../firebase';
import { onAuthStateChanged } from 'firebase/auth';


const allowedKeys = [
  'first_name',
  'last_name',
  'major',
  'phone_number',
  'current_standing',
];


const StudentRateDashboard = () => {
  const toast = useToast();
  const [profile, setProfile] = useState({
    first_name: '',
    last_name: '',
    major: '',
    phone_number: '',
    current_standing: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  const payload = {
    first_name: profile.first_name,
    last_name: profile.last_name,
    major: profile.major,
    phone_number: profile.phone_number,
    current_standing: profile.current_standing,
    email: userEmail,
  };

  // Listen to authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log('User email:', user.email);
        setUserEmail(user.email); // Get email of the authenticated user
      }
    });
    return unsubscribe;
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    try {
      console.log('Submit clicked');
      setIsSubmitting(true);


      
      // Include the Firebase email when submitting
      
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/userProfile/registerUserProfile`,{payload},  
      {
          headers: { 'Content-Type': 'application/json' },
      }
      );

      if (response.status === 201) {
        toast({
          title: 'Profile created successfully.',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      } else {
        toast({
          title: 'Failed to create profile.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (err) {
      console.error('Error while creating profile:', err);
      toast({
        title: 'Error while creating profile.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const bg = useColorModeValue('gray.100', 'gray.900');
  const boxBg = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.600', 'gray.200');
  const headingColor = useColorModeValue('gray.700', 'white');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  return (
    <form onSubmit={handleSubmit}> {/* Form should be inside the return statement */}
      <Box bg={bg} minH="100vh" py={12}>
        <Container maxW="container.md">
          <Box
            bg={boxBg}
            borderRadius="lg"
            boxShadow="lg"
            p={8}
            borderWidth="1px"
            borderColor={borderColor}
          >
            <Stack spacing={6}>
              <Heading as="h1" size="xl" textAlign="center" color={headingColor} fontWeight="bold">
                Student Profile
              </Heading>

              <Text fontSize="md" color={textColor} textAlign="center">
                Please complete your profile information below
              </Text>

              <Divider />

              <VStack spacing={6} align="stretch">
                <Stack direction={{ base: 'column', md: 'row' }} spacing={6}>
                  <FormControl isRequired>
                    <FormLabel fontWeight="medium">First Name</FormLabel>
                    <Input
                      name="first_name"
                      value={profile.first_name}
                      onChange={handleChange}
                      size="lg"
                      borderColor={borderColor}
                      focusBorderColor="blue.400"
                    />
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel fontWeight="medium">Last Name</FormLabel>
                    <Input
                      name="last_name"
                      value={profile.last_name}
                      onChange={handleChange}
                      size="lg"
                      borderColor={borderColor}
                      focusBorderColor="blue.400"
                    />
                  </FormControl>
                </Stack>

                <FormControl isRequired>
                  <FormLabel fontWeight="medium">Major</FormLabel>
                  <Input
                    name="major"
                    value={profile.major}
                    onChange={handleChange}
                    size="lg"
                    borderColor={borderColor}
                    focusBorderColor="blue.400"
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel fontWeight="medium">Phone Number</FormLabel>
                  <Input
                    name="phone_number"
                    value={profile.phone_number}
                    onChange={handleChange}
                    size="lg"
                    borderColor={borderColor}
                    focusBorderColor="blue.400"
                    placeholder="(123) 456-7890"
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel fontWeight="medium">Current Standing</FormLabel>
                  <Select
                    name="current_standing"
                    value={profile.current_standing}
                    onChange={handleChange}
                    size="lg"
                    borderColor={borderColor}
                    focusBorderColor="blue.400"
                  >
                    <option value="">Select your standing</option>
                    <option value="Freshman">Freshman</option>
                    <option value="Sophomore">Sophomore</option>
                    <option value="Junior">Junior</option>
                    <option value="Senior">Senior</option>
                  </Select>
                </FormControl>

                <Button
                  colorScheme="blue"
                  size="lg"
                  type="submit" // Submit type for form submission
                  isLoading={isSubmitting}
                  loadingText="Submitting"
                  width="full"
                  mt={4}
                  py={6}
                >
                  Save Profile
                </Button>
              </VStack>
            </Stack>
          </Box>
        </Container>
      </Box>
    </form>
  );
};

export default StudentRateDashboard;
