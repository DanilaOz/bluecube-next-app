"use client";

import { motion } from "framer-motion";

const pageVariants = {
  initial: {
    opacity: 0,
    x: "-30%",
  },
  enter: {
    opacity: 1,
    x: "0%",
    transition: {
      duration: 0.5,
      type: "spring",
      damping: 10,
      stiffness: 100,
    },
  },
  exit: {
    opacity: 0,
    x: "30%",
    transition: {
      duration: 0.5,
    },
  },
};

const OrdersPageTransition = ({ children }) => {
  return (
    <motion.div
      initial="initial"
      animate="enter"
      exit="exit"
      variants={pageVariants}
    >
      {children}
    </motion.div>
  );
};

export default OrdersPageTransition;
