import React from "react";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
function Error() {
  return (
    <Alert status="error">
      <AlertIcon />
      <AlertTitle mr={2}>Error 404</AlertTitle>
      <AlertDescription>
        page not found
      </AlertDescription>
     
    </Alert>
  );
}

export default Error;
