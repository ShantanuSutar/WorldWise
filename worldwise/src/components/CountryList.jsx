import CountryItem from "./CountryItem";
import Spinner from "./Spinner";
import Message from "./Message";
import styles from "./CountryList.module.css";

const CountryList = ({ cities, isLoading }) => {
  if (isLoading) return <Spinner />; // if isLoading is true, show the Spinner

  if (!cities.length)
    return <Message message="Add your first country by clicking on the map" />; //  this checks if the cities array is empty, if it is, show the Message

  const countries = cities.reduce((arr, city) => {
    if (!arr.map((el) => el.city).includes(city.country))
      return [...arr, { country: city.country, emoji: city.emoji }];
    else return arr;
  }, []); // this function creates an array of unique countries from the cities array

  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem country={country} key={country.country} />
      ))}
      {/* if the cities array is not empty, show the list of cities   */}
    </ul>
  );
};

export default CountryList;
