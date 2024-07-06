import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import useFetch from "../../utils/Api";

const NewArrival = () => {
  const { data, isPending, error } = useFetch("http://localhost:8000/db");
  const navigate = useNavigate();

  if (isPending) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const New_Arrivals = data.slice(-4);

  return (
    <div className="py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold my-10 text-gray-800 text-center">
          NEW ARRIVALS
        </h1>
        <p className="text-gray-700 my-8 text-center">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. <br />
          beatae cupiditate amet itaque cumque consectetur dignissimos eligendi
          optio mollitia? Illo.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
          {New_Arrivals.map((item) => (
            <div
              key={item.id}
              className="bg-white shadow-md rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-300"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-52 object-cover"
              />
              <div className="p-4">
                <h4 className="text-lg font-semibold mb-2 text-gray-900">
                  {item.name}
                </h4>
                <p className="text-gray-700 mb-2">${item.price}</p>
                <p className="text-yellow-500">
                  {"★".repeat(item.stars)}
                  {"☆".repeat(5 - item.stars)}
                </p>
              </div>
              <div>
                <button
                  onClick={() => navigate("/shop")}
                  className="flex items-center justify-center bg-red-400 hover:bg-red-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  SHOP NOW <FaArrowRight className="ml-1" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewArrival;
