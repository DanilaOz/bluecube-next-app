import styles from "./Price.module.css";

const Price = ({ price }) => {
  const formatPrice = (formattingPrice) => {
    return formattingPrice.toLocaleString('ru-RU');
  }
  
  const formattedPrice = formatPrice(price)

    return <h1 className={styles.price}>{formattedPrice}</h1>;
};

export default Price;
