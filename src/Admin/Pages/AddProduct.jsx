import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";

const AddProductModal = ({ onClose, onAdd, onEdit, editProduct }) => {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    category: "",
    stars: "",
  });

  useEffect(() => {
    if (editProduct) {
      setProduct({
        name: editProduct.name || "",
        description: editProduct.description || "",
        price: editProduct.price || "",
        image: editProduct.image || "",
        category: editProduct.category || "",
        stars: editProduct.stars || "",
      });
    } else {
      setProduct({
        name: "",
        description: "",
        price: "",
        image: "",
        category: "",
        stars: "",
      });
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
        price: parseFloat(product.price),
        stars: parseFloat(product.stars),
      };

      const token = Cookies.get("token");
      const url = editProduct
        ? `https://babyshop-backend.onrender.com/admin/product/${editProduct._id}`
        : "https://babyshop-backend.onrender.com/admin/product";
      const method = editProduct ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedProduct),
      });

      if (!response.ok) {
        throw new Error(`Failed to ${editProduct ? "update" : "add"} product`);
      }

      const result = await response.json();
      if (editProduct) {
        onEdit(result.updateProduct);
      } else {
        onAdd(result.newProduct);
      }
      onClose();
    } catch (error) {
      console.error(
        `Error ${editProduct ? "updating" : "adding"} product:`,
        error
      );
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 mt-7 rounded shadow-lg w-11/12 max-w-2xl h-[80vh] overflow-auto">
        <h2 className="text-2xl font-bold mb-4">
          {editProduct ? "Edit" : "Add"} Product
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Form fields for name, description, price, image, category, stars */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={product.name}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md text-black"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <input
              type="text"
              name="description"
              value={product.description}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md text-black"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Price
            </label>
            <input
              type="number"
              name="price"
              value={product.price}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md text-black"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Image URL
            </label>
            <input
              type="text"
              name="image"
              value={product.image}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md text-black"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Category
            </label>
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
            <label className="block text-sm font-medium text-gray-700 text-black">
              Stars
            </label>
            <input
              type="number"
              name="stars"
              value={product.stars}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md text-black"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-white bg-gray-600 border border-transparent rounded-md shadow-sm hover:bg-gray-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="ml-4 px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700"
            >
              {editProduct ? "Update" : "Add"} Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductModal;
