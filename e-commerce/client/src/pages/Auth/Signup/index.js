import React from "react";
import {
  Grid,
  Box,
  Flex,
  Button,
  FormControl,
  Heading,
  FormLabel,
  FormErrorMessage,
  Input,Alert,
  FormHelperText,
} from "@chakra-ui/react";
import { useFormik } from "formik";

import validationSchema from "./validation";
import { fecthRegister } from "../../../api";
import { useAuth } from "../../../contexts/AuthContext";

function Signup({history}) {
  const {login}=useAuth();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      passwordConfirm: "",
    },
    validationSchema,
    onSubmit: async (values, bag) => {
     try {
       const registerData= await fecthRegister({email:values.email,password:values.password});
       login(registerData);
       history.push("/profile");
     } catch (error) {
         bag.setErrors({general:error.response.data.message})
     }
    },
  });
  return (
    <div>
      <Flex align="center" width="full" justifyContent="center">
        <Box pt={10}>
          <Box textAlign="center">
            <Heading>Sign Up</Heading>
          </Box>
          <Box my={5}>
              {
                  formik.errors.general&&<Alert status="error">{formik.errors.general}</Alert>
              }
          </Box>
          <Box textAlign="left" my={5}>
            <form onSubmit={formik.handleSubmit}>
              <FormControl>
                <FormLabel>e-mail</FormLabel>
                <Input
                  name="email"
                  type="email"
                  value={formik.values.email}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  isInvalid={
                    formik.touched.email &&
                    formik.errors.email
                  }
                />
              </FormControl>
              <FormControl mt="4">
                <FormLabel>Password</FormLabel>
                <Input
                  name="password"
                  type="password"
                  value={formik.values.password}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  isInvalid={
                    formik.touched.password &&
                    formik.errors.password
                  }
                />
              </FormControl>
              <FormControl mt="4">
                <FormLabel>Password Confirm</FormLabel>
                <Input
                  name="passwordConfirm"
                  type="password"
                  value={formik.values.passwordConfirm}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  isInvalid={
                    formik.touched.passwordConfirm &&
                    formik.errors.passwordConfirm
                  }
                />
              </FormControl>
              <Button width="full" mt="4" type="submit">
                Sign Up
              </Button>
            </form>
          </Box>
        </Box>
      </Flex>
    </div>
  );
}

export default Signup;
