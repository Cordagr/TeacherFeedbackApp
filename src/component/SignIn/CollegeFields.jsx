import React, { useState } from 'react';
import { CUIAutoComplete } from 'chakra-ui-autocomplete';
import MainDashboard from '../MainDashboard/MainDashboard'; // Ensure this path is correct
import {
  FormControl,
  FormLabel,
  Select,
  Radio,
  HStack,
  RadioGroup,
  Input,
  Flex,
  Button,
  Box,
  useColorModeValue,
  Text
} from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";
import { addUser } from "../../utils";
import { useNavigate } from 'react-router-dom'; // fixed: useNavigate instead of useHistory
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from '../../firebase';

// Theme setup
const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: mode("gray.50", "gray.800"),
        color: mode("gray.800", "white"),
      },
      a: {
        color: "teal.500",
        _hover: { textDecoration: "underline" },
      },
    },
  },
});

// List of majors
const majors = [
  { value: "Architecture", label: "Architecture" },
  { value: "Anthropology", label: "Anthropology" },
  { value: "Biology", label: "Biology" },
  { value: "Biomedical Engineering", label: "Biomedical Engineering" },
  { value: "Business Administration", label: "Business Administration" },
  { value: "Chemistry", label: "Chemistry" },
  { value: "Computer Science", label: "Computer Science" },
  { value: "Dance", label: "Dance" },
  { value: "Dentistry", label: "Dentistry" },
  { value: "Economics", label: "Economics" },
  { value: "Education", label: "Education" },
  { value: "English", label: "English" },
  { value: "Finance", label: "Finance" },
  { value: "French", label: "French" },
  { value: "Geography", label: "Geography" },
  { value: "History", label: "History" },
  { value: "International Studies", label: "International Studies" },
  { value: "Journalism", label: "Journalism" },
  { value: "Korean", label: "Korean" },
  { value: "Law", label: "Law" },
  { value: "Management", label: "Management" },
  { value: "Neuroscience", label: "Neuroscience" },
  { value: "Optometry", label: "Optometry" },
  { value: "Psychology", label: "Psychology" },
  { value: "Public Health", label: "Public Health" },
  { value: "Sociology", label: "Sociology" },
  { value: "Spanish", label: "Spanish" },
  { value: "Statistics", label: "Statistics" },
  { value: "Teaching", label: "Teaching" },
  { value: "Web Design", label: "Web Design" },
  { value: "Zoology", label: "Zoology" },
  { value: "Undecided", label: "Undecided" }
];

export default function CollegeFields() {
  const [pickerItems, setPickerItems] = useState(majors);
  const [selectedItems, setSelectedItems] = useState([]);
  const [college, setCollege] = useState('');
  const [grade, setGrade] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const [user] = useAuthState(auth);
  const email = user?.email;
  const photoUrl = user?.photoURL;
  const firstName = user?.displayName?.split(" ")[0];
  const lastName = user?.displayName?.split(" ")[1];

  const navigate = useNavigate(); // updated from useHistory

  // Handle adding majors
  const handleCreateItem = (item) => {
    setPickerItems((curr) => [...curr, item]);
    setSelectedItems((curr) => [...curr, item]);
  };

  // Handle major selection changes
  const handleSelectedItemsChange = (changes) => {
    if (changes.selectedItems) {
      setSelectedItems(changes.selectedItems);
    }
  };

  // Handle form submission
  const handleSubmit = () => {
    const majorList = selectedItems.map(item => item.value).join(", ");
    const mentor = {
      firstName,
      lastName,
      type: 'college',
      mobile: phoneNumber,
      email,
      year: grade,
      college,
      major: majorList,
      imageUrl: photoUrl,
      rating: 0,
      reviewCount: 0,
    };
    console.log("Submitted Mentor:", mentor);
    addUser(mentor); // Save mentor data to Firebase
    navigate("/MainDashboard"); // fixed: navigate instead of history.replace
  };

  return (
    <Box
      alignContent="top"
      borderColor="blackAlpha.50"
      borderWidth="5px"
      bg={useColorModeValue('gray.50', 'inherit')}
      minH="100vh"
      py="12"
      px={{ base: '4', lg: '8' }}
      margin="-0.5rem 1rem 6rem 1rem"
    >
      <Text fontSize="4xl">Welcome {firstName} {lastName}!</Text>

      {/* College Selection */}
      <FormControl id="school" isRequired margin="1rem 0rem">
        <FormLabel>Search for your institution</FormLabel>
        <Select
          placeholder="Select College/University"
          onChange={(e) => setCollege(e.currentTarget.value)}
        >
          <option>University of California Berkeley</option>
          <option>University of California Santa Cruz</option>
          <option>University of California Riverside</option>
          <option>University of California Los Angeles</option>
          <option>University of California Irvine</option>
          <option>University of California San Diego</option>
          <option>University of Southern California</option>
          <option>Harvard University</option>
          <option>Stanford University</option>
          <option>Columbia University</option>
          <option>Yale University</option>
          <option>Brown University</option>
          <option>Massachusetts Institute of Technology</option>
        </Select>
      </FormControl>

      {/* Major Selection */}
      <CUIAutoComplete
        margin="1rem 0rem"
        label="Select your major"
        placeholder="Start typing"
        onCreateItem={handleCreateItem}
        items={pickerItems}
        selectedItems={selectedItems}
        onSelectedItemsChange={handleSelectedItemsChange}
      />

      {/* Year in School */}
      <FormControl as="fieldset" isRequired margin="1rem 0rem">
        <FormLabel as="legend">Year in School</FormLabel>
        <RadioGroup defaultValue="Senior" onChange={setGrade}>
          <HStack spacing="50px">
            <Radio value="Freshman">Freshman</Radio>
            <Radio value="Sophomore">Sophomore</Radio>
            <Radio value="Junior">Junior</Radio>
            <Radio value="Senior">Senior</Radio>
          </HStack>
        </RadioGroup>
      </FormControl>

      {/* Phone Number */}
      <FormControl id="phone-number" isRequired margin="1rem 0rem">
        <FormLabel>Phone Number</FormLabel>
        <Input
          placeholder="(xxx) xxx-xxxx"
          onChange={(e) => setPhoneNumber(e.currentTarget.value)}
        />
      </FormControl>

      {/* Submit Button */}
      <Flex justifyContent="center">
        <Button mt={4} onClick={handleSubmit} colorScheme="teal">
          Signup
        </Button>
      </Flex>
    </Box>
  );
}
