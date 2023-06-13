import Image from "next/image";
import basketIcon from "../../../public/assets/images/cart.svg";
import styles from './Basket.module.css'

const Basket = () => {
  return (
    <div className={styles.basket}>
        <Image src={basketIcon} alt="basket-icon" />
        <p className={styles.basketTitle}>Корзина (5)</p>
        <div className={styles.circle}>5</div>
    </div>
  )
}

export default Basket