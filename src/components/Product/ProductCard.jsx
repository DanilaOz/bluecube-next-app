import { Card, CardContent } from "@mui/material";
import Link from "next/link";
import Image from "next/image";

import styles from "./ProductCard.module.css";
import RatingStars from "../RatingStars/RatingStars";
import Price from "../Price/Price";

const ProductCard = ({ product }) => {
  return (
    <Card sx={{ maxWidth: 250}} className={styles.card}>
      <Link href={`products/${product.id}`}>
        <Image src={product.picture} alt="card-picture" width={250} height={250} className={styles.picture} priority />
        <CardContent className={styles.content}>
          <p className={styles.title}>{product.title}</p>
          <RatingStars rating={product.rating} />
          <Price price={product.price}/>
        </CardContent>
      </Link>
    </Card>
  );
};

export default ProductCard;
