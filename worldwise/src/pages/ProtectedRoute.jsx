import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/FakeAuthContext";
import { useEffect } from "react";

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) navigate("/");
  }, [isAuthenticated, navigate]); // if the user is not authenticated, navigate to the login page

  return isAuthenticated ? children : null; // if the user is authenticated, render the children
}

export default ProtectedRoute;
