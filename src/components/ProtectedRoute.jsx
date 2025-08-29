import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../context/userContext";

const ProtectedRoute = ({ children, role }) => {
  const { user } = useContext(UserContext);

  // No user -> go back to Landing Page
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // If role is passed, restrict by role
  if (role && user.role !== role) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
