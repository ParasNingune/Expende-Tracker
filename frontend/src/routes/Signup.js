// Signup Page
import {React, useState} from 'react'
import { Box, Button, Divider, Heading, Input, Link } from "@chakra-ui/react"
import { Link as RouterLink } from 'react-router-dom';
import { auth, db, app } from '../fireBaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from "firebase/firestore";

export default function Login() {

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
  });

  return (
    <Box
      height="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      background="linear-gradient(135deg, #a8dadc, #f1faee)"  // Soft gradient for a calm, professional feel
    >
      <Box
        width={["90%", "80%", "40%"]}
        height={["90%", "80%", "70%"]}
        backgroundColor="white"
        borderRadius="lg"
        boxShadow="lg"
        display="flex"
        flexDirection="column"
        alignItems="center"
        padding={6}
        border="1px solid #e2e8f0"
        >
        <Heading
          marginTop={["5%", "5%", "5%"]}
          fontSize={["4xl", "5xl", "6xl"]}
          fontWeight="bold"
          color="green.500"  // Green for finance
          letterSpacing="wider"
        >
          Sign Up
        </Heading>

        <Divider 
          bg="gray.400"  
          width="80%" 
          marginTop={["4%", "4%", "3%"]}  
          height={0.5}
        />

        <Input
          variant="filled"
          placeholder="Email-Id"
          width="80%"
          marginTop={["6%", "6%", "10%"]}
          height="50px"
          borderRadius="md"
          _focus={{ borderColor: "green.500", boxShadow: "0 0 0 2px rgba(66, 153, 225, 0.6)" }}
          boxShadow="md"
        />

        <Input
          variant="filled"
          placeholder="Password"
          width="80%"
          marginTop={["6%", "6%", "8%"]}
          height="50px"
          borderRadius="md"
          _focus={{ borderColor: "green.500", boxShadow: "0 0 0 2px rgba(66, 153, 225, 0.6)" }}
          boxShadow="md"
        />

        <Button
          width={["80%", "70%", "60%"]}
          height="50px"
          bg="green.500"
          textColor="white"
          marginTop={["8%", "8%", "10%"]}
          borderRadius="md"
          _hover={{ bg: "green.600" }}
          boxShadow="md"
          transition="all 0.3s ease"
        >
          Sign Up
        </Button>

        <Link
          as={RouterLink}
          to="/login"
          marginTop="3%"
          color="green.500"
          fontSize="md"
          _hover={{ textDecoration: "underline" }}
        >
          Already have an account? Login
        </Link>
      </Box>
    </Box>
    )
  }
