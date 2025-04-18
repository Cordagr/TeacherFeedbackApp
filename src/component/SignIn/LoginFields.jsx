import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Change useHistory to useNavigate
import { auth, signInWithGoogle } from "../../firebase"; // Ensure signInWithGoogle is imported from firebase.js
import { useAuthState } from "react-firebase-hooks/auth"; // For tracking auth state

import {
  Box,
  Button,
  Heading,
  SimpleGrid,
  Text,
  useColorModeValue,
  VisuallyHidden,
} from '@chakra-ui/react'
import { FaFacebook, FaGithub, FaGoogle } from 'react-icons/fa'
import { Card } from './Card' // Assuming this is a reusable component
import { DividerWithText } from './DividerWithText' // Assuming this is for the divider between options
import { LoginForm } from './LoginForm' // Your custom login form component

export const LoginFields = (props) => {
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate(); // Use useNavigate instead of useHistory

  // Redirect if user is already authenticated
  useEffect(() => {
    if (user) {
      navigate("/dashboard"); // Redirect to dashboard or a relevant page
    }
  }, [user, navigate]); // Use navigate in dependencies

  return (
    <Box
      bg={useColorModeValue('gray.50', 'inherit')}
      minH="100vh"
      py="12"
      px={{ base: '4', lg: '8' }}
    >
      <Box maxW="md" mx="auto">
        <Heading textAlign="center" size="xl" fontWeight="extrabold">
          Sign in to your account
        </Heading>
        <Text mt="4" mb="8" align="center" maxW="md" fontWeight="medium">
          <Text as="span">Don&apos;t have an account? </Text>
          <Link to="/signup">Sign up here</Link>
        </Text>
        <Card>
          <LoginForm /> {/* Custom login form */}
          <DividerWithText mt="6">or continue with</DividerWithText>
          <SimpleGrid mt="6" columns={3} spacing="3">
            <Button color="currentColor" variant="outline">
              <VisuallyHidden>Login with Facebook</VisuallyHidden>
              <FaFacebook />
            </Button>
            <Button color="currentColor" variant="outline" onClick={signInWithGoogle}>
              <VisuallyHidden>Login with Google</VisuallyHidden>
              <FaGoogle />
            </Button>
            <Button color="currentColor" variant="outline">
              <VisuallyHidden>Login with Github</VisuallyHidden>
              <FaGithub />
            </Button>
          </SimpleGrid>
        </Card>
      </Box>
    </Box>
  );
};

export default LoginFields;
