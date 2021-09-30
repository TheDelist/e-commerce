import React from "react";
import { Grid,Box,Flex,Button } from "@chakra-ui/react";
import Card from "../../components/Card";
import {  useQuery,useInfiniteQuery  } from "react-query";
import { fecthProductList } from "../../api";

function Products() {
  
    const {  data,
      error,
      fetchNextPage,
      hasNextPage,
      isFetching,
      isFetchingNextPage,
      status, } = useInfiniteQuery('products', fecthProductList,{
      getNextPageParam: (lastPage, allGroups) => {
          const morePageExist=lastPage?.length===12;
          if(!morePageExist){
            return
          }
          return allGroups.length+1;

        }
    }
  )
  if (status==="loading") return 'Loading...'

  if (status==="error") return 'An error has occurred: ' + error.message
  console.log(data);
  return (
    <div>
        <h2> Products</h2>
      <Grid templateColumns="repeat(3, 1fr)" gap={6}>
      
        {/*
            data.map((item,key)=><Card item={item} key={key}/>)*/
        }
        
          {data.pages.map((group, i) => (
         <React.Fragment key={i}>
           {group.map(item => (
             <Box w="100%" key={i}>
                  <Card item={item} />
             </Box>
             
           ))}
         </React.Fragment>
       ))}
      </Grid>
      <Flex mt="10" justifyContent="center">
         <Button
           onClick={() => fetchNextPage()}
           disabled={!hasNextPage || isFetchingNextPage}
           isLoading={isFetchingNextPage}
         >
           {isFetchingNextPage
             ? 'Loading more...'
             : hasNextPage
             ? 'Load More'
             : 'Nothing more to load'}
         </Button>
       </Flex>
       <div>{isFetching && !isFetchingNextPage ? 'Fetching...' : null}</div>
     
    </div>
  );
}

export default Products;
