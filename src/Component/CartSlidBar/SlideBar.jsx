// import React, { useContext, useEffect } from "react";
// import { ShopContext } from "../../Context/CartItem/ShopContext";
// import { FaTimes } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// import useFetch from "../../utils/Api";

// const SlideBar = ({ isCartOpen, toggleCart }) => {
//   const { cart, addToCart, removeToCart, deleteItem } = useContext(ShopContext);
//   const navigate = useNavigate();
//   const {
//     data: apiData,
//     isPending,
//     error,
//   } = useFetch("http://localhost:8000/db");

//   useEffect(() => {
//     if (error) {
//       console.error("Error fetching data:", error);
//     }
//   }, [error]);

//   const cartItems = Object.keys(cart)
//     .filter((id) => cart[id] > 0)
//     .map((id) => {
//       const product = apiData.find((prod) => prod.id == parseInt(id));
//       return { ...product, quantity: cart[id] };
//     });

//   const calculateSubtotal = () => {
//     return cartItems
//       .reduce((acc, item) => acc + item.price * item.quantity, 0)
//       .toFixed(2);
//   };

//   const handleViewCart = () => {
//     navigate("/cartitems");
//     toggleCart();
//   };

//   return (
//     <div
//       className={`fixed top-0 right-0 h-full bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
//         isCartOpen ? "translate-x-0" : "translate-x-full"
//       } lg:w-4/12 w-full max-w-[70%] z-50`}
//     >
//       <div className="flex flex-col h-full">
//         <div className="p-6 flex-shrink-0">
//           <div className="flex justify-between items-center mb-4">
//             <h2 className="text-2xl font-bold">Your Cart</h2>
//             <FaTimes
//               size={24}
//               className="cursor-pointer"
//               onClick={toggleCart}
//             />
//           </div>
//           <hr className="border-gray-300 my-4" />
//         </div>
//         <div className="flex-1 overflow-y-auto px-6">
//           {isPending && <div>Loading...</div>}
//           {error && <div>Error: {error}</div>}
//           {cartItems.length === 0 ? (
//             <p>Your cart is empty</p>
//           ) : (
//             cartItems.map((item) => (
//               <div
//                 key={item.id}
//                 className="flex items-center justify-between mb-4"
//               >
//                 <img
//                   src={item.image}
//                   alt={item.name}
//                   className="w-16 h-16 object-cover rounded-md"
//                 />
//                 <div className="flex-1 mx-4">
//                   <p className="text-lg font-semibold">{item.name}</p>
//                   <div className="flex items-center mt-1">
//                     <button
//                       onClick={() => removeToCart(item.id)}
//                       className="text-gray-500 px-2 py-1 rounded-md border border-gray-300"
//                     >
//                       -
//                     </button>
//                     <p className="text-gray-600 mx-2">{item.quantity}</p>
//                     <button
//                       onClick={() => addToCart(item.id)}
//                       className="text-gray-500 px-2 py-1 rounded-md border border-gray-300"
//                     >
//                       +
//                     </button>
//                   </div>
//                   <p className="text-gray-600">
//                     ${(item.price * item.quantity).toFixed(2)}
//                   </p>
//                 </div>
//                 <button
//                   onClick={() => deleteItem(item.id)}
//                   className="px-3 py-1 bg-red-500 text-white rounded-md"
//                 >
//                   Remove
//                 </button>
//               </div>
//             ))
//           )}
//         </div>
//         <div className="p-6 flex-shrink-0">
//           <div>
//             <hr className="border-gray-300" />
//             <p className="text-lg mt-2">Subtotal: ${calculateSubtotal()}</p>
//             <hr className="border-gray-300 mt-2" />
//           </div>
//           <div className="mt-6">
//             <button
//               onClick={handleViewCart}
//               className="w-full py-2 bg-gray-800 text-white rounded-md"
//             >
//               VIEW CART
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SlideBar;





import React, { useContext, useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { ShopContext } from "../../Context/CartItem/ShopContext";

const SlideBar = ({ isCartOpen, toggleCart }) => {
  const [cartItems, setCartItems] = useState([]);
  const { addToCart, deleteCartItem, clearCart } = useContext(ShopContext);

  const navigate = useNavigate();
  const currentUser = Cookies.get("currentUser");
  const userId = currentUser ? JSON.parse(currentUser).id : null;

  const getCartItems = async () => {
    try {
      const token = Cookies.get("token");
      const response = await fetch(`http://localhost:5000/users/cart/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch cart items");
      }

      const data = await response.json();
      setCartItems(data);
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };

  useEffect(() => {
    if (isCartOpen) {
      getCartItems();
    }
  }, [isCartOpen]);

  const handleViewCart = () => {
    navigate("/cartitems");
    toggleCart();
  };

  const handleAddToCart = async (productId) => {
    try {
      await addToCart(userId, productId);
      getCartItems(); // Re-fetch the cart items after adding to cart
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };

  const handleRemoveFromCart = async (productId) => {
    try {
      await deleteCartItem(userId, productId);
      getCartItems(userId); // Re-fetch the cart items after deletion
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  const handleClearCart = async () => {
    try {
      await clearCart(userId);
      getCartItems(userId)
    } catch (error) {
      console.error("Error clearing cart:", error);
    }
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
                key={item._id}
                className="flex items-center justify-between mb-4"
              >
                {item.productId && (
                  <>
                    <img
                      src={item.productId.image}
                      alt={item.productId.name}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                    <div className="flex-1 mx-4">
                      <p className="text-lg font-semibold">
                        {item.productId.name}
                      </p>
                      <div className="flex items-center mt-1">
                        <button
                          onClick={() => handleRemoveFromCart(item.productId._id)}
                          className="text-gray-500 px-2 py-1 rounded-md border border-gray-300"
                        >
                          -
                        </button>
                        <p className="text-gray-600 mx-2">{item.quantity}</p>
                        <button
                          onClick={() => handleAddToCart(item.productId._id)} // Pass the correct productId
                          className="text-gray-500 px-2 py-1 rounded-md border border-gray-300"
                        >
                          +
                        </button>
                      </div>
                      <p className="text-gray-600">
                        ${(item.productId.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                    <button
                      onClick={() => handleClearCart(item.productId._id)}
                      className="px-3 py-1 bg-red-500 text-white rounded-md"
                    >
                      Remove
                    </button>
                  </>
                )}
              </div>
            ))
          )}
        </div>
        <div className="p-6 flex-shrink-0">
          <div>
            <hr className="border-gray-300" />
            <p className="text-lg mt-2">
              Subtotal: $
              {cartItems
                .reduce(
                  (total, item) =>
                    item.productId
                      ? total + item.productId.price * item.quantity
                      : total,
                  0
                )
                .toFixed(2)}
            </p>
            <button
              onClick={handleViewCart}
              className="w-full mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              View Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SlideBar;
