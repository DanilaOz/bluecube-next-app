"use client";

import axios from "axios";
import { BASE_URL } from "@/utils/constants";
import { useEffect, useState } from "react";
import Image from "next/image";
import Cart from "../Cart/Cart";
import basketIcon from "../../../public/assets/images/cart.svg";
import styles from "./Basket.module.css";
import { useDispatch, useSelector } from "react-redux";
import { updateCartItems } from "@/store/features/dataCartUpdateSlice";
import Alert from "@mui/material/Alert";

const Basket = () => {
  const dispatch = useDispatch();
  const [isCartVisible, setIsCartVisible] = useState(false);
  const [cartData, setCartData] = useState([]);
  const [isOrderProcessed, setIsOrderProcessed] = useState(false);

  const storeCartData = useSelector((state) => state.updateData.data);

  // Изменение cartData при изменении storeCartData
  useEffect(() => {
    setCartData(storeCartData);
  }, [storeCartData]);

  useEffect(() => {
    if (storeCartData.length === 0) {
      setIsCartVisible(false);
    }
  }, [storeCartData]);

  const handleShowCart = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/cart`, {
        headers: {
          Accept: "application/json",
        },
        withCredentials: true,
      });
      const cartData = response.data;
      console.log(cartData);
      dispatch(updateCartItems(cartData));
    } catch (error) {
      console.log(error);
      throw error;
    }

    setIsCartVisible(true);
  };

  const handleCloseCart = () => {
    setIsCartVisible(false);
  };

  return (
    <>
      <div
        className={styles.basket}
        onMouseEnter={handleShowCart}
        onMouseLeave={handleCloseCart}
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15.8491 4.52435H7.73651C6.49046 4.52435 6.31561 2.23352 6.0559 1.37057C5.9302 0.952896 5.54675 0.666672 5.1126 0.666672H1.65209C0.296379 0.666672 0.217371 3.49394 1.65209 3.49394C2.41368 3.49394 3.67532 3.23951 3.96333 4.1989L6.00203 11.0142C6.32949 12.1051 7.41328 12.774 8.52875 12.5598C11.0578 12.0788 13.6383 11.476 15.9547 10.3231C16.6677 9.96898 17.1494 9.27992 17.2455 8.48697C17.3545 7.5765 17.3561 6.66562 17.2466 5.75512C17.1621 5.04803 16.5579 4.52435 15.8491 4.52435Z"
            fill={isCartVisible ? "#0073e6" : "#172029"}
          />
          <path
            d="M5.33147 15.5672C5.33147 16.5425 6.12054 17.3333 7.09236 17.3333C8.06417 17.3333 8.85326 16.5425 8.85326 15.5672C8.85326 14.5909 8.06417 13.8001 7.09236 13.8001C6.12054 13.8001 5.33147 14.5909 5.33147 15.5672Z"
            fill={isCartVisible ? "#0073e6" : "#172029"}
          />
          <path
            d="M14.3107 17.3333C13.3389 17.3333 12.5499 16.5425 12.5499 15.5672C12.5499 14.5909 13.3389 13.8001 14.3107 13.8001C15.2826 13.8001 16.0716 14.5909 16.0716 15.5672C16.0716 16.5425 15.2826 17.3333 14.3107 17.3333Z"
            fill={isCartVisible ? "#0073e6" : "#172029"}
          />
        </svg>
        <p className={styles.basketTitle} style={{color: isCartVisible && '#0073e6'}}>
          Корзина ({cartData && cartData.length})
        </p>
        <div className={styles.circle}>{cartData && cartData.length}</div>
      </div>
      {isCartVisible && (
        <Cart
          handleShowCart={handleShowCart}
          handleCloseCart={handleCloseCart}
          setIsCartVisible={setIsCartVisible}
          setIsOrderProcessed={setIsOrderProcessed}
        />
      )}
      {isOrderProcessed && (
        <Alert severity="success" className={styles.successfulOrder}>
          Заказ оформлен
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            className={styles.close}
            viewBox="0 0 16 16"
            onClick={() => setIsOrderProcessed(false)}
          >
            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
          </svg>
        </Alert>
      )}
    </>
  );
};

export default Basket;
