import { formatOrderDate } from "@/utils/orderDate";
import styles from "./Order.module.css";
import { formatPrice } from "@/utils/formattingPrice";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { useSelector } from "react-redux";

export default function Order({ order }) {
  const [randomOrderNumber, setRandomOrderNumber] = useState(null);

  const pagePaginationNumber = useSelector(
    (state) => state.updatePaginationPageNum.pageNum
  );

  useEffect(() => {
    const min = 100000;
    const max = 999999;
    const randomNum = Math.floor(Math.random() * (max - min + 1) + min);
    setRandomOrderNumber(randomNum);
  }, [])

  return (
    <div className={styles.orderContainer}>
      <div className={styles.orderIdGoods}>
        <div className={styles.order}>
          <p style={{ color: "#808080" }}>Заказ</p>
          <p className={styles.orderId}>№{randomOrderNumber}</p>
        </div>
        <div className={styles.goods}>
          {order.map((product, i) => {
            return (
              <Link
                href={`/products/${product.product.id}?source=orders&page=${pagePaginationNumber}`}
                key={i}
                className={styles.product}
              >
                <Image
                  src={product.product.picture}
                  alt="product-picture"
                  width={48}
                  height={48}
                />
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
  );
}
