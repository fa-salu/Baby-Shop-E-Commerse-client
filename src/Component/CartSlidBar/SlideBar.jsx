import React, { useContext } from "react";
import { ShopContext } from "../../Context/CartItem/ShopContext";
import { FaTimes } from "react-icons/fa";
import { data_Product } from "../../assets/data";
import { useNavigate } from "react-router-dom";

const SlideBar = ({ isCartOpen, toggleCart }) => {
  const { cart, addToCart, removeToCart, deleteItem, uniqueItemsCount } =
    useContext(ShopContext);
  const navigate = useNavigate();

  const cartItems = Object.keys(cart)
    .filter((id) => cart[id] > 0)
    .map((id) => {
      const product = data_Product.find((prod) => prod.id === parseInt(id));
      return { ...product, quantity: cart[id] };
    });

  const calculateSubtotal = () => {
    return cartItems
      .reduce((acc, item) => acc + item.price * item.quantity, 0)
      .toFixed(2);
  };

  const handleViewCart = () => {
    navigate("/cartitems");
    toggleCart();
  };

  return (
    <div
      className={`fixed top-0 right-0 h-full bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
        isCartOpen ? "translate-x-0" : "translate-x-full"
      } lg:w-4/12 w-full max-w-[70%] z-50`}
    >
      <div className="flex flex-col h-full">
        <div className="p-6 flex-shrink-0">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Your Cart</h2>
            <FaTimes
              size={24}
              className="cursor-pointer"
              onClick={toggleCart}
            />
          </div>
          <hr className="border-gray-300 my-4" />
        </div>
        <div className="flex-1 overflow-y-auto px-6">
          {cartItems.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between mb-4"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-md"
                />
                <div className="flex-1 mx-4">
                  <p className="text-lg font-semibold">{item.name}</p>
                  <div className="flex items-center mt-1">
                    <button
                      onClick={() => removeToCart(item.id)}
                      className="text-gray-500 px-2 py-1 rounded-md border border-gray-300"
                    >
                      -
                    </button>
                    <p className="text-gray-600 mx-2">{item.quantity}</p>
                    <button
                      onClick={() => addToCart(item.id)}
                      className="text-gray-500 px-2 py-1 rounded-md border border-gray-300"
                    >
                      +
                    </button>
                  </div>
                  <p className="text-gray-600">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
                <button
                  onClick={() => deleteItem(item.id)}
                  className="px-3 py-1 bg-red-500 text-white rounded-md"
                >
                  Remove
                </button>
              </div>
            ))
          )}
        </div>
        <div className="p-6 flex-shrink-0">
          <div>
            <hr className="border-gray-300" />
            <p className="text-lg mt-2">Subtotal: ${calculateSubtotal()}</p>
            <hr className="border-gray-300 mt-2" />
          </div>
          <div className="mt-6">
            <button
              onClick={handleViewCart}
              className="w-full py-2 bg-gray-800 text-white rounded-md"
            >
              VIEW CART
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SlideBar;
