import React from "react";
import { Navigate } from "react-router-dom";
import Cookie from "js-cookie";

const ProtectRoute = ({ children }) => {
  const token = Cookie.get("token");

  return token ? children : <Navigate to="/login" />;
};

export default ProtectRoute;

