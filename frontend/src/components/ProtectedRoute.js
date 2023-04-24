import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AppContext } from "../contexts/AppContext";

function ProtectedRoute({ element: Component, ...props }) {
  const value = useContext(AppContext);
  return value.state ? (
    <Component {...props} />
  ) : (
    <Navigate to="/signin" replace />
  );
}

export default ProtectedRoute;
