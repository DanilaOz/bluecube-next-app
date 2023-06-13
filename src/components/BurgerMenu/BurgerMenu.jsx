"use client";

import { useState } from "react";
import styles from "./BurgerMenu.module.css";
import Navbar from "../Navbar/Navbar";

const BurgerMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleBurgerMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <div className={styles.burgerMenu} onClick={toggleBurgerMenu}>
        <hr className={styles.burgerLine} />
        <hr className={styles.burgerLine} />
        <hr className={styles.burgerLine} />
      </div>
      {isMenuOpen && (
        <div className={styles.mobileMenu}>
          <Navbar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
          <div className={styles.close} onClick={toggleBurgerMenu}>
            Закрыть
          </div>
        </div>
      )}
    </>
  );
};

export default BurgerMenu;
