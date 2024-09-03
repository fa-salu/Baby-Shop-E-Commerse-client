import React, { useContext, useState } from "react";
import { FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Cookie from "js-cookie";
import { ShopContext } from "../../Context/CartItem/ShopContext";

const AdminNavbar = () => {
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();
  const { setCurrentUser, setCartItems } = useContext(ShopContext)

  const userData = JSON.parse(Cookie.get("currentUser") || "{}");

  const handleLogout = () => {
    setCurrentUser(null)
    setCartItems([])
    Cookie.remove("token");
    Cookie.remove("isAdmin");
    Cookie.remove("currentUser");

    navigate("/");
  };

  return (
    <div className="w-full bg-[#13233A] text-white shadow-lg fixed top-0 left-0 right-0 z-10">
      <nav className="container mx-auto flex items-center justify-between py-4 px-4 lg:px-0">
        <div className="text-2xl font-bold ml-8">Admin</div>
        <div className="relative">
          <FaUser
            className="text-2xl mr-8 hover:text-gray-300 cursor-pointer"
            onClick={() => setShowPopup(!showPopup)}
          />
          {showPopup && (
            <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg">
              <div className="px-4 py-2 border-b border-gray-300">
                <p className="font-semibold">{userData.username}</p>
                <p className="text-sm text-gray-600">{userData.email}</p>
              </div>
              <button
                className="w-full text-left px-4 py-2 hover:bg-gray-200"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default AdminNavbar;
