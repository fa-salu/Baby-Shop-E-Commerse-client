import React from "react";
import useFetch from "../../utils/Api";
import { Link } from "react-router-dom";
import Spinner from "../../Component/Spinner/Spinner";

const Customers = () => {
  const { data, isPending, error } = useFetch(
    "http://localhost:5000/admin/users"
  );

  return (
    <div className="container mt-3 h-[100vh] overflow-auto rounded-lg shadow-md text-white">
      <h1 className="text-3xl font-bold text-center mb-8 bg-[#193351] p-4 rounded-md shadow-lg">
        Users List
      </h1>
      {isPending && <Spinner />}
      {error && <div className="text-center text-red-500">Error: {error}</div>}
      {data && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {data.map((item) => (
            <div
              key={item._id}
              className="p-4 rounded-lg shadow-sm bg-[#193351]"
            >
              <h2 className="text-xl font-bold mb-2">User: {item.username}</h2>
              <p className="text-gray-600 mb-2 truncate text-white">Email: {item.email}</p>
              <Link
                to={`/customers/${item._id}`}
                className="text-blue-500 hover:underline"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Customers;
