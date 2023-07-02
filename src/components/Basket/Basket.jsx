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

const Basket = () => {
  const dispatch = useDispatch();
  const [isCartVisible, setIsCartVisible] = useState(false);
  const [cartData, setCartData] = useState([]);

  const storeCartData = useSelector((state) => state.updateData.data);

  // Изменение cartData при изменении storeCartData
  useEffect(() => {
    setCartData(storeCartData)
  }, [storeCartData])

  const handleShowCart = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/cart`, {
        headers: {
          Accept: 'application/json'
        },
        withCredentials: true
      });
      const cartData = response.data;
      console.log(cartData);
      dispatch(updateCartItems(cartData))
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
        <p className={styles.basketTitle}>Корзина ({cartData && cartData.length})</p>
        <div className={styles.circle}>{cartData && cartData.length}</div>
      </div>
      {isCartVisible && (
        <Cart
          handleShowCart={handleShowCart}
          handleCloseCart={handleCloseCart}
          setIsCartVisible={setIsCartVisible}
        />
      )}
    </>
  );
};

export default Basket;
