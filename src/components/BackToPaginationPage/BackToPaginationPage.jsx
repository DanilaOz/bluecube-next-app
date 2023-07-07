"use client";

import Image from "next/image";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import ArrowLeft from "../../../public/assets/images/arrow-left.svg";
import styles from "./BackToPaginationPage.module.css";

export default function BackToPaginationPage({ id }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const search = searchParams.get("page");
  const source = searchParams.get("source");
  const pagePaginationNumber = useSelector(
    (state) => state.updatePaginationPageNum.pageNum
  );

  useEffect(() => {
    if (pagePaginationNumber && !source && !search) {
      router.replace(`/products/${id}?page=${pagePaginationNumber}`);
    }
  }, []);

  const handleBack = () => {
    search && !source
      ? router.push(
          pagePaginationNumber === 1 ? `/products` : `/products?page=${search}`
        )
      : router.push(
        pagePaginationNumber === 1 ? `/orders` : `/orders?page=${search}`
      )
  };

  return (
    <div onClick={handleBack} className={styles.back}>
      <Image src={ArrowLeft} alt="arrow-left" width={20} height={20} />
      <span>Назад</span>
    </div>
  );
}
