import { Button } from "@mui/material";
import "../../app/globals.css";
import axios from "axios";
import { BASE_URL } from "../../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "@/store/features/dataCartUpdateSlice";

export default function CheckoutButton({ marginTop, marginBottom }) {
  const dispatch = useDispatch();
  const cartData = useSelector((state) => state.updateData.data);
  const totalPrice = useSelector((state) => state.updateData.total);

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
        disabled={isButtonDisabled || totalPrice > 10000}
        onClick={handleSubmitCart}
      >
        Оформить заказ
      </Button>
    </>
  );
}
