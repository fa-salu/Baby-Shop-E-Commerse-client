import React, { useState, useEffect } from "react";
import useFetch from "../../utils/Api";
import AddProductModal from "./AddProduct";
import Cookies from "js-cookie";
import { FaEdit, FaTrash, FaSearch } from "react-icons/fa";
import { MdModeEdit } from "react-icons/md";
import Spinner from "../../Component/Spinner/Spinner";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { data, isPending, error } = useFetch(
    "https://babyshop-backend.onrender.com/admin/products"
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
        `https://babyshop-backend.onrender.com/admin/product/delete/${productId}`,
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
    <div className="relative mt-5 ml-5 text-white font-serif">
      <h1 className="text-3xl font-bold text-center mb-8 bg-[#193251] p-4 rounded-md shadow-lg">
        Products
      </h1>

      <div className="mb-6 flex items-center space-x-4 ">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 px-4 py-2 border bg-[#193251] border-gray-300 rounded-md shadow-sm"
        />
        <FaSearch size={20} className="text-gray-600" />
      </div>

      <button
        onClick={openModal}
        className="px-4 py-2 text-md text-white text-bold bg-gray-500 mb-6 rounded-md shadow-sm hover:bg-[#13233A] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Add Product
      </button>

      {isPending && <Spinner />}
      {error && <div>Error: {error}</div>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredProducts.map((item) => (
          <div
            key={item._id}
            className="relative p-4 rounded shadow-lg flex flex-col text-center"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-28 object-cover mb-4 rounded"
            />
            <h2 className="text-xl font-bold">{item.name}</h2>
            <p className="text-gray-600">{item.description}</p>
            <p className="text-lg font-semibold">₹{item.price}</p>
            <p className="text-gray-500">Category: {item.category}</p>
            <p className="text-yellow-500">
                  {"★".repeat(item.stars)}
                  {"☆".repeat(5 - item.stars)}
                </p>

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
