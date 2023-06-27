

import CheckoutButton from '../CheckoutButton/CheckoutButton';
import styles from './Cart.module.css'

export default function Cart({handleShowCart, handleCloseCart, setIsCartVisible}) {

    handleShowCart = () => {
        setIsCartVisible(true);
      };
    
      handleCloseCart = () => {
        setIsCartVisible(false);
      };
  
    return (
    <div className={styles.cart} onMouseEnter={handleShowCart} onMouseLeave={handleCloseCart}>
        Cart
    <CheckoutButton marginTop={16} marginBottom={0} />
    </div>
  )
}
