import React from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../../utils/Api";
import Spinner from "../Spinner/Spinner";

const NewArrival = () => {
  const { data, isPending, error } = useFetch("http://localhost:5000/users/products");
  const navigate = useNavigate();

  if (isPending) return <Spinner />;
  if (error) return <div className="text-center text-red-500 py-8">Error: {error}</div>;

  const New_Arrivals = data.slice(-4);

  return (
    <div className="py-12 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-semibold text-gray-700 uppercase text-center font-serif mb-4">
          NEW ARRIVALS
        </h1>
        <p className="text-bold text-gray-800 text-center mb-10 font-serif">
          Discover the latest additions to our collection! <br />  Explore top-quality baby essentials
          that are perfect for your little one's needs.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {New_Arrivals.map((item) => (
            <div
              key={item._id}
              onClick={() => navigate("/shop")}
              className="relative bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 cursor-pointer"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-52 object-cover"
              />
              <div className="p-4">
                <h4 className="text-lg font-semibold font-serif mb-1 text-gray-900 text-center">{item.name}</h4>
                <p className="text-gray-600 mb-2 font-serif text-center">Price: ₹{item.price}</p>
                <p className="text-yellow-500 text-sm mb-4 text-center">
                  {"★".repeat(item.stars)}
                  {"☆".repeat(5 - item.stars)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewArrival;
