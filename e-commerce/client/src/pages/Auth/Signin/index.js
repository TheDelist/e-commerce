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
import { fecthLogin } from "../../../api";
import { useAuth } from "../../../contexts/AuthContext";

function Signin({history}) {
  const {login}=useAuth();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      
    },
    validationSchema,
    onSubmit: async (values, bag) => {
     try {
       const registerData= await fecthLogin({email:values.email,password:values.password});
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
            <Heading>Sign In</Heading>
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
             
              <Button width="full" mt="4" type="submit">
                Sign In
              </Button>
            </form>
          </Box>
        </Box>
      </Flex>
    </div>
  );
}

export default Signin;
