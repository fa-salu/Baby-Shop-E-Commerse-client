import React, { useState } from "react";
import useFetch from "../../utils/Api";
import Spinner from "../../Component/Spinner/Spinner";

const Categories = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const { data, isPending, error } = useFetch(
    `http://localhost:5000/admin/products`
  );

  const categories = ["All", "Toys", "Clothing", "Feeding", "Footwear", "Bath"];

  // Provide default empty array if data is null or undefined
  const filteredData = (data || []).filter(
    (item) => selectedCategory === "All" || item.category === selectedCategory
  );

  // Calculate pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, endIndex);

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <div className="container mx-auto p-4 text-white">
      <h1 className="text-3xl font-bold text-center mb-8 bg-[#193351] p-4 rounded-md shadow-lg">
        Category
      </h1>

      <div className="flex justify-center mb-8 flex-wrap">
        {categories.map((category) => (
          <button
            key={category}
            className={`px-4 py-2 mx-2 text-sm font-medium rounded-md ${
              selectedCategory === category
                ? "bg-[#193351] text-white"
                : "bg-gray-300   text-black border-blue-600"
            }`}
            onClick={() => {
              setSelectedCategory(category);
              setCurrentPage(1);
            }}
          >
            {category}
          </button>
        ))}
      </div>

      {isPending && <Spinner />}
      {error && <div className="text-center text-red-500">Error: {error}</div>}
      {filteredData.length > 0 ? (
        <div className="overflow-x-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {paginatedData.map((item) => (
              <div key={item.id} className="p-4 rounded bg-[#193351] shadow-lg text-center font-serif">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-48 object-cover mb-4 rounded"
                />
                <h2 className="text-xl font-bold">{item.name}</h2>
                <p className="text-gray-600">{item.description}</p>
                <p className="text-lg font-semibold">${item.price}</p>
                <p className="text-gray-500">Category: {item.category}</p>
                <p className="text-yellow-500">
                  {"★".repeat(item.stars)}
                  {"☆".repeat(5 - item.stars)}
                </p>
              </div>
            ))}
          </div>

          <div className="flex justify-between mt-4">
            <button
              onClick={handlePrevious}
              className="px-4 py-2 bg-gray-200 text-gray-700 border rounded-md"
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <button
              onClick={handleNext}
              className="px-4 py-2 bg-gray-200 text-gray-700 border rounded-md"
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      ) : (
        !isPending && <div className="text-center">No products available.</div>
      )}
    </div>
  );
};

export default Categories;
