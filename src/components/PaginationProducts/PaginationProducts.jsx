"use client";

import { useEffect, useState } from "react";
import ProductCard from "../Product/ProductCard";
import styles from "./PaginationProducts.module.css";
import Loader from "../Loader/Loader";

const PaginationProducts = ({ results }) => {
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    if (results) setShowResults(true);
  }, [results]);

  return (
    <div className={styles.products}>
      {showResults ? (results &&
        results.map((product, index) => {
          return <ProductCard key={index} product={product} />;
        })) : (<Loader />)}
    </div>
  );
};

export default PaginationProducts;
