'use client'

import Image from "next/image";
import basketIcon from "../../../public/assets/images/cart.svg";
import styles from "./Basket.module.css";
import { useState } from "react";
import Cart from "../Cart/Cart";

const Basket = () => {
  const [isCartVisible, setIsCartVisible] = useState(false);

  const handleShowCart = () => {
    setIsCartVisible(true);
  };

  const handleCloseCart = () => {
    setIsCartVisible(false);
  };

  return (
    <>
      <div className={styles.basket} onMouseEnter={handleShowCart} onMouseLeave={handleCloseCart}>
        <Image src={basketIcon} alt="basket-icon" />
        <p className={styles.basketTitle}>Корзина (5)</p>
        <div className={styles.circle}>5</div>
      </div>
      {isCartVisible && <Cart handleShowCart={handleShowCart} handleCloseCart={handleCloseCart} setIsCartVisible={setIsCartVisible} />}
    </>
  );
};

export default Basket;
