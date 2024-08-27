// import React from "react";
// import { Navigate } from "react-router-dom";

// const ProtectAdmin = ({ children }) => {
//   const isAdmin = JSON.parse(localStorage.getItem("isAdmin"));

//   if (!isAdmin) {
//     return <Navigate to="/" />;
//   }

//   return children;
// };

// export default ProtectAdmin;

import React from "react";
import { Navigate } from "react-router-dom";
import Cookie from "js-cookie";

const ProtectAdmin = ({ children }) => {
  // Retrieve the admin status from cookies
  const isAdmin = Cookie.get("isAdmin");
  console.log(isAdmin);
  

  // If `isAdmin` is not "true", redirect to the home page
  if (isAdmin !== "true") {
    return <Navigate to="/" replace />;
  }

  // Render children if the user is an admin
  return children;
};

export default ProtectAdmin;
