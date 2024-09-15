import React, { useEffect, useContext } from "react";
import { ShopContext } from "../Context/CartItem/ShopContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { BsFillArrowLeftSquareFill } from "react-icons/bs";

const Wishlist = () => {
  const {
    currentUser,
    wishlistItems,
    getWishlist,
    removeFromWishlist,
    addToCart,
  } = useContext(ShopContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      getWishlist(currentUser.id);
    }
  }, [currentUser, getWishlist]);

  const handleRemoveFromWishlist = (productId) => {
    if (currentUser) {
      removeFromWishlist(currentUser.id, productId);
    } else {
      alert("Please log in to manage your wishlist.");
    }
  };

  const handleAddToCart = (productId) => {
    if (currentUser) {
      addToCart(currentUser.id, productId);
    } else {
      alert("Please log in to add items to your cart.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <Link to={"/"} className="flex items-center ml-28 mt-8">
        <BsFillArrowLeftSquareFill size={32} />
        <span className="ml-2 text-lg">Home</span>
      </Link>
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-gray-800 font-serif">
            Your Wishlist
          </h1>
          <hr className="m-10" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {wishlistItems.length === 0 ? (
            <div className="text-center text-gray-700">
              Your wishlist is empty.
            </div>
          ) : (
            wishlistItems.map((item) => (
              <div
                key={item._id}
                className="bg-white shadow-md rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-300"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-52 object-cover cursor-pointer"
                  onClick={() => navigate(`/shop/${item._id}`)}
                />
                <div className="p-4">
                  <h4 className="text-lg font-semibold mb-2 text-gray-900">
                    {item.name}
                  </h4>
                  <p className="text-gray-700 mb-2">${item.price}</p>
                  <p className="text-yellow-500">
                    {"★".repeat(item.stars)}
                    {"☆".repeat(5 - item.stars)}
                  </p>
                  <div className="flex items-center mt-2">
                    <button
                      onClick={() => handleRemoveFromWishlist(item._id)}
                      className="mr-2"
                      aria-label="Remove from Wishlist"
                    >
                      <FontAwesomeIcon
                        icon={solidHeart}
                        size="lg"
                        className="text-red-500"
                      />
                    </button>
                    <button
                      onClick={() => handleAddToCart(item._id)}
                      aria-label="Add to Cart"
                    >
                      <FontAwesomeIcon
                        icon={faCartPlus}
                        size="lg"
                        className="text-blue-500"
                      />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
