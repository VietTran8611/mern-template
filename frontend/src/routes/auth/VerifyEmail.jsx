import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
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
    InputRightElement,
    Text
  } from "@chakra-ui/react";

export const VerifyEmail = () => {
    const [code, setCode] = useState(["", "", "", "", "", ""]);
	const inputRefs = useRef([]);
	const navigate = useNavigate();

    const { error, isLoading, verifyEmail,autoVerifyEmail,user } = useAuthStore();

    const handleChange = (index, value) => {
        const newCode = [...code];

		// Handle pasted content
		if (value.length > 1) {
			const pastedCode = value.slice(0, 6).split("");
			for (let i = 0; i < 6; i++) {
				newCode[i] = pastedCode[i] || "";
			}
			setCode(newCode);

			// Focus on the last non-empty input or the first empty one
			const lastFilledIndex = newCode.findLastIndex((digit) => digit !== "");
			const focusIndex = lastFilledIndex < 5 ? lastFilledIndex + 1 : 5;
			inputRefs.current[focusIndex].focus();
		} else {
			newCode[index] = value;
			setCode(newCode);

			// Move focus to the next input field if value is entered
			if (value && index < 5) {
				inputRefs.current[index + 1].focus();
			}
		}
    }

    const handleKeyDown = (index, e) => {
		if (e.key === "Backspace" && !code[index] && index > 0) {
			inputRefs.current[index - 1].focus();
		}
	};

    const handleSubmit = async (e) => {
        e.preventDefault();
		const verificationCode = code.join("");
        try {
            await verifyEmail(verificationCode)
            navigate("/")
            toast.success("email verification successfully")
        } catch (error) {
            console.log(error)
        }
    }


    useEffect(() => {
		if (code.every((digit) => digit !== "")) {
			handleSubmit(new Event("submit"));
		}
	}, [code]);

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
            <Heading color="teal.400">Verify Your Email</Heading>
            <Text>Enter the 6-digit code sent to your email address.</Text>
            <Box minW={{ base: "90%", md: "400px" }}>
                    <form onSubmit={handleSubmit}>
                        <Stack
                        spacing={4}
                        p="1rem"
                        backgroundColor="whiteAlpha.900"
                        boxShadow="md"
                        >
                            <Flex justify="space-between">
                                {code.map((digit, index) => (
                                    <Input 
                                        borderColor="black.400"   
                                        width="3rem"
                                        key={index}
                                        ref={(el) => (inputRefs.current[index] = el)}
                                        type='text'
                                        maxLength='6'
                                        value={digit}
                                        onChange={(e) => handleChange(index, e.target.value)}
                                        onKeyDown={(e) => handleKeyDown(index, e)}
                                    />
                                ))}
                            </Flex>
                            {error && <Text>{error}</Text>}
                            <Button
                                borderRadius={0}
                                type="submit"
                                variant="solid"
                                colorScheme="teal"
                                width="full"
                            >
                                {isLoading ? "Verifying..." : "Verify Email"}
                            </Button>
                            <Text cursor="pointer" onClick={()=>{toast.success(user.verificationToken)}} className='auth-input-btn'>show code</Text>
                    </Stack>
                </form>
            </Box>
        </Stack>
    </Flex>
  )
}
