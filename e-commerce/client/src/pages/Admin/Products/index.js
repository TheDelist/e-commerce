import  { useMemo } from "react";
import { useQuery,useMutation, useQueryClient } from "react-query";
import { fecthProductList,deleteProduct } from "../../../api";
import { Table } from "antd";
import { Link } from "react-router-dom";
import { Text ,Flex,Button} from "@chakra-ui/react";
import { Popconfirm, message } from "antd";

function Products() {
    const queryClient=useQueryClient();
  const { data, isLoading, error } = useQuery(
    "admin:products",
    fecthProductList
  );
  const removeProduct= useMutation(deleteProduct,{
      onSuccess:()=>queryClient.invalidateQueries("admin:products"),
      

  });
  const columns = useMemo(()=>{
    return [
      {
        title: "Title",
        dataIndex: "title",
        key: "title",
      },
      {
        title: "Price",
        dataIndex: "price",
        key: "price",
      },
      {
        title: "Created At",
        dataIndex: "createdAt",
        key: "createdAt",
      },
      {
        title: "Action",
        dataIndex: "action",
        render: (text, record) => (
          <>
            <Link to={`/admin/products/${record._id}`}>Edit</Link>
            <Popconfirm
              title="Are you sure to delete this Product?"
              onConfirm={()=>{
                removeProduct.mutate(record._id,{
                    onSuccess:()=>{
                        
                        message.success("deleted");
                    }
                });
              }}
              onCancel={cancel}
              okText="Yes"
              cancelText="No"
            >
              <a href="#" style={{ marginLeft: 10 }}>
                Delete
              </a>
            </Popconfirm>
          </>
        ),
      },
    ];
},[]);
  if (isLoading) return <div>'Loading...'</div>;

  if (error) return <div>'An error has occurred: ' {error.message}</div>;
  console.log(data);
  
  function cancel(e) {
    console.log(e);
    message.error("Click on No");
  }
 
  return (
    <div>
      <Flex justifyContent="space-between" alignItems="center">
      <Text p="5" fontSize="2xl">
      
        Products
      </Text>
      <Link to="/admin/products/new">
      <Button>New</Button>
      </Link>
      
      </Flex>
      <Table dataSource={data} columns={columns} rowKey="_id" />;
    </div>
  );
}

export default Products;
