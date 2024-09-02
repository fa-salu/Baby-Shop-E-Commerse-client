import React from "react";
import { Navigate } from "react-router-dom";
import Cookie from "js-cookie";

const ProtectAdmin = ({ children }) => {
  const isAdmin = Cookie.get("isAdmin");
  console.log(isAdmin);

  if (isAdmin !== "true") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectAdmin;
