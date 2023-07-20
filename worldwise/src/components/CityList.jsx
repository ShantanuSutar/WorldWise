import CityItem from "./CityItem";
import Spinner from "./Spinner";
import Message from "./Message";
import styles from "./CityList.module.css";
import { useCities } from "../contexts/CitiesContext";

const CityList = () => {
  const { cities, isLoading } = useCities();

  if (isLoading) return <Spinner />; // if isLoading is true, show the Spinner

  if (!cities.length)
    return <Message message="Add your first city by clicking on the map" />; //  this checks if the cities array is empty, if it is, show the Message

  return (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <CityItem city={city} key={city.id} />
      ))}
      {/* if the cities array is not empty, show the list of cities   */}
    </ul>
  );
};

export default CityList;
