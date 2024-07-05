// import React, { useState, useEffect } from 'react';
// import useFetch from '../../utils/Api';
// import AddProductModal from './AddProduct';

// const Products = () => {
//   const { data, isPending, error } = useFetch('http://localhost:8000/db');
//   const [products, setProducts] = useState([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   useEffect(() => {
//     if (data) {
//       setProducts(data);
//     }
//   }, [data]);

//   const handleAddProduct = (newProduct) => {
//     setProducts([...products, newProduct]);
//   };

//   const openModal = () => {
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//   };

//   return (
//     <div className="container align-middle p-4 h-[100vh] overflow-auto">
//       <h1 className="text-3xl font-bold text-center mt-20 mb-8">New Products</h1>
//       <button
//         onClick={openModal}
//         className="px-4 py-2 text-sm font-medium text-white bg-blue-600 mb-6 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//       >
//         ADD Product
//       </button>
//       {isPending && <div>Loading...</div>}
//       {error && <div>Error: {error}</div>}
//       <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//         {products.map((item) => (
//           <div key={item.id} className="border p-4 rounded shadow-lg">
//             <img 
//               src={item.image} 
//               alt={item.name} 
//               className="w-full h-28 object-cover mb-4 rounded" 
//             />
//             <h2 className="text-xl font-bold">{item.name}</h2>
//             <p className="text-gray-600">{item.description}</p>
//             <p className="text-lg font-semibold">${item.price}</p>
//             <p className="text-gray-500">Category: {item.category}</p>
//             <div className='flex justify-between'>
//               <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">Delete</button>
//               <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">Edit</button>
//             </div>
//           </div>
//         ))}
//       </div>
//       {isModalOpen && <AddProductModal onClose={closeModal} onAdd={handleAddProduct} />}
//     </div>
//   );
// };

// export default Products;



import React, { useState, useEffect } from 'react';
import useFetch from '../../utils/Api';
import AddProductModal from './AddProduct';

const Products = () => {
  const { data, isPending, error } = useFetch('http://localhost:8000/db');
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editProduct, setEditProduct] = useState(null);

  useEffect(() => {
    if (data) {
      setProducts(data);
    }
  }, [data]);

  const handleAddProduct = (newProduct) => {
    setProducts([...products, newProduct]);
  };

  const handleUpdateProduct = (updatedProduct) => {
    setProducts(
      products.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product
      )
    );
  };

  const handleDeleteProduct = async (id) => {
    try {
      const response = await fetch(`http://localhost:8000/db/${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) {
        throw new Error('Failed to delete product');
      }
      setProducts(products.filter((product) => product.id !== id));
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
    setEditProduct(null);
  };

  const openEditModal = (product) => {
    setEditProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditProduct(null);
  };

  return (
    <div className="container align-middle p-4 h-[100vh] overflow-auto">
      <h1 className="text-3xl font-bold text-center mt-20 mb-8">New Products</h1>
      <button
        onClick={openModal}
        className="px-4 py-2 text-sm font-medium text-white bg-blue-600 mb-6 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        ADD Product
      </button>
      {isPending && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((item) => (
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
              <button
                onClick={() => handleDeleteProduct(item.id)}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Delete
              </button>
              <button
                onClick={() => openEditModal(item)}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>
      {isModalOpen && (
        <AddProductModal
          onClose={closeModal}
          onAdd={handleAddProduct}
          onEdit={handleUpdateProduct}
          editProduct={editProduct}
        />
      )}
    </div>
  );
};

export default Products;
