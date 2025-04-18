'use client';

import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import SignIn from './component/SignIn/SignIn'
// import MainDashboard from './Components/MainDashboard/MainDashboard';
import StudentRateDashboard from './component/StudentRateDashboard/StudentRateDashboard';
import ClassDashboard from './component/ClassDashboard/ClassDashboard';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";
import { getUser } from "./utils";
import Profile from './component/Profile/Profile';
import Search from './component/Search/Search';
import SignUp from './component/SignUp/SignUp';

import MainDashboard from "./component/MainDashboard/MainDashboard";


const theme = extendTheme({
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
  styles: {
    global: {
      body: {
        bg: "gray.100", // use `bg` instead of `backgroundColor` for Chakra
        color: "gray.800",
      },
    },
  },
  colors: {
    brand: {
      50: '#f5f5f5',
      100: '#e0e0e0',
      200: '#c2c2c2',
      300: '#a3a3a3',
      400: '#858585',
      500: '#666666',
      600: '#4d4d4d',
      700: '#333333',
      800: '#1a1a1a',
      900: '#000000',
    },
  },
  fonts: {
    heading: "'Roboto', sans-serif",
    body: "'Arial', sans-serif",
  },
});

function App() {
  const [user, loading] = useAuthState(auth);
  const [loaded, setLoaded] = useState(false);
  const [type, setType] = useState('');
  const navigate = useNavigate();
 

  useEffect(() => {
    if (loading) return;
  
    const currentPath = window.location.pathname;
  
    if (!user) {
      // User not logged in → redirect to SignIn
      if (currentPath !== "/signin") {
        navigate("/signin");
      }
      return;
    }
  
    // Firebase user exists
    const fetchUser = async () => {
      const firestoreUser = await getUser(user.email);
  
      if (firestoreUser?.type) {
        setType(firestoreUser.type);
        setLoaded(true);
  
        // If not already on dashboard, redirect
        if (!currentPath.startsWith("/MainDashboard")) {
          navigate("/MainDashboard");
        }
      } else {
        // User exists in Firebase Auth but not Firestore
        // Redirect to onboarding steps (like extra user info form)


        if (!currentPath.startsWith("/onboarding")) {
          //
        }
      }
    };
  
    fetchUser();
  }, [user, loading, navigate]);
  
    
  return (
    <ChakraProvider theme={theme}>
      <Routes>
        <Route path="/SignIn" element={<SignIn />} />
        <Route path='/' element={<SignIn />} />
        {loaded && type ? (
          <Route path="/dashboard" element={type === 'high-school' ? <StudentRateDashboard /> : <ClassDashboard />} />
        ) : null}
        <Route path="/class" element={<ClassDashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/search" element={<Search />} />
        <Route path="/student" element={<StudentRateDashboard />} />
        <Route path="/dashboard" element={<MainDashboard/>} />
        <Route path="StudentDashboard" element={<StudentRateDashboard />} />
      </Routes>
    </ChakraProvider>
  );
}

export default App;
