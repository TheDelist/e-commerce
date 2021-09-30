import React from "react";

import { useMutation ,useQueryClient} from "react-query";
import { postProduct } from "../../../api";
import { Formik, FieldArray } from "formik";
import schema from "./validation";
import { message } from 'antd';

import {
  Text,
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Textarea,
  FormErrorMessage,
  FormHelperText,
} from "@chakra-ui/react";

function NewProduct() {
    const queryClient=useQueryClient();
    const removeProduct= useMutation(postProduct,{
        onSuccess:()=>queryClient.invalidateQueries("admin:products"),   
    });
    
  const HandleSubmit = async(values,bag) => {
    message.loading({content:"Loading...",key:"product_update"});
    
    const newValues={
        ...values,
        photos:JSON.stringify(values.photos),
    };
    removeProduct.mutate(newValues,{onSuccess:()=>{
        message.success({
            content:"the product added",
            key:"product_update",
            duration:2,

        })
    }
        
    });
   
     

  };
  
  return (
    <div>
      <Text fontSize="2xl">New Product</Text>
      <Formik
        initialValues={{
          title: "",
          description: "",
          price: "",
          photos: [],
        }}
        validationSchema={schema}
        onSubmit={HandleSubmit}
      >
        {({
          handleSubmit,
          errors,
          touched,
          handleChange,
          handleBlur,
          values,
          isSubmitting,
        }) => (
          <>
            <Box>
              <Box my="5" textAlign="left">
                <form onSubmit={handleSubmit}>
                  <FormControl>
                    <FormLabel>Title</FormLabel>
                    <Input
                      name="title"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      disabled={isSubmitting}
                      value={values.title}
                      isInvalid={touched.title&&errors.title}
                    />
                    {errors.title&& <Text color="red.500">{errors.title}</Text>}
                  </FormControl>
                  <FormControl mt="4">
                    <FormLabel>Description</FormLabel>
                    <Textarea
                      name="description"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      disabled={isSubmitting}
                      value={values.description}
                      isInvalid={touched.description&&errors.description}
                    />
                     {errors.description&& <Text color="red.500">{errors.description}</Text>}
                  </FormControl>
                  <FormControl mt="4">
                    <FormLabel>Price</FormLabel>
                    <Input
                      name="price"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      disabled={isSubmitting}
                      value={values.price}
                      isInvalid={touched.price&&errors.price}
                    />
                     {errors.price&& <Text color="red.500">{errors.price}</Text>}
                  </FormControl>
                  <FormControl>
                    <FormLabel>Photos</FormLabel>
                    <FieldArray
                      name="photos" 
                      render=
                      {(arrayHelpers) => (
                        <div>
                          {values.photos &&
                            values.photos.map((url, index) => (
                              <div key={index}>
                                <Input
                                  name={`photos.${index}`}
                                  value={url}
                                  onChange={handleChange}
                                  disabled={isSubmitting}
                                  width="3xl"
                                />
                                <Button
                                  ml="4"
                                  type="button"
                                  colorScheme="red"
                                  onClick={() => arrayHelpers.remove(index)}
                                >
                                  Remove
                                </Button>
                              </div>
                            ))}
                          <Button
                            ml="4"
                            type="button"
                            colorScheme="blue"
                            onClick={() => arrayHelpers.push("")}
                          >
                            Add Photo
                          </Button>
                        </div>
                      )}
                      />
                   
                  </FormControl>

                 <Button width="full" type="submit" isLoading={isSubmitting} mt={4}>Save</Button>
                </form>
              </Box>
            </Box>
          </>
        )}
      </Formik>
    </div>
  );
}

export default NewProduct;

