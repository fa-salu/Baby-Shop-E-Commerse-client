import React, { useState } from "react";
import {
  FaBars,
  FaTachometerAlt,
  FaBox,
  FaTags,
  FaUsers,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
    if (isOpen) {
      setIsOpen(false);
    }
  };

  return (
    <div className="flex">
      <div
        className={`bg-[#13233A] text-white fixed top-16 h-screen inset-y-0 left-0 transform z-10 ${
          isOpen ? "w-64" : "w-16"
        } transition-all duration-300 ease-in-out`}
      >
        <button
          className="absolute top-4 left-4 text-2xl text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          <FaBars />
        </button>

        <div className="mt-16 space-y-6">
          <div
            onClick={() => handleNavigation("/dashboard")}
            className={`flex items-center py-2 px-4 text-white hover:bg-gray-700 rounded ${
              isOpen ? "justify-start" : "justify-center"
            }`}
          >
            <FaTachometerAlt
              className={`transition-transform duration-300 ${
                isOpen ? "text-xl" : "text-3xl"
              }`}
            />
            {isOpen && <span className="ml-3">Dashboard</span>}
          </div>
          <div
            onClick={() => handleNavigation("/categories")}
            className={`flex items-center py-2 px-4 text-white hover:bg-gray-700 rounded ${
              isOpen ? "justify-start" : "justify-center"
            }`}
          >
            <FaTags
              className={`transition-transform duration-300 ${
                isOpen ? "text-xl" : "text-3xl"
              }`}
            />
            {isOpen && <span className="ml-3">Categories</span>}
          </div>
          <div
            onClick={() => handleNavigation("/products")}
            className={`flex items-center py-2 px-4 text-white hover:bg-gray-700 rounded ${
              isOpen ? "justify-start" : "justify-center"
            }`}
          >
            <FaBox
              className={`transition-transform duration-300 ${
                isOpen ? "text-xl" : "text-3xl"
              }`}
            />
            {isOpen && <span className="ml-3">Products</span>}
          </div>
          <div
            onClick={() => handleNavigation("/customers")}
            className={`flex items-center py-2 px-4 text-white hover:bg-gray-700 rounded ${
              isOpen ? "justify-start" : "justify-center"
            }`}
          >
            <FaUsers
              className={`transition-transform duration-300 ${
                isOpen ? "text-xl" : "text-3xl"
              }`}
            />
            {isOpen && <span className="ml-3">Customers</span>}
          </div>
        </div>
      </div>

      <div
        className={`flex-1 ml-${
          isOpen ? "64" : "16"
        } transition-all duration-300 ease-in-out`}
      ></div>
    </div>
  );
};

export default Sidebar;
