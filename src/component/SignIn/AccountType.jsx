import React, { useState } from 'react';
import {
  Box,
  SimpleGrid,
  useColorModeValue,
  Text,
  VStack,
} from '@chakra-ui/react';
import { FaUserGraduate } from 'react-icons/fa';
import { SiHive } from 'react-icons/si';
import { ActionButton } from './ActionButton';
import { StudentFields } from './StudentFields';
import { CollegeFields } from './CollegeFields';

const AccountType = () => {
  const [page, setPage] = useState(1); // 1: Select, 2: Student, 3: Teacher

  if (page === 2) return <StudentFields onBack={() => setPage(1)} />;
  if (page === 3) return <CollegeFields onBack={() => setPage(1)} />;

  return (
    <Box
      as="section"
      position="static"
      bg={useColorModeValue('gray.50', 'gray.800')}
      py="67"
      px={{ base: '4', md: '200px' }}
    >
      <SimpleGrid
        columns={{ base: 1, lg: 2 }}
        spacing={{ base: '8px', lg: '100px' }}
        maxW="9xl"
        mx="auto"
        justifyItems="center"
        alignItems="center"
      >
        {/* Student Section */}
        <Box
          bg={useColorModeValue('white', 'gray.700')}
          py="8"
          px="10"
          shadow="base"
          rounded="lg"
          textAlign="center"
        >
          <FaUserGraduate size="50px" />
          <Text fontSize="2xl" mt="4" fontWeight="bold">
            Student
          </Text>
          <VStack mt="4" align="start">
            <Text>Connect with current college students</Text>
            <Text>Receive personalized college counseling</Text>
            <Text>Get advice on college admissions, majors, and campus life</Text>
          </VStack>
          <ActionButton onClick={() => setPage(2)} mt="6">
            Register as Student
          </ActionButton>
        </Box>

        {/* Teacher Section */}
        <Box
          bg={useColorModeValue('white', 'gray.700')}
          py="8"
          px="10"
          shadow="base"
          rounded="lg"
          textAlign="center"
        >
          <SiHive size="50px" />
          <Text fontSize="2xl" mt="4" fontWeight="bold">
            Teacher
          </Text>
          <VStack mt="4" align="start">
            <Text>Create and manage courses for students to rate</Text>
            <Text>Receive valuable feedback from students to improve your teaching</Text>
            <Text>Respond to student reviews and interact with them for better course engagement</Text>
          </VStack>
          <ActionButton onClick={() => setPage(3)} mt="6">
            Register as Teacher
          </ActionButton>
        </Box>
      </SimpleGrid>
    </Box>
  );
};

export default AccountType;
