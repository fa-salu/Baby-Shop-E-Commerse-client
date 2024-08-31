import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { ShopContext } from "../../Context/CartItem/ShopContext";

const PaymentPage = () => {
  const [name, setName] = useState("");
  const [place, setPlace] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const navigate = useNavigate();
  const token = Cookies.get("token");
  const currentUser = Cookies.get("currentUser");
  const userId = currentUser ? JSON.parse(currentUser).id : null;
  const { getCartItems, setCartItems, clearCart } = useContext(ShopContext);

  const handlePlaceOrder = async () => {
    try {
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
        description: "Thank you for your purchase",
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

            setCartItems([]);

            navigate("/orderDetails");
          } catch (error) {
            console.error("Error verifying payment:", error);

            setCartItems([]);
          }
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Error during checkout:", error);
      // Clear cart items from context on error
      await clearCart(userId);
    }
  };

  const handleBackClick = () => {
    navigate("/cartitems");
  };

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1">
          <h1 className="text-2xl p-10 font-bold mb-4 text-center bg-gray-200">
            Checkout
          </h1>
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
              <input
                type="text"
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <button
              onClick={handlePlaceOrder}
              className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Place Order
            </button>
          </div>
        </div>
        <div className="flex-none">
          <button
            onClick={handleBackClick}
            className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-700"
          >
            Back to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
