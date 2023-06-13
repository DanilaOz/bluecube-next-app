/* eslint-disable react/display-name */
import Image from "next/image";
import Link from "next/link";
import React from "react";
import styles from "./Card.module.css";
import Price from "../Price/Price";
import RatingStars from "../RatingStars/RatingStars";

const Card = React.forwardRef(({ card }, ref) => {
  const cardBody = (
    <Link href={`/${card.id}`} className={styles.cardLink}>
      <Image
        src={card.picture}
        alt="card-picture"
        width={250}
        height={250}
        className={styles.image}
        priority
      />
      <div className={styles.cardDescription}>
        <p className={styles.title}>{card.title}</p>
        <RatingStars rating={card.rating} />
        <Price price={card.price} />
      </div>
    </Link>
  );

  const content = ref ? (
    <div ref={ref} className={styles.card}>
      {cardBody}
    </div>
  ) : (
    <div className={styles.card}>{cardBody}</div>
  );

  return content;
});

export default Card;
