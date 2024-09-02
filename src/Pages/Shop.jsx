import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";
import { ShopContext } from "../Context/CartItem/ShopContext";
import useFetch from "../utils/Api";
import CategoryProducts from "../Component/Category/Categories";
import Footer from "../Component/Footer/Footer";
import Spinner from "../Component/Spinner/Spinner";

const Shop = () => {
  const { category } = useParams();
  const { addToWishlist, wishlistItems, currentUser, getWishlist } =
    useContext(ShopContext);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  // Fetch products based on category
  const { data, isPending, error } = useFetch(
    category && category !== "All"
      ? `https://babyshop-backend.onrender.com/users/products/${category}`
      : "https://babyshop-backend.onrender.com/users/products"
  );

  useEffect(() => {
    if (data) {
      setProducts(data);
    }
  }, [data]);

  useEffect(() => {
    if (currentUser && wishlistItems.length === 0) {
      getWishlist(currentUser.id);
    }
  }, [currentUser, getWishlist, wishlistItems]);

  const isProductInWishlist = (productId) =>
    wishlistItems.some((item) => item._id === productId);

  const toggleWishlist = (productId) => {
    if (!currentUser) {
      alert("Please log in to manage your wishlist.");
      navigate("/login");
      return;
    }
    addToWishlist(currentUser.id, productId);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <div className="text-left mb-8">
          <h1 className="text-5xl text-gray-800 font-serif">Shop</h1>
          <hr className="m-10" />
        </div>
        <CategoryProducts />
        <div>
          <h1 className="mt-10 text-3xl font-serif text-gray-600 text-center">
            {category ? `${category}` : "All"}
          </h1>
          <hr className="m-8" />
        </div>
        {isPending && <Spinner />}
        {error && <div>Error: {error}</div>}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((item) => (
            <div
              key={item._id}
              className="bg-white shadow-md rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-300"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-52 object-cover"
                onClick={() => navigate(`/shop/${item._id}`)}
              />
              <div className="p-4">
                <h4 className="text-lg font-serif font-semibold text-center mb-2 text-gray-900">
                  {item.name}
                </h4>

                <p className="text-gray-700 text-center font-serif mb-2">₹{item.price}</p>
                <p className="text-yellow-500 text-center">
                  {"★".repeat(item.stars)}
                  {"☆".repeat(5 - item.stars)}
                </p>
                {/* Wishlist Icon */}
                <button
                  onClick={() => toggleWishlist(item._id)}
                  className="mt-2"
                >
                  <FontAwesomeIcon
                    icon={
                      isProductInWishlist(item._id) ? solidHeart : regularHeart
                    }
                    size="lg"
                    className={`${
                      isProductInWishlist(item._id)
                        ? "text-red-500"
                        : "text-gray-400"
                    } transition-colors duration-300`}
                  />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <hr className="bg-gray mt-5" />
      <Footer />
    </div>
  );
};

export default Shop;
