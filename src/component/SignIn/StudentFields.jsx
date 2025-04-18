import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Select,
  Text,
  useColorModeValue
} from "@chakra-ui/react";
import { CUIAutoComplete } from "chakra-ui-autocomplete";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
import { addUser } from "../../utils";
import MainDashboard from "../MainDashboard/MainDashboard";

const majors = [
  { value: "Computer Science", label: "Computer Science" },
  { value: "Engineering", label: "Engineering" },
  { value: "Biology", label: "Biology" },
  { value: "Psychology", label: "Psychology" },
  { value: "Literature", label: "Literature" },
  { value: "Mathematics", label: "Mathematics" },
  { value: "History", label: "History" },
  { value: "Physics", label: "Physics" },
  { value: "Business", label: "Business" },
  { value: "Economics", label: "Economics" },
  { value: "Undecided", label: "Undecided" }
];

export const StudentReviewForm = () => {
  const [pickerItems, setPickerItems] = useState(majors);
  const [selectedItems, setSelectedItems] = useState([]);

  const [user] = useAuthState(auth);
  const email = user?.email || "";
  const photoUrl = user?.photoURL || "";
  const [firstName, lastName] = user?.displayName?.split(" ") || ["", ""];

  const [firstname, setFirstname] = useState(firstName);
  const [lastname, setLastname] = useState(lastName);
  const [state, setState] = useState("");
  const [semester, setSemester] = useState("");
  const [classFeedback, setClassFeedback] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [teacherName, setTeacherName] = useState(""); 
  const navigate = useNavigate();

  const handleCreateItem = (item) => {
    setPickerItems((curr) => [...curr, item]);
    setSelectedItems((curr) => [...curr, item]);
  };

  const handleSelectedItemsChange = (changes) => {
    if (changes.selectedItems) {
      setSelectedItems(changes.selectedItems);
    }
  };

  const handleSubmit = () => {
    const majorList = selectedItems.map((item) => item.value);
    const review = {
      firstName: firstname,
      lastName: lastname,
      email,
      phoneNumber,
      state,
      majorInterests: majorList,
      semester,
      teacherName,
      classFeedback,
      imageUrl: photoUrl,
    };
    console.log("Review Submitted: ", review);
    addUser(review);
    navigate("/dashboard");
  };

  return (
    <Box
      borderColor="blackAlpha.50"
      borderWidth="5px"
      bg={useColorModeValue("gray.50", "inherit")}
      minH="100vh"
      py="12"
      px={{ base: "4", lg: "8" }}
      margin="1rem 1rem 6rem 1rem"
    >
      <Text fontSize="4xl">Welcome {firstname} {lastname}!</Text>

      <FormControl id="state" isRequired margin="1rem 0rem 1rem 0rem">
        <FormLabel>State</FormLabel>
        <Select placeholder="Select state" onChange={(e) => setState(e.currentTarget.value)}>
          <option>Alabama</option>
          <option>Alaska</option>
          <option>Arizona</option>
          <option>California</option>
          <option>Texas</option>
          {/* Add the full list of states */}
        </Select>
      </FormControl>

      <FormControl id="semester" isRequired margin="1rem 0rem 1rem 0rem">
        <FormLabel>Semester</FormLabel>
        <Select onChange={(e) => setSemester(e.currentTarget.value)}>
          <option>Fall</option>
          <option>Spring</option>
          <option>Summer</option>
        </Select>
      </FormControl>

      <FormControl id="teacherName" isRequired margin="1rem 0rem 1rem 0rem">
        <FormLabel>Teacher Name</FormLabel>
        <Input placeholder="Enter teacher's name" onChange={(e) => setTeacherName(e.currentTarget.value)} />
      </FormControl>

      <FormControl id="classFeedback" isRequired margin="1rem 0rem 1rem 0rem">
        <FormLabel>Class Feedback</FormLabel>
        <Input
          placeholder="Provide feedback on the class"
          onChange={(e) => setClassFeedback(e.currentTarget.value)}
        />
      </FormControl>

      <CUIAutoComplete
        margin="1rem 0rem 1rem 0rem"
        label="Select your major interests"
        placeholder="Start typing"
        onCreateItem={handleCreateItem}
        items={pickerItems}
        selectedItems={selectedItems}
        onSelectedItemsChange={handleSelectedItemsChange}
      />

      <FormControl id="phoneNumber" isRequired margin="1rem 0rem 1rem 0rem">
        <FormLabel>Phone Number</FormLabel>
        <Input
          placeholder="(xxx) xxx-xxxx"
          onChange={(e) => setPhoneNumber(e.currentTarget.value)}
        />
      </FormControl>

      <Flex justifyContent="center">
        <Button mt={4} onClick={handleSubmit} colorScheme="teal">
          Submit Review
        </Button>
      </Flex>
    </Box>
  );
};
