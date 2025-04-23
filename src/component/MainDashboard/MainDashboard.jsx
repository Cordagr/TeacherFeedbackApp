import React from 'react';
import { 
  Box, 
  Button, 
  Heading, 
  SimpleGrid, 
  Text, 
  Container,
  useColorModeValue,
  Flex,
  Icon
} from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';
import { FiLogOut, FiUser, FiSearch, FiBookOpen } from 'react-icons/fi';

const MainDashboard = () => {
  const navigate = useNavigate();
  
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <Box 
      minH="100vh" 
      bg="black" 
      color="white" 
      position="relative"
      py={10}
    >
      {/* Glass-like container */}
      <Container 
        maxW="container.md" 
        bg="rgba(25, 25, 25, 0.8)"
        backdropFilter="blur(10px)"
        borderRadius="xl"
        p={8}
        boxShadow="0 4px 30px rgba(0, 0, 0, 0.5)"
        border="1px solid rgba(255, 255, 255, 0.05)"
      >
        {/* Sign Out Button */}
        <Box position="absolute" top={6} right={6}>
          <Button 
            variant="outline" 
            borderColor="red.500"
            color="red.400"
            _hover={{ bg: "rgba(229, 62, 62, 0.15)" }}
            rightIcon={<FiLogOut />}
            onClick={handleSignOut}
          >
            Sign Out
          </Button>
        </Box>

        <Flex direction="column" align="center" mb={10}>
          <Heading 
            as="h1" 
            size="xl" 
            mb={4}
            bgGradient="linear(to-r, gray.300, white)"
            bgClip="text"
          >
            Welcome to the Dashboard
          </Heading>
          
          <Text fontSize="lg" color="gray.400" textAlign="center">
            Choose your section to get started:
          </Text>
        </Flex>

        <SimpleGrid 
          columns={{ base: 1, sm: 2, md: 3 }} 
          spacing={6} 
          mt={8}
        >
          <Button 
            as={Link} 
            to="/ClassDashboard" 
            size="lg" 
            height="100px"
            bg="transparent"
            border="1px solid rgba(255, 255, 255, 0.1)"
            color="white"
            _hover={{ 
              bg: "rgba(255, 255, 255, 0.05)", 
              borderColor: "teal.400",
              transform: "translateY(-2px)",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)"
            }}
            _active={{ bg: "rgba(255, 255, 255, 0.1)" }}
            transition="all 0.3s ease"
            borderRadius="md"
            display="flex"
            flexDirection="column"
            justifyContent="center"
          >
            <Icon as={FiBookOpen} fontSize="24px" mb={2} />
            <Text>Student Dashboard</Text>
          </Button>
          
          <Button 
            as={Link} 
            to="/profile" 
            size="lg"
            height="100px"
            bg="transparent"
            border="1px solid rgba(255, 255, 255, 0.1)"
            color="white"
            _hover={{ 
              bg: "rgba(255, 255, 255, 0.05)", 
              borderColor: "purple.400",
              transform: "translateY(-2px)",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)"
            }}
            _active={{ bg: "rgba(255, 255, 255, 0.1)" }}
            transition="all 0.3s ease"
            borderRadius="md"
            display="flex"
            flexDirection="column"
            justifyContent="center"
          >
            <Icon as={FiUser} fontSize="24px" mb={2} />
            <Text>Profile</Text>
          </Button>
          
          <Button 
            as={Link} 
            to="/search" 
            size="lg"
            height="100px"
            bg="transparent"
            border="1px solid rgba(255, 255, 255, 0.1)"
            color="white"
            _hover={{ 
              bg: "rgba(255, 255, 255, 0.05)", 
              borderColor: "orange.400",
              transform: "translateY(-2px)",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)"
            }}
            _active={{ bg: "rgba(255, 255, 255, 0.1)" }}
            transition="all 0.3s ease"
            borderRadius="md"
            display="flex"
            flexDirection="column"
            justifyContent="center"
          >
            <Icon as={FiSearch} fontSize="24px" mb={2} />
            <Text>Search</Text>
          </Button>
        </SimpleGrid>
      </Container>
    </Box>
  );
};

export default MainDashboard;