import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();
  const images = [
    "https://babymoo.in/cdn/shop/files/GiftSet_Caps_Web.jpg?v=1713866669&width=2000",
    "https://babymoo.in/cdn/shop/files/FOOTWEAR_WEB_2ad8dca1-799f-4c07-ab65-aa54cc9187bb.jpg?v=1720440498&width=2000",
    "https://babymoo.in/cdn/shop/files/Toys_Web_2.jpg?v=1723458183&width=2000",
  ];

  const buttonLabels = ["Buy Clothes", "Buy Footwear", "Buy Toys"];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div
      className="flex items-center justify-center min-h-screen"
      style={{
        backgroundImage: `url(${images[currentImageIndex]})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        width: "100%",
        height: "100vh",
        transition: "background-image 0.5s ease-in-out",
      }}
    >
      <div className="flex flex-col items-center justify-center w-full">
        <button
          onClick={() => navigate("/shop")}
          className="bg-pink-500 text-white py-2 px-6 rounded-full hover:bg-pink-600 transition duration-300 outline-none focus:outline-green-500 focus:outline-4 animate-pulse shadow-md mt-8"
        >
          {buttonLabels[currentImageIndex]}
        </button>
      </div>
    </div>
  );
};

export default Hero;
