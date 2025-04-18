import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  Flex, Input, Text, WrapItem, Wrap,
  Drawer, DrawerBody, DrawerFooter, DrawerHeader,
  DrawerOverlay, DrawerContent, DrawerCloseButton,
  useDisclosure, Badge, IconButton
} from "@chakra-ui/react";
import { ArrowRightIcon } from "@chakra-ui/icons";
import { StudentBox } from "../StudentBox";
import {
  getUser,
  filterCourse,
  filterTeacherRatings
} from "../../utils";

function Search() {
  const [user, loading] = useAuthState(auth);
  const [studentItems, setStudentItems] = useState([]);
  const [searching, setSearching] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const [chatName, setChatName] = useState('');
  const navigate = useNavigate();

  // On initial load, handle user authentication and fetching user data
  useEffect(() => {
    if (loading) return;

    if (!user) {
      navigate("/signin");
    } else {
      getUser(user.email).then((val) => {
        // User data is fetched, but no recommendations
      });
    }
  }, [user, loading, navigate]);

  // Search function to handle course and teacher filtering
  const searchFor = async (searchVal) => {
    if (searchVal !== '') {
      setSearching(true);

      let users = [];

      // Filter by course and teacher ratings
      const courseResults = await filterCourse(searchVal);
      const teacherResults = await filterTeacherRatings(searchVal);

      if (courseResults.length > 0) {
        users = [...users, ...courseResults];
      }

      if (teacherResults.length > 0) {
        users = [...users, ...teacherResults];
      }

      updateStudentItems(users);
    } else {
      setSearching(false);
    }
  };

  // Helper function to update student items
  const updateStudentItems = (users) => {
    setStudentItems(users.map((client) => (
      <WrapItem key={client.email}>
        <StudentBox
          setChatName={setChatName}
          onOpen={onOpen}
          btnRef={btnRef}
          imageUrl={client.imageUrl}
          firstName={client.firstName}
          lastName={client.lastName}
          highschool={client.college}
          grade={client.year}
          major={client.major}
        />
      </WrapItem>
    )));
  };

  return (
    <Flex flexDirection="column" padding="3rem 10rem 0 10rem" alignItems="left">
      <Flex flexDirection="row" alignItems="center">
        <Input
          height="60px"
          fontSize="30px"
          placeholder="Search"
          onChange={(e) => searchFor(e.currentTarget.value)}
        />
      </Flex>

      {!searching && (
        <Text fontSize="3xl" mt={5}>Search results</Text>
      )}

      <Wrap mt={3}>
        {studentItems}
      </Wrap>

      <Drawer isOpen={isOpen} placement="right" onClose={onClose} finalFocusRef={btnRef}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Message {chatName}</DrawerHeader>

          <DrawerBody>
            <Text fontSize="xl" mb={1}><Badge fontSize="0.7em">Hi! My name is Tony</Badge></Text>
            <Text align="right" fontSize="xl" mb={1}>
              <Badge fontSize="0.7em" colorScheme="blue">When do you want to meet?</Badge>
            </Text>
            <Text fontSize="xl" mb={1}><Badge fontSize="0.7em">Does 11am tomorrow work?</Badge></Text>
            <Text align="right" fontSize="xl" mb={1}>
              <Badge fontSize="0.7em" colorScheme="blue">Yeah! See you then!</Badge>
            </Text>
          </DrawerBody>

          <DrawerFooter>
            <Input placeholder="Type here..." />
            <IconButton colorScheme="blue" aria-label="Send message" icon={<ArrowRightIcon />} />
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Flex>
  );
}

export default Search;
