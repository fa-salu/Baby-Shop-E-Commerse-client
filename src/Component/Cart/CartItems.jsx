// import React, { useContext } from "react";
// import { ShopContext } from "../../Context/CartItem/ShopContext";
// import { useNavigate } from "react-router-dom";

// const CartItems = () => {
//   const { cartItems } = useContext(ShopContext);
//   const navigate = useNavigate();

//   const calculateSubtotal = () => {
//     return cartItems
//       .reduce((acc, item) => acc + item.price * item.quantity, 0)
//       .toFixed(2);
//   };

//   const total = calculateSubtotal();

//   return (
//     <div className="flex flex-col lg:flex-row justify-between p-6">
//       <div className="w-full lg:w-7/12 mb-8 lg:mb-0">
//         <h1 className="text-2xl font-bold mb-4">Cart</h1>
//         <div className="bg-white p-4 rounded-md shadow-md">
//           <table className="min-w-full bg-transparent">
//             <thead>
//               <tr>
//                 <th className="py-2 border-b border-gray-300 text-center">
//                   Product
//                 </th>
//                 <th className="py-2 border-b border-gray-300 text-center">
//                   Price
//                 </th>
//                 <th className="py-2 border-b border-gray-300 text-center">
//                   Quantity
//                 </th>
//                 <th className="py-2 border-b border-gray-300 text-center">
//                   Subtotal
//                 </th>
//               </tr>
//             </thead>
//             <tbody>
//               {cartItems.map((item) => (
//                 <tr key={item.id}>
//                   <td className="py-2 border-b border-gray-300 text-center">
//                     {item.name}
//                   </td>
//                   <td className="py-2 border-b border-gray-300 text-center">
//                     ${item.price.toFixed(2)}
//                   </td>
//                   <td className="py-2 border-b border-gray-300 text-center">
//                     {item.quantity}
//                   </td>
//                   <td className="py-2 border-b border-gray-300 text-center">
//                     ${(item.price * item.quantity).toFixed(2)}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       <div className="w-full lg:w-4/12 lg:ml-8">
//         <h2 className="text-2xl font-bold mb-4">Cart Total</h2>
//         <div className="bg-white p-6 shadow-md rounded-md">
//           <div className="flex justify-between mb-4">
//             <span className="text-gray-900">Subtotal:</span>
//             <span className="text-gray-900">${calculateSubtotal()}</span>
//           </div>
//           <hr className="border-gray-300 mb-4" />
//           <div className="flex justify-between mb-4">
//             <span className="text-gray-900">Total:</span>
//             <span className="text-gray-900">${total}</span>
//           </div>
//           <input
//             type="text"
//             placeholder="Coupon code"
//             className="w-full p-2 mb-4 border border-gray-300 rounded-md"
//           />
//           <button className="w-full py-2 mb-4 bg-blue-600 text-white rounded-md">
//             Apply
//           </button>
//           <button
//             onClick={() => {
//               if (cartItems.length > 0) {
//                 navigate("/checkout");
//               } else {
//                 alert("Your cart is empty.");
//               }
//             }}
//             className="w-full py-2 bg-green-600 text-white rounded-md"
//           >
//             Proceed to Checkout
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CartItems;





// import React, { useContext, useEffect, useState } from "react";
// import { ShopContext } from "../../Context/CartItem/ShopContext";
// import { useNavigate } from "react-router-dom";
// import Cookies from "js-cookie";

// const CartItems = () => {
//   const { addToCart, deleteCartItem, clearCart, removeCartItem } = useContext(ShopContext);
//   const [cartItems, setCartItems] = useState([]);
//   const navigate = useNavigate();
//   const currentUser = Cookies.get("currentUser");
//   const userId = currentUser ? JSON.parse(currentUser).id : null;

//   const getCartItems = async () => {
//     try {
//       const token = Cookies.get("token");
//       const response = await fetch(`http://localhost:5000/users/cart/${userId}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (!response.ok) {
//         throw new Error("Failed to fetch cart items");
//       }

//       const data = await response.json();
//       setCartItems(data);
//     } catch (error) {
//       console.error("Error fetching cart items:", error);
//     }
//   };

//   useEffect(() => {
//     getCartItems();
//   }, []);

//   const handleAddToCart = async (productId) => {
//     try {
//       await addToCart(userId, productId);
//       getCartItems(); // Re-fetch the cart items after adding to cart
//     } catch (error) {
//       console.error("Error adding item to cart:", error);
//     }
//   };

//   const handleRemoveFromCart = async (productId) => {
//     try {
//       await removeCartItem(userId, productId);
//       getCartItems(userId); // Re-fetch the cart items after deletion
//     } catch (error) {
//       console.error("Error removing item from cart:", error);
//     }
//   };

//   const handelDeleteCart = async (productId) => {
//     try {
//       await deleteCartItem(userId, productId)
//       getCartItems(userId)
//     } catch (error) {
//       console.error("Error deleting item from cart: " , error);
//     }
//   }

//   const handleClearCart = async () => {
//     try {
//       await clearCart(userId);
//       setCartItems([]);
//     } catch (error) {
//       console.error("Error clearing cart:", error);
//     }
//   };

//   const calculateSubtotal = () => {
//     return cartItems
//       .reduce(
//         (acc, item) => item.productId ? acc + item.productId.price * item.quantity : acc,
//         0
//       )
//       .toFixed(2);
//   };

//   return (
//     <div className="flex flex-col lg:flex-row justify-between p-6">
//       <div className="w-full lg:w-7/12 mb-8 lg:mb-0">
//         <h1 className="text-2xl font-bold mb-4">Cart</h1>
//         <div className="bg-white p-4 rounded-md shadow-md">
//           <table className="min-w-full bg-transparent">
//             <thead>
//               <tr>
//                 <th className="py-2 border-b border-gray-300 text-center">Product</th>
//                 <th className="py-2 border-b border-gray-300 text-center">Price</th>
//                 <th className="py-2 border-b border-gray-300 text-center">Quantity</th>
//                 <th className="py-2 border-b border-gray-300 text-center">Subtotal</th>
//                 <th className="py-2 border-b border-gray-300 text-center">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {cartItems.map((item) => (
//                 <tr key={item._id}>
//                   <td className="py-2 border-b border-gray-300 text-center">
//                     {item.productId.name}
//                   </td>
//                   <td className="py-2 border-b border-gray-300 text-center">
//                     ${item.productId.price.toFixed(2)}
//                   </td>
//                   <td className="py-2 border-b border-gray-300 text-center">
//                     <div className="flex justify-center items-center">
//                       <button
//                         onClick={() => handleRemoveFromCart(item.productId._id)}
//                         className="text-gray-500 px-2 py-1 rounded-md border border-gray-300"
//                       >
//                         -
//                       </button>
//                       <span className="mx-2">{item.quantity}</span>
//                       <button
//                         onClick={() => handleAddToCart(item.productId._id)}
//                         className="text-gray-500 px-2 py-1 rounded-md border border-gray-300"
//                       >
//                         +
//                       </button>
//                     </div>
//                   </td>
//                   <td className="py-2 border-b border-gray-300 text-center">
//                     ${(item.productId.price * item.quantity).toFixed(2)}
//                   </td>
//                   <td className="py-2 border-b border-gray-300 text-center">
//                     <button
//                       onClick={() => handelDeleteCart(item.productId._id)}
//                       className="text-red-500 px-2 py-1 rounded-md border border-red-500"
//                     >
//                       Remove
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       <div className="w-full lg:w-4/12 lg:ml-8">
//         <h2 className="text-2xl font-bold mb-4">Cart Total</h2>
//         <div className="bg-white p-6 shadow-md rounded-md">
//           <div className="flex justify-between mb-4">
//             <span className="text-gray-900">Subtotal:</span>
//             <span className="text-gray-900">${calculateSubtotal()}</span>
//           </div>
//           <hr className="border-gray-300 mb-4" />
//           <input
//             type="text"
//             placeholder="Coupon code"
//             className="w-full p-2 mb-4 border border-gray-300 rounded-md"
//           />
//           <button className="w-full py-2 mb-4 bg-blue-600 text-white rounded-md">
//             Apply
//           </button>
//           <button
//             onClick={() => {
//               if (cartItems.length > 0) {
//                 navigate("/checkout");
//               } else {
//                 alert("Your cart is empty.");
//               }
//             }}
//             className="w-full py-2 bg-green-600 text-white rounded-md"
//           >
//             Proceed to Checkout
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CartItems;


import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../../Context/CartItem/ShopContext";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const CartItems = () => {
  const { addToCart, deleteCartItem, clearCart, removeCartItem } = useContext(ShopContext);
  const [cartItems, setCartItems] = useState([]);
  const [orderDetails, setOrderDetails] = useState(null); // To store order details
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
    getCartItems();
  }, []);

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
      await removeCartItem(userId, productId);
      getCartItems(); // Re-fetch the cart items after deletion
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  const handleDeleteCart = async (productId) => {
    try {
      await deleteCartItem(userId, productId);
      getCartItems(); // Re-fetch the cart items after deletion
    } catch (error) {
      console.error("Error deleting item from cart:", error);
    }
  };

  // const handleClearCart = async () => {
  //   try {
  //     await clearCart(userId);
  //     setCartItems([]);
  //   } catch (error) {
  //     console.error("Error clearing cart:", error);
  //   }
  // };

  const calculateSubtotal = () => {
    return cartItems
      .reduce(
        (acc, item) => item.productId ? acc + item.productId.price * item.quantity : acc,
        0
      )
      .toFixed(2);
  };

  const handleCheckout = async () => {
    try {
      const token = Cookies.get("token");
      const response = await fetch('http://localhost:5000/users/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userId, cartItems }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to create order');
      }
  
      const data = await response.json();
      const { orderId, razorpayOrderId, razorpayKeyId, totalPrice } = data;
  
      const options = {
        key: razorpayKeyId,
        amount: totalPrice * 100, 
        currency: 'INR',
        name: 'Baby Shop',
        description: 'Test Transaction',
        order_id: razorpayOrderId,
        handler: async (response) => {
          try {
            const verifyResponse = await fetch('http://localhost:5000/users/order/verify', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({
                orderId: response.razorpay_order_id,
                paymentId: response.razorpay_payment_id,
                signature: response.razorpay_signature,
              }),
            });
  
            if (!verifyResponse.ok) {
              throw new Error('Payment verification failed');
            }
  
            const verifyData = await verifyResponse.json();
            if (verifyData.message === 'Payment verified') {
              alert('Payment successful');
              navigate("/order-success");
            } else {
              alert('Payment verification failed');
            }
          } catch (error) {
            console.error('Payment verification error:', error);
            alert('Error verifying payment');
          }
        },
        prefill: {
          name: 'John Doe',
          email: 'john.doe@example.com',
          contact: '9999999999',
        },
        theme: {
          color: '#3399cc',
        },
      };
  
      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Checkout process failed. Please try again.');
    }
  };
  

  return (
    <div className="flex flex-col lg:flex-row justify-between p-6">
      <div className="w-full lg:w-7/12 mb-8 lg:mb-0">
        <h1 className="text-2xl font-bold mb-4">Cart</h1>
        <div className="bg-white p-4 rounded-md shadow-md">
          <table className="min-w-full bg-transparent">
            <thead>
              <tr>
                <th className="py-2 border-b border-gray-300 text-center">Product</th>
                <th className="py-2 border-b border-gray-300 text-center">Price</th>
                <th className="py-2 border-b border-gray-300 text-center">Quantity</th>
                <th className="py-2 border-b border-gray-300 text-center">Subtotal</th>
                <th className="py-2 border-b border-gray-300 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item._id}>
                  <td className="py-2 border-b border-gray-300 text-center">
                    {item.productId.name}
                  </td>
                  <td className="py-2 border-b border-gray-300 text-center">
                    ${item.productId.price.toFixed(2)}
                  </td>
                  <td className="py-2 border-b border-gray-300 text-center">
                    <div className="flex justify-center items-center">
                      <button
                        onClick={() => handleRemoveFromCart(item.productId._id)}
                        className="text-gray-500 px-2 py-1 rounded-md border border-gray-300"
                      >
                        -
                      </button>
                      <span className="mx-2">{item.quantity}</span>
                      <button
                        onClick={() => handleAddToCart(item.productId._id)}
                        className="text-gray-500 px-2 py-1 rounded-md border border-gray-300"
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td className="py-2 border-b border-gray-300 text-center">
                    ${(item.productId.price * item.quantity).toFixed(2)}
                  </td>
                  <td className="py-2 border-b border-gray-300 text-center">
                    <button
                      onClick={() => handleDeleteCart(item.productId._id)}
                      className="text-red-500 px-2 py-1 rounded-md border border-red-500"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="w-full lg:w-4/12 lg:ml-8">
        <h2 className="text-2xl font-bold mb-4">Cart Total</h2>
        <div className="bg-white p-6 shadow-md rounded-md">
          <div className="flex justify-between mb-4">
            <span className="text-gray-900">Subtotal:</span>
            <span className="text-gray-900">${calculateSubtotal()}</span>
          </div>
          <hr className="border-gray-300 mb-4" />
          <input
            type="text"
            placeholder="Coupon code"
            className="w-full p-2 mb-4 border border-gray-300 rounded-md"
          />
          <button className="w-full py-2 mb-4 bg-blue-600 text-white rounded-md">
            Apply
          </button>
          <button
            onClick={handleCheckout}
            className="w-full py-2 bg-green-600 text-white rounded-md"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItems;
