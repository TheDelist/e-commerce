import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { fecthProduct } from "../../api";
import { Button, Text, Box, SimpleGrid } from "@chakra-ui/react";
import moment from "moment";
import ImageGallery from "react-image-gallery";
import { useBasket } from "../../contexts/BasketContext";

function ProductDetail() {
  const {addToBasket,items}=useBasket();
  const { product_id } = useParams();
  console.log(product_id);
  const { isLoading, error, data } = useQuery(["product_id", product_id], () =>
    fecthProduct(product_id)
  );


  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  const findItem=items.find((item)=>item._id===product_id);
  const images = data.photos.map((url) => ({ original: url }));

  return (
    <div>
      <SimpleGrid columns={2} spacing={10}>
     <Box> <ImageGallery items={images} /></Box>
       <Box>
       <Text as="h2" fontSize="2xl">
        {data.title}
      </Text>

      <Text>{moment(data.createdAt).format("DD/MM/YYYY")}</Text>

      <p>{data.description}</p>
      <Button m={5} colorScheme={findItem?"pink":"green"} onClick={()=>addToBasket(data,findItem)}>
      {
        findItem?"remove item from basket":"Add to Basket"
      }
      </Button>
       </Box>
     
      </SimpleGrid>
     
    </div>
  );
}

export default ProductDetail;
