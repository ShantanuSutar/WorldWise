import { createContext, useContext, useReducer } from "react";

const AuthContext = createContext(); // creates a context object and stores it in the AuthContext variable

const initialState = {
  isAuthenticated: false,
  user: null,
}; // creates an initial state object

function reducer(state, action) {
  switch (action.type) {
    case "login":
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
      }; // sets the isAuthenticated state to true and the user state to the user object
    case "logout":
      return { ...state, user: null, isAuthenticated: false }; // sets the user state to null and the isAuthenticated state to false
    default:
      throw new Error("Unknown action type"); // if the action type is not recognized, throw an error
  }
}

const FAKE_USER = {
  name: "Jack",
  email: "jack@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};

function AuthProvider({ children }) {
  function login(email, password) {
    if (email === FAKE_USER.email && password === FAKE_USER.password) {
      dispatch({ type: "login", payload: FAKE_USER });
    } // if the email and password match the fake user's email and password, call the login function
  }

  function logout() {
    dispatch({ type: "logout" });
  } // calls the logout function

  const [{ user, isAuthenticated }, dispatch] = useReducer(
    reducer,
    initialState
  );

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider> // this provides the user, isAuthenticated, login, and logout values to the AuthContext.Provider component
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  } // if the context is undefined, throw an error
  return context;
}

export { AuthProvider, useAuth };
