
import axios from "axios";


// Add a request interceptor
axios.interceptors.request.use(function (config) {
  const {origin}=new URL(config.url);
  const allowedOrigin=[process.env.REACT_APP_BASE_ENDPOINT];
  const token=localStorage.getItem("access-token");
  if(allowedOrigin.includes(origin)){
    config.headers.authorization=token;
  }

  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});




export const fecthProductList = async ({ pageParam = 0 }) => {
  const data = fetch(`${process.env.REACT_APP_BASE_ENDPOINT}/product?page=${pageParam}`).then((res) => res.json());
  return data;
};
export const fecthProduct = async (id) => {
  const {data} = await  axios.get( `${process.env.REACT_APP_BASE_ENDPOINT}/product/${id}`);
  return data;
};
export const postProduct = async (input) => {
  const {data} = await  axios.post( `${process.env.REACT_APP_BASE_ENDPOINT}/product/`,input);
  return data;
};
export const fecthRegister = async (input) => {
  const {data} =await  axios.post(`${process.env.REACT_APP_BASE_ENDPOINT}/auth/register`,input);
  return data;
};
export const fecthLogin=async(input)=>{
  const {data}=await axios.post(`${process.env.REACT_APP_BASE_ENDPOINT}/auth/login`,input);
  return data;
}
export const fecthMe = async () => {
  const {data} =await  axios.get(`${process.env.REACT_APP_BASE_ENDPOINT}/auth/me`);
  return data;
};
export const fecthLogout = async () => {
  const {data} =await  axios.post(`${process.env.REACT_APP_BASE_ENDPOINT}/auth/logout`,{
    refresh_token:localStorage.getItem("refresh-token"),
  });
  return data;
};
export const postOrder=async(input)=>{
  const {data}=await axios.post(`${process.env.REACT_APP_BASE_ENDPOINT}/order`,input);
  return data;
}
export const fecthOrder=async()=>{
  const {data}=await axios.get(`${process.env.REACT_APP_BASE_ENDPOINT}/order`);
  return data;
}
export const deleteProduct=async(product_id)=>{
  const {data}=await axios.delete(`${process.env.REACT_APP_BASE_ENDPOINT}/product/${product_id}`);
  return data;
}
export const updateProduct=async(input,product_id)=>{
  const {data}=await axios.put(`${process.env.REACT_APP_BASE_ENDPOINT}/product/${product_id}`,input);
  return data;
}