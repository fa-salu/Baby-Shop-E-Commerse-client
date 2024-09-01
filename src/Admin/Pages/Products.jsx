import React, { useState, useEffect } from "react";
import useFetch from "../../utils/Api";
import AddProductModal from "./AddProduct";
import Cookies from "js-cookie";
import { FaEdit, FaTrash, FaSearch } from "react-icons/fa";
import { MdModeEdit } from "react-icons/md";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { data, isPending, error } = useFetch(
    "http://localhost:5000/admin/products"
  );

  useEffect(() => {
    if (data) {
      setProducts(data);
    }
  }, [data]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [selectedProductId, setSelectedProductId] = useState(null);

  const token = Cookies.get("token");

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
    setSelectedProductId(null);
  };

  const handleDeleteProduct = async (productId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/admin/product/delete/${productId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete product");
      }
      setProducts(products.filter((item) => item._id !== productId));
      console.log("Product deleted successfully");
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleAddProduct = (newProduct) => {
    setProducts([...products, newProduct]);
    console.log("Product added:", newProduct);
  };

  const handleUpdateProduct = (updatedProduct) => {
    setProducts(
      products.map((product) =>
        product._id === updatedProduct._id ? updatedProduct : product
      )
    );
    console.log("Product updated:", updatedProduct);
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative mt-5">
      <h1 className="text-3xl font-bold text-center mb-8 bg-gray-50 p-4 rounded-md shadow-lg">
        Products
      </h1>

      <div className="mb-6 flex items-center space-x-4">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm"
        />
        <FaSearch size={20} className="text-gray-600" />
      </div>

      <button
        onClick={openModal}
        className="px-4 py-2 text-sm font-medium text-white bg-blue-600 mb-6 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Add Product
      </button>

      {isPending && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {filteredProducts.map((item) => (
          <div
            key={item._id}
            className="relative border p-4 rounded shadow-lg flex flex-col text-center"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-28 object-cover mb-4 rounded"
            />
            <h2 className="text-xl font-bold">{item.name}</h2>
            <p className="text-gray-600">{item.description}</p>
            <p className="text-lg font-semibold">${item.price}</p>
            <p className="text-gray-500">Category: {item.category}</p>

            <div className="mt-auto flex justify-end space-x-2">
              {selectedProductId === item._id ? (
                <>
                  <button
                    onClick={() => handleDeleteProduct(item._id)}
                    className="text-red-600 hover:text-red-800 focus:outline-none"
                  >
                    <FaTrash size={20} />
                  </button>
                  <button
                    onClick={() => openEditModal(item)}
                    className="text-blue-600 hover:text-blue-800 focus:outline-none"
                  >
                    <FaEdit size={20} />
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setSelectedProductId(item._id)}
                  className="text-blue-600 hover:text-blue-800 focus:outline-none"
                >
                  <MdModeEdit size={20} />
                </button>
              )}
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
