import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Text, Button } from "@chakra-ui/react";
function Profile({ history }) {
  const { user, logOut } = useAuth();
  const HandleLogOut = async () => {
    logOut(() => {
      history.push('/');
    });
  };
  return (
    <div>
      <Text as="h2">Profile</Text>
      <code>{JSON.stringify(user)}</code>
      <br />
      <br />
      <Button colorScheme="pink" variant="solid" onClick={HandleLogOut}>
        Log Out
      </Button>
    </div>
  );
}

export default Profile;
