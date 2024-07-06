import React from "react";
import Home from "../../assets/Home.png";
import "./Hero.css";
import { useNavigate } from "react-router-dom";
const Hero = () => {
  const navigate = useNavigate();
  return (
    <div className="Hero_Body">
      <div className="flex flex-col lg:flex-row items-center justify-between bg-transparent p-6 lg:p-16">
        <div className="text-center lg:text-left mb-8 lg:mb-0">
          <h1 className="text-3xl text-blue-950 lg:text-5xl font-bold mb-4">
            Baby Essential <br /> Fashion & Nursery
          </h1>
          <button
            onClick={() => navigate("/shop")}
            className="bg-pink-500 text-white py-2 px-6 rounded-full hover:bg-pink-600 transition duration-300"
          >
            SHOP NOW
          </button>
        </div>
        <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
          <img
            src={Home}
            alt="Home"
            className="w-full h-auto max-w-md lg:max-w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
