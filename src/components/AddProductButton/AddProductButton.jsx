"use client";

import { Button } from "@mui/material";
import ItemQuantityButtons from "../ItemQuantityButtons/ItemQuantityButtons";
import styles from './AddProductButton.module.css'
import CheckoutButton from "../CheckoutButton/CheckoutButton";
import '../../app/globals.css'

import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/store/features/dataCartUpdateSlice";

export default function AddProductButton({ text, id }) {
  const dispatch = useDispatch();
  
  const cartData = useSelector((state) => state.updateData.data);
  const product = cartData?.find(item => item.id === id);

  const handleClick = () => {
    dispatch(addToCart({ id, quantity: 1 }));
  };

  return (
    <>
      {!product || product.quantity === 0 ? (
        <Button className="btn" variant="contained" onClick={handleClick}>
          {text}
        </Button>
      ) : (
        <div className={styles.cartButtons}>
          <ItemQuantityButtons id={id} productQty={product.quantity} />
          <CheckoutButton marginTop={0} marginBottom={0} />
        </div>
      )}
    </>
  );
}
