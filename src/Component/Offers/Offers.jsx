import React from "react";
import baby_store_offer_1 from "../../assets/baby-store-offer1.png";
import baby_store_offer_2 from "../../assets/baby-store-offer2.png";
import baby_store_offer_3 from "../../assets/baby-store-offer3.png";

const offerData = [
  {
    title: "BEST CHOICE FOR YOUR",
    mainTitle: "Princess",
    image: baby_store_offer_1,
    buttonText: "SHOP NOW"
  },
  {
    title: "20% OFF",
    mainTitle: "New Born Essential",
    image: baby_store_offer_2,
    buttonText: "SHOP NOW"
  },
  {
    title: "NEW ARRIVALS",
    mainTitle: "Hot Toys",
    image: baby_store_offer_3,
    buttonText: "SHOP NOW"
  }
];

const Offers = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
      {offerData.map((offer, index) => (
        <div key={index} className="p-10 bg-white rounded-lg shadow-lg text-center">
          <h4 className="text-sm font-medium text-gray-700">{offer.title}</h4>
          <h1 className="text-2xl font-bold text-gray-900 my-2">{offer.mainTitle}</h1>
          <img src={offer.image} alt={offer.mainTitle} className="h-64 max-w-52 max-h-36 mx-auto" />
          <button className="px-4 py-2 mt-4 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">{offer.buttonText}</button>
        </div>
      ))}
    </div>
  );
};

export default Offers;
