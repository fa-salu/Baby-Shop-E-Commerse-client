import React from 'react';
import Shirt1 from "../../Assets/offer/t_shirt_1.png";
import shirt2 from "../../Assets/offer/t_shirt_2.png";
import pant1 from "../../Assets/offer/pant_1.png";
import pant2 from "../../Assets/offer/pant_2.png";

// Data for offers
const offerData = [
  {
    title: "MONOTONE LOVE CARDIAN IN PINK",
    subTitle: 'CARDIANS',
    price: 599,
    image: Shirt1,
  },
  {
    title: "LIAN DENIM SHORT INDIGO",
    subTitle: "SHORTS",
    price: 699,
    image: pant1,
  },
  {
    title: "FENEZ ONE-PIECE STRIPE JACKET",
    subTitle: "JACKET",
    price: 399,
    image: shirt2,
  },
  {
    title: "LOGO BRAND SHORT PANT",
    subTitle: "SHORTS",
    price: 499,
    image: pant2,
  },
];

const Offers = () => {
  return (
    <div className="px-4 py-8">
      <div className="text-center mb-6">
        <h2 className="text-xl font-semibold text-gray-700 uppercase">Trending 💫</h2>
      </div>
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-800">
          Shop Our Popular <br /> Baby Products
        </h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {offerData.map((item, index) => (
          <div 
            key={index} 
            className="flex flex-col items-center"
          >
            {/* Animated image with a shadow */}
            <img 
              src={item.image} 
              alt={item.title} 
              className="h-48 object-contain mb-4 drop-shadow-lg animate-float"
            />
            <h3 className="text-lg font-medium text-gray-900">{item.title}</h3>
            <h6 className="text-sm text-gray-500">{item.subTitle}</h6>
            <h4 className="text-sm font-bold text-black-600 mt-2">₹{item.price}</h4>
          </div>
        ))}
      </div>
      <hr className="my-8 border-gray-300" />
    </div>
  );
}

export default Offers;
