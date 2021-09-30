import "./App.css";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Signin from './pages/Auth/Signin/index'
import Signup from './pages/Auth/Signup/index';
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Profile from "./pages/Profile";
import ProtectedRoute from "./pages/ProtectedRoute";
import Basket from "./pages/Basket";
import Error from "./pages/Error";
import Admin from "./pages/Admin";

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <div id="content">
          <Switch>
            <Route path="/" exact component={Products}/>
            <Route path="/product/:product_id"  component={ProductDetail}/>
		      	<Route path="/signin" component={Signin}/>
			      <Route path="/signup" component={Signup}/>
            <Route path="/basket" component={Basket}/>
            <ProtectedRoute path="/profile" component={Profile}/>
            <ProtectedRoute path="/admin" component={Admin} admin={true}/>
            <Route path="*" component={Error}/>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
