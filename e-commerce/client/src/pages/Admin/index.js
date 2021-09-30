import React from "react";
import './styles.css';
import {Link,Route,Switch,useRouteMatch} from 'react-router-dom';
import {Box} from  "@chakra-ui/react";
import Home from "./Home";
import Products from "./Products";
import Orders from "./Orders";
import ProductDetails from "./ProductDetails";
import NewProduct from "./Products/new";
function Admin() {
  const {path,url}=useRouteMatch();
  return (
    <div>
      <nav>
        <ul className="admin-menu">
          <li>
              <Link to={url}>Home</Link>
          </li>
          <li>
              <Link to={`${url}/orders`}>Orders</Link>
          </li>
          <li>
              <Link to={`${url}/products`}>Products</Link>
          </li>
        </ul>
      </nav>
      <Box mt="10">
        <Switch>
          <Route exact path={path} component={Home}/>
          <Route path={`${path}/orders`} component={Orders}/>
          <Route exact path={`${path}/products`} component={Products}/>
          <Route  path={`${path}/products/new`} component={NewProduct}/>
          <Route  path={`${path}/products/:product_id`} component={ProductDetails}/>
         
        </Switch>
      </Box>

    </div>
  );
}

export default Admin;
