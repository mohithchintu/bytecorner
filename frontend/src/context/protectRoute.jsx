import React from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "./userContext";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useUser();

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
