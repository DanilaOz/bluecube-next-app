"use client";

import { useEffect, useState } from "react";
import ProductCard from "../Product/ProductCard";
import styles from "./PaginationProducts.module.css";
import Loader from "../Loader/Loader";

const PaginationProducts = ({ requestData }) => {
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    if (requestData) setShowResults(true);
  }, [requestData]);

  return (
    <div className={styles.products}>
      {showResults ? (requestData &&
        requestData.map((product, index) => {
          return <ProductCard key={index} product={product} />;
        })) : (<Loader />)}
    </div>
  );
};

export default PaginationProducts;
