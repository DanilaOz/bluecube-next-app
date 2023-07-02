import Image from "next/image";
import styles from "./CartItem.module.css";
import ItemQuantityButtons from "../ItemQuantityButtons/ItemQuantityButtons";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "@/store/features/dataCartUpdateSlice";
import Trash from "../../../public/assets/images/trash.svg";

import axios from "axios";
import { BASE_URL } from "@/utils/constants";
import { updateCart } from "@/utils/apis";
import { formatPrice } from "@/utils/formattingPrice";
import Link from "next/link";

export default function CartItem({ product }) {
  const dispatch = useDispatch();
  const cartData = useSelector((state) => state.updateData.data);
  const prod = cartData?.find((item) => item.id === product.product.id);

  const handleRemoveProduct = async () => {
    const productId = product.product.id;
    dispatch(removeFromCart({ id: productId }));
    const updatedCartData = cartData.filter((item) => item.id !== productId);
    await updateCart(updatedCartData);
    await axios.get(`${BASE_URL}/cart`);
  };

  return (
    <div className={styles.product}>
      <Link href={`/products/${product.product.id}`} className={styles.productLink}>
        <Image
          src={product.product.picture}
          alt="product-picture"
          width={52}
          height={52}
          className={styles.productPicture}
        />
        <p className={styles.title}>{product.product.title}</p>
      </Link>
      <ItemQuantityButtons
        id={product.product.id}
      />
      {prod?.quantity > 0 ? (
        <div className={styles.prices}>
          <p
            className={styles.priceForOne}
            style={{ display: prod?.quantity > 1 ? "block" : "none" }}
          >
            {formatPrice(product.product.price)} &#8381; за шт.
          </p>
          <h3 className={styles.price}>
            {formatPrice(
              prod?.quantity > 0 && product.product.price * prod.quantity
            )}
          </h3>
        </div>
      ) : (
        <div className={styles.deteteItem} onClick={handleRemoveProduct}>
          <Image src={Trash} alt="trash" width={20} height={20} />
          <p className={styles.delete}>Удалить</p>
        </div>
      )}
    </div>
  );
}
