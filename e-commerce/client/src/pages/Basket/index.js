import { Link } from "react-router-dom";
import {
  Alert,
  Button,
  Box,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  useDisclosure,
  Textarea,
} from "@chakra-ui/react";
import { Image } from "@chakra-ui/image";
import React, { useRef,useState } from "react";
import { useBasket } from "../../contexts/BasketContext";
import { postOrder } from "../../api";

function Basket() {
  const { items, removeFromBasket,emptyBasket } = useBasket();
  const [address, setaddress] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = React.useRef();
  const total = items.reduce((acc, obj) => acc + obj.price, 0);
  const HandleSubmitForm= async()=>{
    const itemIds=items.map((item)=>item._id);
    const input={
      address,
      items:JSON.stringify(itemIds)
    }
    await postOrder(input);
    emptyBasket();
    onClose();
  }
  return (
    <Box p="5">
      {items.length < 1 && (
        <Alert status="warning">you have not a item from basket </Alert>
      )}
      {items.length > 0 && (
        <>
          <ul style={{ listStyleType: "decimal" }}>
            {items.map((item) => (
              <li key={item._id} style={{ marginBottom: 15 }}>
                <Link to={`/product/${item._id}`}>
                  <Text fontSize="18">
                    {item.title} - {item.price}
                  </Text>
                  <Image
                    htmlWidth={200}
                    loading="lazy"
                    src={item.photos[0]}
                    alt="basket item"
                  />
                </Link>
                <Button
                  mt="2"
                  size="sm"
                  colorScheme="pink"
                  onClick={() => removeFromBasket(item._id)}
                >
                  Remove From Basket
                </Button>
              </li>
            ))}
          </ul>
          <Box mt="10">
            <Text fontSize="22">Total :{total} TL</Text>
          </Box>

          <Button mt="2" size="sm" colorScheme="green" onClick={onOpen}>
            Orders
          </Button>

          <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Orders</ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6}>
                <FormControl>
                  <FormLabel>First name</FormLabel>
                  <Textarea ref={initialRef} placeholder="Address" value={address} onChange={(e)=>setaddress(e.target.value)} />
                </FormControl>
              </ModalBody>

              <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={HandleSubmitForm}>
                  Save
                </Button>
                <Button onClick={onClose}>Cancel</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </>
      )}
    </Box>
  );
}

export default Basket;
