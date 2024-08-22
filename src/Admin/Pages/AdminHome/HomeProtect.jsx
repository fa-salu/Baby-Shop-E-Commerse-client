import React from "react";
import { Navigate } from "react-router-dom";

const ProtectAdmin = ({ children }) => {
  const isAdmin = JSON.parse(localStorage.getItem("isAdmin"));

  if (!isAdmin) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectAdmin;
