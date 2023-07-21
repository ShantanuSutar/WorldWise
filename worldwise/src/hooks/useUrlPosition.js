import { useSearchParams } from "react-router-dom";

export function useUrlPosition() {
  const [searchParams] = useSearchParams(); // we use the useSearchParams hook to get the lat and lng from the URL
  const lat = searchParams.get("lat"); // we use the get method to get the value of the lat parameter
  const lng = searchParams.get("lng"); // we use the get method to get the value of the lng parameter

  return [lat, lng];
}
