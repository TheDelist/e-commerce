import React from "react";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import { Button } from "@chakra-ui/react";
import { useAuth } from "../../contexts/AuthContext";
import { useBasket } from "../../contexts/BasketContext";

function Navbar() {
  const { loggendin,user } = useAuth();
  const { items } = useBasket();
  return (
    <div>
      <nav className={styles.nav}>
        <div className={styles.left}>
          <div className={styles.logo}>
            <Link to="/">E-commerce</Link>
          </div>
          <ul className={styles.menu}>
            <li>
              <Link to="/">Products</Link>
            </li>
          </ul>
        </div>
        <div className={styles.right}>
          {!loggendin && (
            <>
              <Link to="/signin">
                <Button colorScheme="blue">Login</Button>
              </Link>
              <Link to="/signup">
                <Button colorScheme="blue">Register</Button>
              </Link>
            </>
          )}
          {loggendin && (
            <>
              {items.length > 0 && (
                <Link to="/basket">
                  <Button colorScheme="pink" variant="outline">
                    Basket ({items.length})
                  </Button>
                </Link>
              )}
              {
                user?.role==="admin" &&(
                  <Link to="/admin">
                    <Button variant="ghost" colorScheme="pink">Admin</Button>
                  </Link>
                )
              }
              <Link to="/profile">
                <Button colorScheme="pink">Profile</Button>
              </Link>
            </>
          )}
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
