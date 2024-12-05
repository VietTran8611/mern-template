import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import {
    Flex,
    Heading,
    Input,
    Button,
    InputGroup,
    Stack,
    InputLeftElement,
    chakra,
    Box,
    Link,
    Avatar,
    FormControl,
    FormHelperText,
    InputRightElement
  } from "@chakra-ui/react";
  import { FaUserAlt, FaLock } from "react-icons/fa";
import { useAuthStore } from '../../store/authStore';
  const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

export const RegisterPage = () => {
    const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
	const navigate = useNavigate();
    const {signup, error, isLoading} = useAuthStore()

    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordCopy, setShowPasswordCopy] = useState(false);

    const handleShowClick = () => setShowPassword(!showPassword);
    const handleShowClickCopy = () => setShowPasswordCopy(!showPasswordCopy);
    const handleSignUp = async (e) => {
        e.preventDefault();
        if(password!= password2){
            toast.error("password not matched")
            return
        }
        try {
            await signup(email,password,name)
            navigate('/verify-email')
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)
        }
    }

  return (
    <Flex
    flexDirection="column"
    width="100wh"
    height="100vh"
    backgroundColor="gray.200"
    justifyContent="center"
    alignItems="center"
  >
    <Stack
      flexDir="column"
      mb="2"
      justifyContent="center"
      alignItems="center"
    >
      <Avatar bg="teal.500" />
      <Heading color="teal.400">Welcome</Heading>
      <Box minW={{ base: "90%", md: "468px" }}>
        <form onSubmit={handleSignUp}>
          <Stack
            spacing={4}
            p="1rem"
            backgroundColor="whiteAlpha.900"
            boxShadow="md"
          >
            <FormControl>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<CFaUserAlt color="gray.300" />}
                />
                <Input type="text" placeholder="Name " onChange={(e) => setName(e.target.value)}/>
              </InputGroup>
            </FormControl>
            <FormControl>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<CFaUserAlt color="gray.300" />}
                />
                <Input type="email" placeholder="email address" onChange={(e) => setEmail(e.target.value)}/>
              </InputGroup>
            </FormControl>
            <FormControl>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  color="gray.300"
                  children={<CFaLock color="gray.300" />}
                />
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                    {showPassword ? "Hide" : "Show"}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <FormControl>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  color="gray.300"
                  children={<CFaLock color="gray.300" />}
                />
                <Input
                  type={showPasswordCopy ? "text" : "password"}
                  placeholder="Confirm password"
                  onChange={(e) => setPassword2(e.target.value)}
                />
                <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" onClick={handleShowClickCopy}>
                    {showPasswordCopy ? "Hide" : "Show"}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Button
              borderRadius={0}
              type="submit"
              variant="solid"
              colorScheme="teal"
              width="full"
            >
              Register
            </Button>
          </Stack>
        </form>
      </Box>
    </Stack>
    <Box>
      Already have an account?{" "}
      <Link color="teal.500" href="#">
        Log in
      </Link>
    </Box>
  </Flex>
  )
}
