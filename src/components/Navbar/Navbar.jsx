"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import styles from "./Navbar.module.css";

const navLinks = [
  { label: "Товары", href: "/products" },
  { label: "Заказы", href: "/orders" },
];

const Navbar = ({isMenuOpen, setIsMenuOpen}) => {
  const pathname = usePathname();

  const toggleBurgerMenu = () => {
    if (isMenuOpen) {
      setIsMenuOpen(!isMenuOpen);
    }
  };

  return (
    <ul className={styles.nav} style={{display: isMenuOpen ? "flex" : ""}} >
      {navLinks.map((link) => {
        const isActive = pathname === link.href;

        return (
          <li key={link.label} className={styles.navItem}>
            <Link
              onClick={toggleBurgerMenu}
              href={link.href}
              className={`${styles.navLink} ${isActive ? styles.active : ""}`}
            >
              {link.label}
              {isActive && <hr className={styles.lineUnderNavLink} />}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default Navbar;
