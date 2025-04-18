import React, { useState } from 'react';
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      console.log('Submit clicked');
      setIsSubmitting(true);
      
      const response = await axios.post('http://localhost:3001/api/userProfile/registerUserProfile', profile, {
        headers: { 'Content-Type': 'application/json' },
      });

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
            <Heading 
              as="h1" 
              size="xl" 
              textAlign="center" 
              color={headingColor}
              fontWeight="bold"
            >
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
                onClick={() => {
                  console.log("Button clicked");
                  handleSubmit();
                }}
                size="lg"
                type="button"
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
  );
};

export default StudentRateDashboard;