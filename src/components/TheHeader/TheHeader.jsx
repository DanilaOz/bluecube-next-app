import Image from "next/image";
import Navbar from "../Navbar/Navbar";
import Basket from "../Basket/Basket";
import BurgerMenu from "../BurgerMenu/BurgerMenu";
import Logo from "../../../public/assets/images/Logo.svg";

import styles from "./TheHeader.module.css";

const TheHeader = () => {
  return (
    <header className={styles.header}>
      <Image src={Logo} alt="bluecube" priority />
      <Navbar />
      <Basket />
      <BurgerMenu />
    </header>
  );
};

export default TheHeader;
