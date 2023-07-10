"use client";

import { motion } from "framer-motion";

const pageVariants = {
  initial: {
    opacity: 0,
    scale: 0,
    rotate: -180,
  },
  enter: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: {
      duration: 0.5,
      type: "spring",
      damping: 15,
      stiffness: 100,
    },
  },
  exit: {
    opacity: 0,
    scale: 0,
    rotate: 180,
    transition: {
      duration: 0.5,
    },
  },
};

const ProductsPageTransition = ({ children }) => {
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

export default ProductsPageTransition;
