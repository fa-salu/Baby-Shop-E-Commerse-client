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
            onClick={() => navigate("/dashboard")}
            className={`flex items-center py-2 px-4 text-white hover:bg-gray-700 rounded ${
              isOpen ? "justify-start" : "justify-center"
            }`}
          >
            <FaTachometerAlt className="mr-3" />
            {isOpen && <span>Dashboard</span>}
          </div>
          <div
            onClick={() => navigate("/categories")}
            className={`flex items-center py-2 px-4 text-white hover:bg-gray-700 rounded ${
              isOpen ? "justify-start" : "justify-center"
            }`}
          >
            <FaTags className="mr-3" />
            {isOpen && <span>Categories</span>}
          </div>
          <div
            onClick={() => navigate("/products")}
            className={`flex items-center py-2 px-4 text-white hover:bg-gray-700 rounded ${
              isOpen ? "justify-start" : "justify-center"
            }`}
          >
            <FaBox className="mr-3" />
            {isOpen && <span>Products</span>}
          </div>
          <div
            onClick={() => navigate("/customers")}
            className={`flex items-center py-2 px-4 text-white hover:bg-gray-700 rounded ${
              isOpen ? "justify-start" : "justify-center"
            }`}
          >
            <FaUsers className="mr-3" />
            {isOpen && <span>Customers</span>}
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
