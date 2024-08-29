import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../../Context/CartItem/ShopContext";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const CartItems = () => {
  const { addToCart, deleteCartItem, removeCartItem } = useContext(ShopContext);
  const [cartItems, setCartItems] = useState([]);
  const [name, setName] = useState("");
  const [place, setPlace] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const navigate = useNavigate();
  const currentUser = Cookies.get("currentUser");
  const userId = currentUser ? JSON.parse(currentUser).id : null;

  const getCartItems = async () => {
    try {
      const token = Cookies.get("token");
      const response = await fetch(
        `http://localhost:5000/users/cart/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

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
      getCartItems();
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };

  const handleRemoveFromCart = async (productId) => {
    try {
      await removeCartItem(userId, productId);
      getCartItems();
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  const handleDeleteCart = async (productId) => {
    try {
      await deleteCartItem(userId, productId);
      getCartItems();
    } catch (error) {
      console.error("Error deleting item from cart:", error);
    }
  };

  const handleCheckout = async () => {
    try {
      const token = Cookies.get("token");
      const response = await fetch("http://localhost:5000/users/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userId, name, place, phone, address }),
      });

      if (!response.ok) {
        throw new Error("Failed to create order");
      }

      const data = await response.json();

      const options = {
        key: data.razorpayKeyId,
        amount: data.order.totalPrice * 100,
        currency: "INR",
        name: "Baby Shop",
        description: "Thank you for purchase",
        order_id: data.razorpayOrderId,
        handler: async function (response) {
          try {
            const verifyResponse = await fetch(
              "http://localhost:5000/users/order/verify",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                  razorpayOrderId: response.razorpay_order_id,
                  razorpayPaymentId: response.razorpay_payment_id,
                  razorpaySignature: response.razorpay_signature,
                }),
              }
            );

            if (!verifyResponse.ok) {
              throw new Error("Payment verification failed");
            }

            const verifyData = await verifyResponse.json();
            console.log("Payment verified:", verifyData);
            // navigate(``)
          } catch (error) {
            console.error("Error verifying payment:", error);
          }
        },
        // prefill: {
        //   name: "fasalu",
        //   email: "fasalu@gmail.com",
        //   contact: 22222222222,
        // },
        // theme: {
        //   color: "#3399cc",
        // },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Error during checkout:", error);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row justify-between p-6">
      {/* Cart Details */}
      <div className="w-full lg:w-7/12 mb-8 lg:mb-0">
        <h1 className="text-2xl font-bold mb-4">Cart</h1>
        <div className="bg-white p-4 rounded-md shadow-md">
          <table className="min-w-full bg-transparent">
            <thead>
              <tr>
                <th className="py-2 border-b border-gray-300 text-center">
                  Product
                </th>
                <th className="py-2 border-b border-gray-300 text-center">
                  Price
                </th>
                <th className="py-2 border-b border-gray-300 text-center">
                  Quantity
                </th>
                <th className="py-2 border-b border-gray-300 text-center">
                  Total
                </th>
                <th className="py-2 border-b border-gray-300 text-center">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item._id}>
                  <td className="py-2 border-b border-gray-300 text-center">
                    {item.productId ? item.productId.name : "Product not found"}
                  </td>
                  <td className="py-2 border-b border-gray-300 text-center">
                    ₹{item.productId ? item.productId.price : "N/A"}
                  </td>
                  <td className="py-2 border-b border-gray-300 text-center">
                    {item.quantity}
                  </td>
                  <td className="py-2 border-b border-gray-300 text-center">
                    ₹
                    {item.productId
                      ? item.productId.price * item.quantity
                      : "N/A"}
                  </td>
                  <td className="py-2 border-b border-gray-300 text-center">
                    <button
                      onClick={() => handleAddToCart(item.productId._id)}
                      className="mr-2 px-3 py-1 bg-green-500 text-white rounded-md"
                    >
                      +
                    </button>
                    <button
                      onClick={() => handleRemoveFromCart(item.productId._id)}
                      className="mr-2 px-3 py-1 bg-red-500 text-white rounded-md"
                    >
                      -
                    </button>
                    <button
                      onClick={() => handleDeleteCart(item.productId._id)}
                      className="px-3 py-1 bg-gray-500 text-white rounded-md"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Checkout Form */}
      <div className="w-full lg:w-4/12">
        <h1 className="text-2xl font-bold mb-4">Checkout</h1>
        <div className="bg-white p-4 rounded-md shadow-md">
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-600">
              Name:
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="place" className="block text-gray-600">
              Place:
            </label>
            <input
              type="text"
              id="place"
              value={place}
              onChange={(e) => setPlace(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="phone" className="block text-gray-600">
              Phone:
            </label>
            <input
              type="text"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="address" className="block text-gray-600">
              Address:
            </label>
            <textarea
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mt-4">
            <button
              onClick={handleCheckout}
              className="w-full px-4 py-2 bg-blue-500 text-white rounded-md"
            >
              Checkout
            </button>
          </div>
        </div>
        <Link to={'/orderDetails'}><h2 className="w-full px-4 py-2 mt-3 bg-blue-500 text-white-center rounded-md">Order Details</h2></Link>
      </div>
    </div>
  );
};

export default CartItems;
