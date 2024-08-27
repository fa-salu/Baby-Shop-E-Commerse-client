import React from "react";
import useFetch from "../../utils/Api";
import { Link } from "react-router-dom";

const Customers = () => {
  const { data, isPending, error } = useFetch("http://localhost:8000/user");

  return (
    <div className="container align-middle p-4 h-[100vh] overflow-auto">
      <h1 className="text-3xl font-bold text-center mt-20 mb-8">
        Customer List
      </h1>
      {isPending && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      {data && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {data.map((item) => (
            <div key={item.id} className="border p-4 rounded shadow-lg">
              <h2 className="text-xl font-bold">User: {item.username}</h2>
              <p className="text-gray-600">Email: {item.email}</p>
              <Link
                to={`/customers/${item.id}`}
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
