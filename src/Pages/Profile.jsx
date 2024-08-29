import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShopContext } from "../Context/CartItem/ShopContext";

const Profile = () => {
  const navigate = useNavigate();
  const { currentUser, logout } = useContext(ShopContext);
  
  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }
  }, [navigate, currentUser]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleGoHome = () => {
    navigate("/");
  };

  if (!currentUser) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-900">Profile</h2>
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <img
              src="https://via.placeholder.com/150"
              alt="Profile"
              className="w-24 h-24 rounded-full border-2 border-blue-500"
            />
          </div>
          <div className="text-left">
            <p className="text-lg font-medium text-gray-700">
              Username: <span className="font-normal">{currentUser.username}</span>
            </p>
            <p className="text-lg font-medium text-gray-700">
              Email: <span className="font-normal">{currentUser.email}</span>
            </p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Logout
        </button>
        <button
          onClick={handleGoHome}
          className="w-full px-4 py-2 mt-4 text-sm font-medium text-white bg-gray-600 border border-transparent rounded-md shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
        >
          Go Home
        </button>
      </div>
      <Link to={'/orderDetails'}><h2 className="w-full px-4 py-2 mt-3 bg-blue-500 text-white-center rounded-md">Order Details</h2></Link>
      <Link to={'/wishlist'}><h2 className="w-full px-4 py-2 mt-3 bg-blue-500 text-white-center rounded-md">Wishlist Details</h2></Link>
    </div>
  );
};

export default Profile;
