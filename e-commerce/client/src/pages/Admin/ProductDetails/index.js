import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router";
import { fecthProduct, updateProduct } from "../../../api";
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

function ProductDetails() {
  const { product_id } = useParams();
  const { isLoading, isError, data, error } = useQuery(
    ["admin:product", product_id],
    () => fecthProduct(product_id)
  );
 

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  const HandleSubmit = async(values,bag) => {
     message.loading({content:"Loading...",key:"product_update"});
    try {
        await updateProduct(values,product_id);
        message.success({
            content:"the product updated",
            key:"product_update",
            duration:2,

        });
    } catch (error) {
        message.error("the product does not updated");
    }
     

  };
  console.log(data);
  return (
    <div>
      <Text fontSize="2xl">Product Details</Text>
      <Formik
        initialValues={{
          title: data.title,
          description: data.description,
          price: data.price,
          photos: data.photos,
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

                 <Button width="full" type="submit" isLoading={isSubmitting} mt={4}>Update</Button>
                </form>
              </Box>
            </Box>
          </>
        )}
      </Formik>
    </div>
  );
}

export default ProductDetails;
