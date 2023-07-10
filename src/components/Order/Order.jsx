import { formatOrderDate } from "@/utils/orderDate";
import styles from "./Order.module.css";
import { formatPrice } from "@/utils/formattingPrice";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import OrdersPageTransition from "../OrdersPageTransition/OrdersPageTransition";

import { useDispatch, useSelector } from "react-redux";
import Price from "../Price/Price";
import { updateCart } from "@/utils/apis";
import { addToCart } from "@/store/features/dataCartUpdateSlice";

export default function Order({ order }) {
  const dispatch = useDispatch();
  const [randomOrderNumber, setRandomOrderNumber] = useState(null);
  const [reorderData, setReorderData] = useState([]);

  const cartData = useSelector((state) => state.updateData.data);
  const pagePaginationNumber = useSelector(
    (state) => state.updatePaginationPageNum.pageNum
  );

  useEffect(() => {
    if (order) {
      const uniqueData = [];
      order.forEach((product) => {
        const { id } = product.product;
        const { quantity } = product;
        const isExisting = uniqueData.some((item) => item.id === id);
        if (!isExisting) {
          uniqueData.push({ id, quantity });
        }
      });
      setReorderData(uniqueData);
    }
  }, [order]);

  useEffect(() => {
    if (cartData) {
      updateCart(cartData);
    }
  }, [reorderData, cartData]);

  useEffect(() => {
    const min = 100000;
    const max = 999999;
    const randomNum = Math.floor(Math.random() * (max - min + 1) + min);
    setRandomOrderNumber(randomNum);
  }, []);

  const handleRepeatOrder = () => {
    if (reorderData.length > 0) {
      reorderData.forEach((item) => {
        dispatch(addToCart(item));
      });
    }
  };

  return (
    <OrdersPageTransition>
      <div className={styles.orderContainer}>
        <div className={styles.orderIdGoods}>
          <div className={styles.order}>
            <p style={{ color: "#808080" }}>Заказ</p>
            <p className={styles.orderId}>№{randomOrderNumber}</p>
            <p onClick={handleRepeatOrder} className={styles.repeatOrder}>
              Повторить заказ
            </p>
          </div>
          <div className={styles.goods}>
            {order.map((product, i) => {
              const [isProductCartVisible, setIsProductCartVisible] =
                useState(false);
              const [activeProductId, setActiveProductId] = useState(null);
              return (
                <Link
                  href={`/products/${product.product.id}?source=orders&page=${pagePaginationNumber}`}
                  key={i}
                  className={styles.product}
                  onMouseEnter={() => {
                    setActiveProductId(product.product.id);
                    setIsProductCartVisible(true);
                  }}
                  onMouseLeave={() => {
                    setActiveProductId(null);
                    setIsProductCartVisible(false);
                  }}
                >
                  <Image
                    src={product.product.picture}
                    alt="product-picture"
                    width={48}
                    height={48}
                  />
                  <p style={{ color: "#808080" }}>{product.quantity}x</p>
                  {isProductCartVisible &&
                    activeProductId === product.product.id && (
                      <div className={styles.productCart}>
                        <Image
                          src={product.product.picture}
                          alt="product-picture"
                          width={48}
                          height={48}
                        />
                        <p className={styles.productCartTitle}>
                          {product.product.title}
                        </p>
                        <div>
                          Цена за шт:{" "}
                          <Price
                            price={product.product.price}
                            marginTop={0}
                            fontFamily={"Nunito"}
                          />
                        </div>
                      </div>
                    )}
                </Link>
              );
            })}
          </div>
        </div>
        <div className={styles.orderSumDateInfo}>
          <div className={styles.orderSumDateInfoStatic}>
            <p style={{ color: "#808080" }}>Оформлено</p>
            <p style={{ color: "#808080" }}>На сумму</p>
          </div>
          <div className={styles.orderSumDateInfoDynamic}>
            <p>{formatOrderDate(order[0].createdAt)}</p>
            <p className={styles.sum}>
              {formatPrice(
                order.reduce((total, item) => {
                  const { quantity, product } = item;
                  const { price } = product;
                  return total + quantity * price;
                }, 0)
              )}
            </p>
          </div>
        </div>
      </div>
    </OrdersPageTransition>
  );
}
