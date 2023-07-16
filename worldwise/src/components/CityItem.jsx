import { Link } from "react-router-dom";
import styles from "./CityItem.module.css";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date)); // new Date(date) converts the date string to a Date object so that it can be formatted

const flagemojiToPNG = (flag) => {
  var countryCode = Array.from(flag, (codeUnit) => codeUnit.codePointAt())
    .map((char) => String.fromCharCode(char - 127397).toLowerCase())
    .join("");
  return (
    <img src={`https://flagcdn.com/24x18/${countryCode}.png`} alt="flag" />
  );
}; // this function converts the flag emoji to a PNG image

const CityItem = ({ city }) => {
  const { cityName, emoji, date, id } = city;
  return (
    <li>
      <Link className={styles.cityItem} to={`${id}`}>
        {/* we pass the id to the Link component so that it can be used in the URL */}
        <span className={styles.emoji}>{flagemojiToPNG(emoji)}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>{formatDate(date)}</time>
        {/* we pass the date string to the formatDate function to format it */}
        <button className={styles.deleteBtn}>&times;</button>
      </Link>
    </li>
  );
};

export default CityItem;
