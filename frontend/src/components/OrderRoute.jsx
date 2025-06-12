import { Navigate } from "react-router-dom";

const OrderRoute = ({ children }) => {
  // Check if the user is logged in by looking at localStorage
  const user = JSON.parse(localStorage.getItem("user")); // Assuming user is stored as a JSON string
  const order = JSON.parse(localStorage.getItem("order")); // Assuming user is stored as a JSON string

  // If no user, redirect to login
  if (!user && !order) {
    return <Navigate to="/sign-in" replace />;
  }

  // Otherwise, render the protected component
  return children;
};

export default OrderRoute;
