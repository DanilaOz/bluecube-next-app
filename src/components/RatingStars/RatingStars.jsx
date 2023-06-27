import styles from "./RatingStars.module.css";

const RatingStars = ({ rating, marginTop }) => {
  const fullStars = Math.floor(rating); // Округление до ближайшего целого числа в меньшую сторону
  const decimalStar = rating - fullStars; // Оставшаяся десятичная часть рейтинга

  const style = {
    marginTop: `${marginTop}px`
  }

  let stars = [];
  for (let i = 0; i < fullStars; i++) {
    stars.push(
      <svg
        width="12"
        height="12"
        key={i}
        viewBox="0 0 12 12"
        fill="none"
        className={styles.fillColor}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M5.81493 10.5999C4.34061 10.5999 3.29926 12.6523 2.10291 11.7872C0.90656 10.9221 2.53795 8.65117 2.10291 7.56977C1.66787 6.48838 -0.289791 6 0.0364866 4.65C0.362764 3.30001 2.75547 3.67675 3.51678 2.85305C4.2781 2.02935 4.4246 0 6.01824 0C7.61189 0 7.85485 2.28427 8.48644 2.85305C9.28102 3.56861 12 3.15728 12 4.65C12 6.14273 10.0646 6.37009 9.82482 7.56977C9.58504 8.76946 10.9124 10.7058 9.82482 11.5709C8.73722 12.4361 7.28926 10.5999 5.81493 10.5999Z"
          fill="#ffffff"
        />
      </svg>
    );
  }

  if (decimalStar > 0) {
    stars.push(
      <svg
        key={decimalStar}
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient
            id={`grad-${decimalStar}`}
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
            <stop offset={`${decimalStar * 100}%`} stopColor="#FABC22" />
            <stop offset={`${decimalStar * 100}%`} stopColor="#D8D8D8" />
          </linearGradient>
        </defs>
        <path
          fill={`url(#grad-${decimalStar})`}
          d="M5.81493 10.5999C4.34061 10.5999 3.29926 12.6523 2.10291 11.7872C0.90656 10.9221 2.53795 8.65117 2.10291 7.56977C1.66787 6.48838 -0.289791 6 0.0364866 4.65C0.362764 3.30001 2.75547 3.67675 3.51678 2.85305C4.2781 2.02935 4.4246 0 6.01824 0C7.61189 0 7.85485 2.28427 8.48644 2.85305C9.28102 3.56861 12 3.15728 12 4.65C12 6.14273 10.0646 6.37009 9.82482 7.56977C9.58504 8.76946 10.9124 10.7058 9.82482 11.5709C8.73722 12.4361 7.28926 10.5999 5.81493 10.5999Z"
        />
      </svg>
    );
  }

  return (
    <div className={styles.rating} style={style}>{rating ? stars : <p className={styles.noReviews}>Нет отзывов</p>}</div>
  );
};

export default RatingStars;
