import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useFetch from '../utils/Api';

const Shop = () => {
  const { data, isPending, error } = useFetch('http://localhost:8000/db');
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (data) {
      setProducts(data);
    }
  }, [data]);

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-gray-800">Shop</h1>
          <hr className="m-10" />
        </div>
        {isPending && <div>Loading...</div>}
        {error && <div>Error: {error}</div>}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((item, ind) => (
            <div
              onClick={() => navigate(`${item.id}`)}
              key={ind}
              className="bg-white shadow-md rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-300"
            >
              <img src={item.image} alt={item.name} className="w-full h-52 object-cover" />
              <div className="p-4">
                <h4 className="text-lg font-semibold mb-2 text-gray-900">{item.name}</h4>
                <p className="text-gray-700 mb-2">${item.price}</p>
                <p className="text-yellow-500">
                  {'★'.repeat(item.stars)}
                  {'☆'.repeat(5 - item.stars)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Shop;
