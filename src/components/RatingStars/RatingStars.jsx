import { Rating } from "@mui/material";
import styles from "./RatingStars.module.css";

const RatingStars = ({ rating }) => {

  return (
    <div className={styles.rating}>
      {rating ? <Rating
        name="half-reting-read"
        defaultValue={rating}
        precision={0.5}
        readOnly
      /> : <p style={{marginTop: '12px'}}>Отзывов нет</p>}
    </div>
  );
};

export default RatingStars;
