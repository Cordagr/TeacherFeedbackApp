import React, { useEffect, useState } from "react";
import {
    Text,
    Box,
    Tag,
    Image,
    Flex,
    Stack,
    Badge,
    Button,
    HStack,
    Divider
} from "@chakra-ui/react";
import {
    StarIcon,
    EmailIcon,
    ArrowForwardIcon
} from "@chakra-ui/icons";
import {
    getUser,
    setCourses,
    setTeacherRatings
} from '../../utils';

function Profile() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            const fetchedUser = await getUser('tonyxin@berkeley.edu');
            setUser(fetchedUser);
        };
        fetchUserData();
    }, []);

    if (!user) {
        return <Text>Loading...</Text>;
    }

    return (
        <Flex className="profile" height="100%">
            <Flex
                flexDirection="row"
                justifyContent="left"
                alignItems="center"
            >
                <Flex
                    margin="0rem 0rem 0rem 5rem"
                    flexDirection="column"
                    alignItems="center"
                >
                    <Image
                        boxSize="300px"
                        margin="1rem 2rem 1rem 0rem"
                        src={user.imageUrl || 'https://via.placeholder.com/150'}
                        fallbackSrc="https://via.placeholder.com/150"
                    />
                    <Stack direction="row" justifyContent="center" margin="0rem 0rem 1rem 0rem">
                        <Badge>{user.year}</Badge>
                        <Badge colorScheme="green">{user.major}</Badge>
                    </Stack>
                    <Stack direction="row" justifyContent="center">
                        <Badge colorScheme="red">Highly Rated</Badge>
                        <Badge colorScheme="purple">3 Year Member</Badge>
                    </Stack>
                    <Text fontSize="1xl" align="center" margin="0.5rem 0rem 0.15rem 0rem">
                        "Tony is a brilliant mentor"
                    </Text>
                    <Text fontSize="1xl" align="center" margin="0.15rem 0rem 0.15rem 0rem">
                        "with excellent knowledge about"
                    </Text>
                    <Text fontSize="1xl" align="center" margin="0.15rem 0rem 0.15rem 0rem">
                        "not only college, but Computer"
                    </Text>
                    <Text fontSize="1xl" align="center" margin="0.15rem 0rem 0.5rem 0rem">
                        "Science as a whole" - Caleb Kim
                    </Text>
                    <HStack spacing={4}>
                        <Button leftIcon={<EmailIcon />} colorScheme="teal" variant="solid">
                            Message
                        </Button>
                        <Button
                            onClick={async () => {
                                try {
                                    await setCourses(user.email, ["CS 61A", "Data Structures", "AI Fundamentals"]);
                                    await setTeacherRatings(user.email, "Professor Smith", 5);
                                    console.log("Interests and ratings updated.");
                                } catch (error) {
                                    console.error("Error updating profile interaction:", error);
                                }
                            }}
                            rightIcon={<ArrowForwardIcon />}
                            colorScheme="teal"
                            variant="outline"
                        >
                            Connect
                        </Button>
                    </HStack>
                </Flex>

                <Box height="90%">
                    <Divider orientation="vertical" variant="solid" borderWidth="1px" borderColor="teal" margin="0rem 2rem 0rem 0rem" />
                </Box>

                <Box>
                    <Text fontSize="6xl" align="left">{user.firstName} {user.lastName}</Text>

                    <Box>
                        <Tag fontSize="2xl" colorScheme="cyan" mb={2}>Information</Tag>
                        <HStack margin="0.5rem 0rem 1rem 0rem">
                            <Tag fontSize="large" colorScheme="gray">College:</Tag>
                            <Text fontSize="large">{user.college}</Text>
                        </HStack>
                        <HStack margin="1rem 0rem 1rem 0rem">
                            <Tag fontSize="large" colorScheme="gray">Year:</Tag>
                            <Text fontSize="large">{user.year}</Text>
                        </HStack>
                        <HStack margin="1rem 0rem 1rem 0rem">
                            <Tag fontSize="large" colorScheme="gray">Major:</Tag>
                            <Text fontSize="large">{user.major}</Text>
                        </HStack>

                        <Tag fontSize="2xl" colorScheme="cyan" mb={2}>Contact Information</Tag>
                        <HStack margin="0.5rem 0rem 1rem 0rem">
                            <Tag fontSize="large" colorScheme="gray">Phone Number:</Tag>
                            <Text fontSize="large">{user.mobile}</Text>
                        </HStack>
                        <HStack margin="1rem 0rem 1rem 0rem">
                            <Tag fontSize="large" colorScheme="gray">Email:</Tag>
                            <Text fontSize="large">{user.email}</Text>
                        </HStack>
                    </Box>

                    <Text fontSize="1xl" marginTop="1rem">
                        Hi, my name is Tony and I'm a student living in Silicon Valley. I have a passion for creation
                    </Text>
                    <Text fontSize="1xl">
                        and I'm always looking for outlets to express it. Whether it's coding applications, building businesses,
                    </Text>
                    <Text fontSize="1xl">
                        or leading projects, I'm constantly fueled by my desire to create. Take a look at some of the things I've done below!
                    </Text>

                    <Box display="flex" mt="2" alignItems="center">
                        {Array(5)
                            .fill("")
                            .map((_, i) => (
                                <StarIcon
                                    key={i}
                                    color={i < user.rating ? "teal.500" : "gray.300"}
                                />
                            ))}
                        <Box as="span" ml="2" color="gray.600" fontSize="sm">
                            {user.reviewCount} reviews
                        </Box>
                    </Box>
                </Box>
            </Flex>
        </Flex>
    );
}

export default Profile;
