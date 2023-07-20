import { createContext, useState, useEffect, useContext } from "react";

const BASE_URL = `http://localhost:3001`;

const CitiesContext = createContext(); // creates a context object and stores it in the CitiesContext variable

function CitiesProvider({ children }) {
  const [cities, setCities] = useState([{}]); //
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`${BASE_URL}/cities`); // fetches the cities from the API
        const data = await res.json(); // converts the response to JSON format and stores it in the data variable
        setCities(data);
      } catch (err) {
        alert("There was an error fetching cities"); // if there is an error, show an alert
      } finally {
        setIsLoading(false); // set isLoading to false
      }
    }; // fetchCities is a function that fetches the cities from the API and sets the cities state to the data returned from the API call using the setCities function
    fetchCities();
  }, []);

  return (
    <CitiesContext.Provider
      value={{
        cities: cities,
        isLoading: isLoading,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  // this function returns the context object stored in the CitiesContext variable
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error("useCities must be used within a CitiesProvider");
  return context;
}

export { CitiesProvider, useCities };
