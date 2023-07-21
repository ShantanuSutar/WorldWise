import { createContext, useEffect, useContext, useReducer } from "react";

const BASE_URL = `http://localhost:3001`;

const CitiesContext = createContext(); // creates a context object and stores it in the CitiesContext variable

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true }; // sets the isLoading state to true

    case "cities/loaded":
      return {
        ...state,
        isLoading: false,
        cities: action.payload,
      }; // sets the cities state to the data returned from the API call

    case "city/loaded":
      return { ...state, isLoading: false, currentCity: action.payload }; // sets the currentCity state to the data returned from the API call

    case "city/created":
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
      }; // adds the new city to the cities state

    case "city/deleted":
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== action.payload),
        currentCity: {},
      }; // removes the city with the id from the cities state

    case "rejected":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      }; // sets the error state to the error message

    default:
      throw new Error("Unknown action type"); // if the action type is not recognized, throw an error
  }
}

function CitiesProvider({ children }) {
  const [{ cities, isLoading, currentCity, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  // const [cities, setCities] = useState([{}]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [currentCity, setCurrentCity] = useState({});

  useEffect(() => {
    dispatch({ type: "loading" });
    const fetchCities = async () => {
      try {
        const res = await fetch(`${BASE_URL}/cities`); // fetches the cities from the API
        const data = await res.json(); // converts the response to JSON format and stores it in the data variable
        dispatch({ type: "cities/loaded", payload: data });
      } catch (err) {
        dispatch({
          type: "rejected",
          payload: "There was an error loading cities",
        }); // if there is an error, show an alert
      }
    }; // fetchCities is a function that fetches the cities from the API and sets the cities state to the data returned from the API call using the setCities function
    fetchCities();
  }, []);

  async function getCity(id) {
    if (Number(id) === currentCity.id) return;

    dispatch({ type: "loading" });
    try {
      const res = await fetch(`${BASE_URL}/cities/${id}`); // fetches the cities from the API
      const data = await res.json(); // converts the response to JSON format and stores it in the data variable
      dispatch({ type: "city/loaded", payload: data });
    } catch (err) {
      dispatch({
        type: "rejected",
        payload: "There was an error loading the city",
      }); // if there is an error, show an alert
    }
  }

  async function createCity(newCity) {
    dispatch({ type: "loading" });

    try {
      const res = await fetch(`${BASE_URL}/cities`, {
        method: "POST", // creates a new city
        body: JSON.stringify(newCity), // converts the new city to JSON format
        headers: {
          "Content-Type": "application/json",
        }, //  fetches the cities from the API
      });
      const data = await res.json();
      dispatch({ type: "city/created", payload: data }); // adds the new city to the cities state
    } catch (err) {
      dispatch({
        type: "rejected",
        payload: "There was an error creating the city...",
      }); // if there is an error, show an alert
    }
  }

  async function deleteCity(id) {
    dispatch({ type: "loading" });
    try {
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
      });
      dispatch({ type: "city/deleted", payload: id }); // removes the city with the id from the cities state
    } catch (err) {
      dispatch({
        type: "rejected",
        payload: "There was an error deleting the city...",
      }); // if there is an error, show an alert
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
        error,
        createCity,
        deleteCity,
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
