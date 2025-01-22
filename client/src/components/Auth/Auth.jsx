import { Box, Stack, Input } from "@chakra-ui/react";
import { useState } from "react";
import { Field } from "../ui/field";
import { Button } from "../ui/button";

const Auth = () => {
  const [isSignup, setIsSignup] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const switchMode = () => {
    setIsSignup((prevState) => !prevState);
    // Reset the form data when switching modes
    setFormData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  const submitHandler = () => {
    if (isSignup && formData.password !== formData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    console.log("Form submitted:", {
      name: formData.name,
      email: formData.email,
      password: formData.password,
    });
  };

  return (
    <Box maxW="400px" mx="auto" mt="8">
      <Stack spacing={6} p={6} borderWidth={1} borderRadius="md" shadow="sm">
        <Box fontSize="2xl" fontWeight="bold" textAlign="center">
          {isSignup ? "Sign Up Here" : "Sign In Here"}
        </Box>
        <Box textAlign="center" fontSize="sm" color="gray.600">
          Please provide your details below.
        </Box>

        {isSignup && (
          <Field label="Name">
            <Input
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter your name"
              required
            />
          </Field>
        )}

        <Field label="Email address">
          <Input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Enter your email"
            required
          />
        </Field>

        <Field label="Password">
          <Input
            name="password"
            type="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Enter your password"
            required
          />
        </Field>

        {isSignup && (
          <Field label="Confirm Password">
            <Input
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              placeholder="Confirm your password"
              required
            />
          </Field>
        )}

        <Stack spacing={4} mt={4}>
          <Button onClick={submitHandler} colorPalette="blue">
            {isSignup ? "Sign Up" : "Sign In"}
          </Button>

          <Button onClick={switchMode} variant="ghost" colorPalette="gray">
            {isSignup
              ? "Already have an account? Sign In"
              : "Don't have an account? Sign Up"}
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};

export default Auth;
