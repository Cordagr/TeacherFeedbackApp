import React, { useState } from 'react';
import { Box, Button, Heading, Input, Text, Code, useToast } from '@chakra-ui/react';
import { addDoc, collection, doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase'; // adjust path as needed

function generateInviteCode(length = 10) {
  return Math.random().toString(36).substr(2, length) +
         Math.random().toString(36).substr(2, length);
}

const TeacherDashboard = () => {
  const [className, setClassName] = useState('');
  const [classTime, setClassTime] = useState('');
  const [inviteCode, setInviteCode] = useState('');
  const toast = useToast();
  const user = auth.currentUser;

  const handleCreateClass = async () => {
    if (!user) return;

    const code = generateInviteCode();
    setInviteCode(code);

    const teacherDoc = await getDoc(doc(db, 'users', user.uid));
    const teacherName = teacherDoc.data()?.name || 'Unknown';

    await addDoc(collection(db, 'classes'), {
      name: className,
      teacherId: user.uid,
      teacherName,
      time: classTime,
      inviteCode: code,
      students: [],
    });

    toast({
      title: 'Class created!',
      description: 'Invite link generated successfully.',
      status: 'success',
      duration: 4000,
      isClosable: true,
    });

    // Clear fields
    setClassName('');
    setClassTime('');
  };

  return (
    <Box p={6}>
      <Heading>Create a Class</Heading>
      <Input
        mt={3}
        placeholder="Class Name (e.g., Calculus I)"
        value={className}
        onChange={(e) => setClassName(e.target.value)}
      />
      <Input
        mt={3}
        placeholder="Class Time (e.g., Mon & Wed, 10:00 AM - 11:30 AM)"
        value={classTime}
        onChange={(e) => setClassTime(e.target.value)}
      />
      <Button mt={4} colorScheme="green" onClick={handleCreateClass}>
        Create Class
      </Button>

      {inviteCode && (
        <Box mt={4}>
          <Text fontWeight="bold">Invite Link:</Text>
          <Code>{`${window.location.origin}/join/${inviteCode}`}</Code>
        </Box>
      )}
    </Box>
  );
};

export default TeacherDashboard;
