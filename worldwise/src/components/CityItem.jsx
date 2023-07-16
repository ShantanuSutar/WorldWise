import styles from "./CityItem.module.css";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date)); // new Date(date) converts the date string to a Date object so that it can be formatted

const CityItem = ({ city }) => {
  const { cityName, emoji, date } = city;
  return (
    <li className={styles.cityItem}>
      <span className={styles.emoji}>{emoji}</span>
      <h3 className={styles.name}>{cityName}</h3>
      <time className={styles.date}>{formatDate(date)}</time>
      {/* we pass the date string to the formatDate function to format it */}
      <button className={styles.deleteBtn}>&times;</button>
    </li>
  );
};

export default CityItem;
