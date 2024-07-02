import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "../Context/CartItem/ShopContext";

const Profile = () => {
  const navigate = useNavigate();
  const { currentUser, logout } = useContext(ShopContext);
  const userProfile = JSON.parse(localStorage.getItem("currentUser"));

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }
  }, [navigate, currentUser]);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("isLogged");
    logout();
    navigate("/login");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-900">
          Profile
        </h2>
        {currentUser && (
          <div className="text-center">
            {/* Profile Image Placeholder */}
            <div className="flex justify-center mb-4">
              <img
                src="https://via.placeholder.com/150"
                alt="Profile"
                className="w-24 h-24 rounded-full border-2 border-blue-500"
              />
            </div>
            <div className="text-left">
              <p className="text-lg font-medium text-gray-700">
                Username:{" "}
                <span className="font-normal">{userProfile.username}</span>
              </p>
              <p className="text-lg font-medium text-gray-700">
                Email: <span className="font-normal">{userProfile.email}</span>
              </p>
            </div>
          </div>
        )}
        <button
          onClick={handleLogout}
          className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
