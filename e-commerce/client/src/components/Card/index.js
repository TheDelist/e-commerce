import { Box, Button, Image } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import moment from "moment";
import { useBasket } from "../../contexts/BasketContext";

function Card({item}) {
  const {addToBasket,items}=useBasket();
  const findItem=items.find((item)=>item._id===item._id);

  return (
    <div>
      <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p="3">
        <Link to={`/product/${item._id}`}>
          <Image src={item.photos[0]} alt="photo" loading="lazy" />

          <Box p="6">
            <Box d="flex" alignItems="baseline">
              {moment(item.createdAt).format("DD/MM/YYYY")}
            </Box>
            <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight">
             {item.title}
            </Box>
            <Box> {item.price}</Box>
          </Box>
        </Link>
        <Button colorScheme={findItem?"pink":"green"} variant="solid" onClick={()=>addToBasket(item,findItem)}>
          {
          findItem?"remove item from basket":"Add to basket"
          }</Button>
      </Box>
    </div>
  );
}

export default Card;