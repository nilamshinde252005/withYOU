import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  // support BOTH keys so old pages won’t break
  const token = localStorage.getItem("token") || localStorage.getItem("jwtToken");

  if (!token) {
    return <Navigate to="/" replace />;
  }

  return children;
}
