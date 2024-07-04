import React from 'react';
import useFetch from '../../utils/Api';

const Products = () => {
  const { data, isPending, error } = useFetch('http://localhost:8000/db');
  // console.log('dataadmin:', data);
  // console.log('hello');

  return (
    <div className="container align-middle p-4 h-[100vh] overflow-auto">
      <h1 className="text-3xl font-bold text-center mt-20 mb-8">Product List</h1>
      <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 mb-6 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">ADD Product</button>
      {isPending && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      {data && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {data.map((item) => (
            <div key={item.id} className="border p-4 rounded shadow-lg">
              <img 
                src={item.image} 
                alt={item.name} 
                className="w-full h-28 object-cover mb-4 rounded" 
              />
              <h2 className="text-xl font-bold">{item.name}</h2>
              <p className="text-gray-600">{item.description}</p>
              <p className="text-lg font-semibold">${item.price}</p>
              <p className="text-gray-500">Category: {item.category}</p>
              <div className='flex justify-between'>
              <button className="px-4 py-2  text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">Delete</button>
              <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">Edit</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;
