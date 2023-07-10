import { formatPrice } from "@/utils/formattingPrice";
import styles from "./Price.module.css";

const Price = ({ price, fontSize, lineHeight, marginTop, fontFamily, fontWeight }) => {

  const style = {
    fontSize: `${fontSize}px`,
    lineHeight: `${lineHeight}px`,
    marginTop: `${marginTop}px`,
    fontFamily: `${fontFamily}`,
    fontWeight: `${fontWeight}`
  }

  const formattedPrice = formatPrice(price);

  return <h1 className={styles.price} style={style}>{formattedPrice}</h1>;
};

export default Price;
