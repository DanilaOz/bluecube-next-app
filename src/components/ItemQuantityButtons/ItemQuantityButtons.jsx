"use client";

import { Button } from "@mui/material";
import Image from "next/image";

import Plus from "../../../public/assets/images/plus.svg";
import Minus from "../../../public/assets/images/minus.svg";

import styles from "./ItemQuantityButtons.module.css";
import "../../app/globals.css";

export default function ItemQuantityButtons() {
  return (
    <div className={styles.group}>
      <Button className="item-quantity-btn">
        <Image src={Minus} alt="minus" width={20} height={20} />
      </Button>
      <h3 className={styles.count}>1</h3>
      <Button className="item-quantity-btn">
        <Image src={Plus} alt="plus" width={20} height={20} />
      </Button>
    </div>
  );
}
