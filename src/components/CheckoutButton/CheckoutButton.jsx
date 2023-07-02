import { Button } from "@mui/material";
import "../../app/globals.css";
import axios from "axios";
import { BASE_URL } from "../../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "@/store/features/dataCartUpdateSlice";
import styles from "./CheckoutButton.module.css";

export default function CheckoutButton({ marginTop, marginBottom }) {
  const dispatch = useDispatch();
  const cartData = useSelector((state) => state.updateData.data);

  const style = {
    marginTop: `${marginTop}px`,
    marginBottom: `${marginBottom}px`,
  };

  const handleSubmitCart = async () => {
    await axios
      .post(`${BASE_URL}/cart/submit`, null, {
        headers: {
          Accept: "application/json",
        },
        withCredentials: true,
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });

    dispatch(clearCart());
  };

  // Проверка на наличие товаров с quantity = 0. Если есть, то оформить заказ нельзя
  const hasZeroQuantity = cartData?.some((item) => item.quantity === 0);
  const isButtonDisabled = hasZeroQuantity;

  return (
    <>
      <Button
        className="btn"
        variant="contained"
        style={style}
        disabled={isButtonDisabled}
        onClick={handleSubmitCart}
      >
        Оформить заказ
      </Button>
      {isButtonDisabled && (
        <p className={styles.message}>
          Пожалуйста, проверьте количество единиц у каждого товара! Если оно
          равно нулю - добавьте нужное количество единиц или удалите товар из
          корзины.
        </p>
      )}
    </>
  );
}
