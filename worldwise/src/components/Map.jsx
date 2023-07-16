import { useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";

const Map = () => {
  const [searchParams, setSearchParams] = useSearchParams(); // we use the useSearchParams hook to get the lat and lng from the URL
  const lat = searchParams.get("lat"); // we use the get method to get the value of the lat parameter
  const lng = searchParams.get("lng"); // we use the get method to get the value of the lng parameter

  return (
    <div className={styles.mapContainer}>
      <h1>Map</h1>
      <h1>
        Position: {lat}, {lng}
      </h1>
      <button onClick={() => setSearchParams({ lat: 23, lng: 89 })}>
        Change Pos
      </button>
    </div>
  );
};

export default Map;
