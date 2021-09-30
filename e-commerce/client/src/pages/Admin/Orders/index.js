import React from "react";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,Text,
} from "@chakra-ui/react";
import { useQuery } from "react-query";
import { fecthOrder } from "../../../api";

function Orders() {
  const { error, isLoading, data } = useQuery("admin:orders", fecthOrder);
  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>An error has occurred: + {error.message}</div>;

  console.log(data);
  return (
    <div>
        <Text fontSize="2xl" p="5">Orders</Text>
      <Table variant="simple">
        <TableCaption>Orders</TableCaption>
        <Thead>
          <Tr>
            <Th>E-mail</Th>
             <Th>Address</Th>
            <Th isNumeric>Order amount</Th>
            <Th isNumeric>Date</Th>
          </Tr>
        </Thead>
        <Tbody>
          {
              data.map((order)=>(
                <Tr key={order._id}>
                <Td>{order.user.email}</Td>
                <Td>{order.adress}</Td>
                <Td isNumeric>{order.items.length}</Td>   
                <Td isNumeric>{order.createdAt}</Td>
                
              </Tr>
              ))
          }
         
        </Tbody>
        <Tfoot>
          <Tr>
            <Th>To convert</Th>
            <Th>into</Th>
            <Th isNumeric>multiply by</Th>
          </Tr>
        </Tfoot>
      </Table>
    </div>
  );
}

export default Orders;
