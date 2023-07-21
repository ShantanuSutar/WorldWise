import { createContext, useState, useEffect, useContext } from "react";

const BASE_URL = `http://localhost:3001`;

const CitiesContext = createContext(); // creates a context object and stores it in the CitiesContext variable

function CitiesProvider({ children }) {
  const [cities, setCities] = useState([{}]); //
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState({});

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

  async function getCity(id) {
    try {
      setIsLoading(true);
      const res = await fetch(`${BASE_URL}/cities/${id}`); // fetches the cities from the API
      const data = await res.json(); // converts the response to JSON format and stores it in the data variable
      setCurrentCity(data);
    } catch (err) {
      alert("There was an error fetching cities"); // if there is an error, show an alert
    } finally {
      setIsLoading(false); // set isLoading to false
    }
  }

  async function createCity(newCity) {
    try {
      setIsLoading(true);
      const res = await fetch(`${BASE_URL}/cities`, {
        method: "POST", // creates a new city
        body: JSON.stringify(newCity), // converts the new city to JSON format
        headers: {
          "Content-Type": "application/json",
        }, //  fetches the cities from the API
      });
      const data = await res.json();
      setCities((cities) => [...cities, data]); // adds the new city to the cities state
    } catch (err) {
      alert("There was an error fetching cities"); // if there is an error, show an alert
    } finally {
      setIsLoading(false); // set isLoading to false
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
        createCity,
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
