// import React, { useState } from 'react';

// const AddProductModal = ({ onClose, onAdd }) => {
//   const [product, setProduct] = useState({
//     name: '',
//     description: '',
//     price: '',
//     image: '',
//     category: '',
//     stars: ''
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setProduct({ ...product, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch('http://localhost:8000/db', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(product)
//       });
//       if (!response.ok) {
//         throw new Error('Failed to add product');
//       }
//       const newProduct = await response.json();
//       onAdd(newProduct);
//       onClose();
//     } catch (error) {
//       console.error('Error adding product:', error);
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
//       <div className="bg-white p-6 mt-7 rounded shadow-lg w-11/12 max-w-2xl h-[80vh] overflow-auto">
//         <h2 className="text-2xl font-bold mb-4">Add Product</h2>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Name</label>
//             <input
//               type="text"
//               name="name"
//               value={product.name}
//               onChange={handleChange}
//               className="mt-1 p-2 w-full border rounded-md"
//               required
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Description</label>
//             <input
//               type="text"
//               name="description"
//               value={product.description}
//               onChange={handleChange}
//               className="mt-1 p-2 w-full border rounded-md"
//               required
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Price</label>
//             <input
//               type="number"
//               name="price"
//               value={product.price}
//               onChange={handleChange}
//               className="mt-1 p-2 w-full border rounded-md"
//               required
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Image URL</label>
//             <input
//               type="text"
//               name="image"
//               value={product.image}
//               onChange={handleChange}
//               className="mt-1 p-2 w-full border rounded-md"
//               required
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Category</label>
//             <input
//               type="text"
//               name="category"
//               value={product.category}
//               onChange={handleChange}
//               className="mt-1 p-2 w-full border rounded-md"
//               required
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Stars</label>
//             <input
//               type="number"
//               name="stars"
//               value={product.stars}
//               onChange={handleChange}
//               className="mt-1 p-2 w-full border rounded-md"
//               required
//             />
//           </div>
//           <div className="flex justify-end space-x-4">
//             <button
//               type="button"
//               onClick={onClose}
//               className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
//             >
//               Add
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AddProductModal;


import React, { useState, useEffect } from 'react';

const AddProductModal = ({ onClose, onAdd, onEdit, editProduct }) => {
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    image: '',
    category: '',
    stars: ''
  });

  useEffect(() => {
    if (editProduct) {
      setProduct(editProduct);
    }
  }, [editProduct]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedProduct = {
        ...product,
        id: editProduct ? editProduct.id : Date.now(), // or any method to generate unique numeric id
        price: parseFloat(product.price),
        stars: parseFloat(product.stars)
      };
      const response = await fetch(editProduct ? `http://localhost:8000/db/${editProduct.id}` : 'http://localhost:8000/db', {
        method: editProduct ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedProduct)
      });
      if (!response.ok) {
        throw new Error(`Failed to ${editProduct ? 'update' : 'add'} product`);
      }
      const savedProduct = await response.json();
      if (editProduct) {
        onEdit(savedProduct);
      } else {
        onAdd(savedProduct);
      }
      onClose();
    } catch (error) {
      console.error(`Error ${editProduct ? 'updating' : 'adding'} product:`, error);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 mt-7 rounded shadow-lg w-11/12 max-w-2xl h-[80vh] overflow-auto">
        <h2 className="text-2xl font-bold mb-4">{editProduct ? 'Edit' : 'Add'} Product</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={product.name}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <input
              type="text"
              name="description"
              value={product.description}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Price</label>
            <input
              type="number"
              name="price"
              value={product.price}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Image URL</label>
            <input
              type="text"
              name="image"
              value={product.image}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Category</label>
            <input
              type="text"
              name="category"
              value={product.category}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Stars</label>
            <input
              type="number"
              name="stars"
              value={product.stars}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              {editProduct ? 'Update' : 'Add'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductModal;
