"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { debounce } from "lodash";

import Plus from "../../../public/assets/images/plus.svg";
import Minus from "../../../public/assets/images/minus.svg";

import styles from "./ItemQuantityButtons.module.css";
import "../../app/globals.css";

import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/store/features/dataCartUpdateSlice";
import { updateCart } from "@/utils/apis";

export default function ItemQuantityButtons({ id }) {
  const dispatch = useDispatch();
  const cartData = useSelector((state) => state.updateData.data);
  const product = cartData?.find(item => item.id === id);
  const qty = product?.quantity || 0;

  const [count, setCount] = useState(qty);

  useEffect(() => {
    const handleCounterChange = debounce(() => {
      
      const cartPostRequest = async () => {
        try {
          await updateCart(cartData);
        } catch (error) {
          console.log("Ошибка обновления корзины", error);
          throw error;
        }
      };

      if (cartData) {
        cartPostRequest();
        console.log(cartData);
      }

    }, 500);

    handleCounterChange();

    return () => handleCounterChange.cancel();
  }, [count, dispatch, id, cartData]);

  const handleIncrement = () => {
    const newCount = qty + 1;
    setCount(newCount);
    dispatch(addToCart({ id, quantity: newCount }));
  };

  const handleDecrement = () => {
    const newCount = qty - 1;
    setCount(newCount);
    dispatch(addToCart({ id, quantity: newCount }));
  };

  // Проверка, должна(ы) ли быть кнопка(и) "-" активной(ыми) после удаления товара из корзины
  useEffect(() => {
    if (count < 1 && qty > 0) {
      setCount(qty)
    }
  }, [count, qty])

  return (
    <div className={styles.group}>
      <Button
        className="item-quantity-btn qty-btn-left"
        onClick={handleDecrement}
        disabled={count < 1 ? true : false}
      >
        <Image src={Minus} alt="minus" width={20} height={20} />
      </Button>
      <h3 className={styles.count}>{qty}</h3>
      <Button
        className="item-quantity-btn qty-btn-right"
        onClick={handleIncrement}
        disabled={count < 10 ? false : true}
      >
        <Image src={Plus} alt="plus" width={20} height={20} />
      </Button>
    </div>
  );
}
