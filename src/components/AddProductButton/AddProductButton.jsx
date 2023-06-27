"use client";

import { Button } from "@mui/material";
import { useState } from "react";
import ItemQuantityButtons from "../ItemQuantityButtons/ItemQuantityButtons";
import styles from './AddProductButton.module.css'
import CheckoutButton from "../CheckoutButton/CheckoutButton";
import '../../app/globals.css'

export default function MainButton({ text }) {
  const [isVisible, setIsVisible] = useState(true);

  const handleClick = () => {
    setIsVisible(false);
  };

  return (
    <>
      {isVisible ? (
        <Button className="btn" variant="contained" onClick={handleClick}>
          {text}
        </Button>
      ) : (
        <div className={styles.cartButtons}>
          <ItemQuantityButtons />
          <CheckoutButton marginTop={0} marginBottom={0} />
        </div>
      )}
    </>
  );
}
