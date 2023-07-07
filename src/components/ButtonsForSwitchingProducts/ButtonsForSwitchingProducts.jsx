"use client";

import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchPageProducts } from "@/utils/fetchPageProducts";

import PrevIcon from '../../../public/assets/images/arrow-left.svg'
import NextIcon from '../../../public/assets/images/arrow-right.svg'
import styles from "./ButtonsForSwitchingProducts.module.css";
import Image from "next/image";

export default function ButtonsForSwitchingProducts({id}) {
  const dispatch = useDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const source = searchParams.get("source");

  const products = useSelector((state) => state.updatePageProducts.pageProducts);
  const [currentIndex, setCurrentIndex] = useState(1);

  const pagePaginationNumber = useSelector(
    (state) => state.updatePaginationPageNum.pageNum
  );

  useEffect(() => {
    if (pagePaginationNumber && !source) {
        dispatch(fetchPageProducts(pagePaginationNumber, 15));
    }
  }, []);

  useEffect(() => {
    const initialIndex = products?.indexOf(id);
    if (initialIndex !== -1) {
        setCurrentIndex(initialIndex)
    } else {
        setCurrentIndex(0)
    }
  }, [id, products])

  const handleGoToPreviousProduct = () => {
    if (currentIndex > 0) {
        setCurrentIndex(currentIndex - 1)
        const previousProductId = products[currentIndex - 1]
        router.push(`/products/${previousProductId}?page=${pagePaginationNumber}`);
    }
  }

  const handleGoToNextProduct = () => {
    if (currentIndex < products.length - 1) {
        setCurrentIndex(currentIndex + 1)
        const nextProductId = products[currentIndex + 1]
        router.push(`/products/${nextProductId}?page=${pagePaginationNumber}`);
    }
  }

  return (
    <div
      className={styles.buttonsContainer}
      style={{ display: source ? "none" : "flex" }}
    >
      <Button variant="contained" className={styles.btn} onClick={handleGoToPreviousProduct} disabled={currentIndex === 0}><Image src={PrevIcon} alt="prev-button" /></Button>
      <Button variant="contained" className={styles.btn} onClick={handleGoToNextProduct} disabled={currentIndex === products.length - 1}><Image src={NextIcon} alt="next-button" /></Button>
    </div>
  );
}
