import RatingStars from "../RatingStars/RatingStars";
import Image from "next/image";
import Price from "../Price/Price";
import UndoIcon from "../../../public/assets/images/undo.svg"
import styles from "./ProductInfo.module.css";
import MainButton from "../AddProductButton/AddProductButton";

export default function ProductInfo({ data }) {
  return (
    <div className={styles.info}>
        <Image
          src={data.picture}
          alt="product-picture"
          width={374}
          height={374}
          className={styles.elementLeft}
        />
      <div className={styles.elementRight}>
        <h1 className={styles.title}>{data.title}</h1>
        <RatingStars rating={data.rating} marginTop={8} />
        <Price price={data.price} fontSize={28} lineHeight={32} marginTop={24} />
        <MainButton text={"Добавить в корзину"} />
        <div className={styles.return}>
            <Image src={UndoIcon} width={20} height={20} alt="undo" />
            <p className={styles.conditions}>Условия возврата</p>
        </div>
        <p className={styles.returnDescription}>
            Обменять или вернуть товар надлежащего качества можно в течение 14 дней с момента покупки.
        </p>
        <p className={styles.prices}>
            Цены в интернет-магазине могут отличаться от розничных магазинов.
        </p>
      </div>
    </div>
  );
}
