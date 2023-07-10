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
        <Image src={basketIcon} alt="basket-icon" />
        <p className={styles.basketTitle}>
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
