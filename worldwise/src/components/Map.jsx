import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { useEffect, useState } from "react";
import { useCities } from "../contexts/CitiesContext";
import { useGeolocation } from "../hooks/useGeolocation";
import Button from "./Button";

const flagemojiToPNG = (flag) => {
  var countryCode = Array.from(flag, (codeUnit) => codeUnit.codePointAt())
    .map((char) => String.fromCharCode(char - 127397).toLowerCase())
    .join("");
  return (
    <img src={`https://flagcdn.com/24x18/${countryCode}.png`} alt="flag" />
  );
}; // this function converts the flag emoji to a PNG image

const Map = () => {
  const navigate = useNavigate(); // we use the useNavigate hook to navigate to the previous page

  const { cities } = useCities();
  const [mapPosition, setMapPosition] = useState([40, 0]);
  const [searchParams] = useSearchParams(); // we use the useSearchParams hook to get the lat and lng from the URL

  const {
    isLoading: isLoadingPosition,
    position: geoLocationPosition,
    getPosition,
  } = useGeolocation(); // we use the useGeolocation hook to get the user's position

  const mapLat = searchParams.get("lat"); // we use the get method to get the value of the lat parameter
  const mapLng = searchParams.get("lng"); // we use the get method to get the value of the lng parameter

  useEffect(() => {
    if (mapLat && mapLng) setMapPosition([mapLat, mapLng]);
  }, [mapLat, mapLng]); // we call the setMapPosition function when the lat or lng change

  useEffect(() => {
    if (geoLocationPosition)
      setMapPosition([geoLocationPosition.lat, geoLocationPosition.lng]);
  }, [geoLocationPosition]); // we call the setMapPosition function when the geoLocationPosition changes

  return (
    <div className={styles.mapContainer}>
      {!geoLocationPosition && (
        <Button type="position" onClick={getPosition}>
          {isLoadingPosition ? "Loading..." : "Use your position"}
        </Button>
      )}
      <MapContainer
        center={mapPosition}
        zoom={6}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />

        {cities.map((city) => (
          <Marker
            position={[city.position.lat, city.position.lng]}
            key={city.id}
          >
            <Popup>
              <span>{flagemojiToPNG(city.emoji)}</span>{" "}
              <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}
        {/* we use the map method to render a Marker component for each city */}

        {/* <Marker position={mapPosition}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker> */}
        <ChangeCenter position={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  );
};

function ChangeCenter({ position }) {
  const map = useMap(); // we use the useMap hook to get the map instance
  map.setView(position); // we call the setView method to change the map center
  return null;
} // this component changes the map center when the position prop changes

function DetectClick() {
  const navigate = useNavigate();
  useMapEvents({
    click: (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
  }); // we use the useMapEvents hook to detect a click event on the map
} // this component navigates to the form page when the map is clicked
export default Map;
