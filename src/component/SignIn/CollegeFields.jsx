import React, { useState } from 'react';
import { CUIAutoComplete } from 'chakra-ui-autocomplete';
import {
  FormControl,
  FormLabel,
  Select,
  Input,
  Flex,
  Button,
  Box,
  useColorModeValue,
  Text,
  useToast,
  FormErrorMessage
} from "@chakra-ui/react";
import { useNavigate } from 'react-router-dom';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from '../../firebase';
import { addUser } from "../../utils";
import axios from 'axios';

// List of college names
const colleges = [
  "University of North Texas",
  "University of Texas at Austin",
  "Texas A&M University",
  "Rice University",
  "University of Houston",
  "Texas State University",
  "Texas Tech University",
  "Southern Methodist University",
  "Baylor University",
  "University of Texas at Dallas"
];

// List of subjects/departments
const subjects = [
  { value: "Computer Science", label: "Computer Science" },
  { value: "Mathematics", label: "Mathematics" },
  { value: "Engineering", label: "Engineering" },
  { value: "Business", label: "Business" },
  { value: "Psychology", label: "Psychology" },
  { value: "Biology", label: "Biology" },
  { value: "Education", label: "Education" },
  { value: "Economics", label: "Economics" },
  { value: "Art", label: "Art" },
  { value: "Other", label: "Other" }
];

export default function CollegeFields() {
  const [pickerItems, setPickerItems] = useState(subjects);
  const [selectedItems, setSelectedItems] = useState([]);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    college: '',
    phone_number: '',
    subject: '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [user] = useAuthState(auth);
  const email = user?.email;

  const navigate = useNavigate();
  const toast = useToast();

  const handleCreateItem = (item) => {
    setPickerItems((curr) => [...curr, item]);
    setSelectedItems((curr) => [...curr, item]);
  };

  const handleSelectedItemsChange = (changes) => {
    if (changes.selectedItems) {
      setSelectedItems(changes.selectedItems);
      // Update the subject in formData whenever selection changes
      const subjectList = changes.selectedItems.map(item => item.value).join(", ");
      setFormData(prev => ({ ...prev, subject: subjectList }));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.first_name) newErrors.first_name = "First name is required";
    if (!formData.last_name) newErrors.last_name = "Last name is required";
    if (!formData.college) newErrors.college = "College selection is required";
    
    // Phone validation
    if (!formData.phone_number) {
      newErrors.phone_number = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phone_number.replace(/\D/g, ''))) {
      newErrors.phone_number = "Please enter a valid 10-digit phone number";
    }
    
    // Subject validation
    if (selectedItems.length === 0) {
      newErrors.subject = "Please select at least one subject";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const formatPhoneNumber = (phoneNumber) => {
    // Remove all non-digits
    const digits = phoneNumber.replace(/\D/g, '');
    return digits;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      toast({
        title: "Form validation failed",
        description: "Please check the form for errors",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    setIsSubmitting(true);
    
    const subjectList = selectedItems.map(item => item.value).join(", ");
    const formattedPhone = formatPhoneNumber(formData.phone_number);
    
    const teacher = {
      first_name: formData.first_name,
      last_name: formData.last_name,
      email,
      subject: subjectList || "Not specified", // Fallback value
      phone_number: formattedPhone,
      college: formData.college,
    };

    console.log("Submitting Teacher:", teacher);

    try {
      // Save to MongoDB backend
      await axios.post("http://localhost:3002/api/userProfile/registerTeacherUserProfile", teacher);

      // Optional: also save to Firebase or Firestore
      addUser(teacher);

      toast({
        title: "Profile created",
        description: "Your teacher profile has been successfully registered",
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      navigate("/TeacherDashboard");
    } catch (error) {
      console.error("Error registering teacher profile:", error);
      // deploy check // 
      toast({
        title: "Registration failed",
        description: error.response?.data?.message || "There was an error saving your profile. Please try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box
      borderColor="blackAlpha.50"
      borderWidth="5px"
      bg={useColorModeValue('gray.50', 'inherit')}
      minH="100vh"
      py="12"
      px={{ base: '4', lg: '8' }}
      margin="-0.5rem 1rem 6rem 1rem"
    >
      <Text fontSize="4xl">Teacher Profile Registration</Text>

      {/* First Name */}
      <FormControl id="first-name" isRequired margin="1rem 0rem" isInvalid={errors.first_name}>
        <FormLabel>First Name</FormLabel>
        <Input
          placeholder="First Name"
          name="first_name"
          value={formData.first_name}
          onChange={handleInputChange}
        />
        <FormErrorMessage>{errors.first_name}</FormErrorMessage>
      </FormControl>

      {/* Last Name */}
      <FormControl id="last-name" isRequired margin="1rem 0rem" isInvalid={errors.last_name}>
        <FormLabel>Last Name</FormLabel>
        <Input
          placeholder="Last Name"
          name="last_name"
          value={formData.last_name}
          onChange={handleInputChange}
        />
        <FormErrorMessage>{errors.last_name}</FormErrorMessage>
      </FormControl>

      {/* College Selection */}
      <FormControl id="college" isRequired margin="1rem 0rem" isInvalid={errors.college}>
        <FormLabel>Select Your College</FormLabel>
        <Select
          placeholder="Select College"
          name="college"
          value={formData.college}
          onChange={handleInputChange}
        >
          {colleges.map((collegeName) => (
            <option key={collegeName} value={collegeName}>{collegeName}</option>
          ))}
        </Select>
        <FormErrorMessage>{errors.college}</FormErrorMessage>
      </FormControl>

      {/* Subject/Department */}
      <FormControl isInvalid={errors.subject} margin="1rem 0rem">
        <FormLabel>Your Department or Subject Area (Required)</FormLabel>
        <CUIAutoComplete
          placeholder="Start typing"
          onCreateItem={handleCreateItem}
          items={pickerItems}
          selectedItems={selectedItems}
          onSelectedItemsChange={handleSelectedItemsChange}
        />
        <FormErrorMessage>{errors.subject}</FormErrorMessage>
      </FormControl>

      {/* Phone Number */}
      <FormControl id="phone-number" isRequired margin="1rem 0rem" isInvalid={errors.phone_number}>
        <FormLabel>Phone Number</FormLabel>
        <Input
          placeholder="(xxx) xxx-xxxx"
          name="phone_number"
          value={formData.phone_number}
          onChange={handleInputChange}
        />
        <FormErrorMessage>{errors.phone_number}</FormErrorMessage>
      </FormControl>

      {/* Submit */}
      <Flex justifyContent="center">
        <Button 
          mt={4} 
          onClick={handleSubmit} 
          colorScheme="teal"
          isLoading={isSubmitting}
          loadingText="Submitting"
        >
          Sign Up
        </Button>
      </Flex>
    </Box>
  );
}