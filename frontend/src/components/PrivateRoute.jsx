import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  // Check if the user is logged in by looking at localStorage
  const user = JSON.parse(localStorage.getItem("user")); // Assuming user is stored as a JSON string

  // If no user, redirect to login
  if (!user) {
    return <Navigate to="/sign-in" replace />;
  }

  // Otherwise, render the protected component
  return children;
};

export default PrivateRoute;
