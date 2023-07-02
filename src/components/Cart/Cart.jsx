import { useDispatch, useSelector } from "react-redux";
import CheckoutButton from "../CheckoutButton/CheckoutButton";
import CartItem from "../CartItem/CartItem";
import styles from "./Cart.module.css";
import { useEffect } from "react";
import { updateTotal } from "@/store/features/dataCartUpdateSlice";
import { formatPrice } from "@/utils/formattingPrice";


export default function Cart({
  handleShowCart,
  handleCloseCart,
  setIsCartVisible,
}) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.updateData.cartItems);
  const cartData = useSelector((state) => state.updateData.data);
  const totalPrice = useSelector((state) => state.updateData.total);
  console.log(totalPrice);

  useEffect(() => {
    dispatch(updateTotal())
  }, [cartData, dispatch])

  handleShowCart = () => {
    setIsCartVisible(true);
  };

  handleCloseCart = () => {
    setIsCartVisible(false);
  };

  return (
    <div
      className={styles.cart}
      onMouseEnter={handleShowCart}
      onMouseLeave={handleCloseCart}
    >
      {cartItems.length === 0 ? ( // Возможно не надо будет, будет кнопка корзины
        <p style={{ marginTop: "16px" }}>Корзина пустая. Добавьте товар</p>
      ) : (
        <>
          {cartItems &&
            cartItems.map((product, i) => {
              return <CartItem product={product} key={i} />;
            })}
          <div className={styles.orderPrice}>
            <p className={styles.total}>Итого</p>
            <h1 className={styles.sum}>{formatPrice(totalPrice)}</h1>
          </div>
          <CheckoutButton
            marginTop={16}
            marginBottom={0}
          />
        </>
      )}
    </div>
  );
}
