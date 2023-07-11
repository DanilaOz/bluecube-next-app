'use client'

import { useState, useEffect } from 'react';
import Loader from '../Loader/Loader';
import Order from '../Order/Order';
import styles from './Orders.module.css'

export default function Orders({requestData}) {

  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    if (requestData) setShowResults(true);
  }, [requestData]);

  return (
    <div className={styles.ordersContainer}>
      {showResults ? (requestData && (
        requestData.map((order, i) => {
          return <Order order={order} key={i} />
        })
      )) : (<Loader />)}
    </div>
  );
}
