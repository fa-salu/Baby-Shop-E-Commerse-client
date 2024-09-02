import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { ShopContext } from "../../Context/CartItem/ShopContext";
import { BsCheckCircleFill, BsFillArrowLeftSquareFill } from "react-icons/bs";

const PaymentPage = () => {
  const [name, setName] = useState("");
  const [place, setPlace] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [errorMessage, setErrorMessage] = useState(""); 
  const navigate = useNavigate();
  const token = Cookies.get("token");
  const currentUser = Cookies.get("currentUser");
  const userId = currentUser ? JSON.parse(currentUser).id : null;
  const { setCartItems, clearCart, getCartItems } = useContext(ShopContext);

  const fetchCartItems = async () => {
    if (!userId) return;
    try {
      const items = await getCartItems(userId);

      const total = items.reduce(
        (sum, item) => sum + item.productId.price * item.quantity,
        0
      );
      setTotalPrice(total);
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  const handlePlaceOrder = async () => {
    // Validation check
    if (!name || !place || !phone || !address) {
      setErrorMessage("All fields are required.");
      return;
    }

    try {
      const response = await fetch("https://babyshop-backend.onrender.com/users/order", {
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
              "https://babyshop-backend.onrender.com/users/order/verify",
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
      await clearCart(userId);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto font-serif">
      <Link to={"/cartitems"} className="flex items-center ml-4 mt-4">
        <BsFillArrowLeftSquareFill size={32} />
        <span className="ml-2 text-black text-lg">Back to Cart</span>
      </Link>

      <div className="flex flex-col md:flex-row gap-6 mt-8">
        <div className="w-full md:w-1/3 bg-gray-50 p-6 h-32 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-center">
            Total Price
          </h2>
          <div className="text-lg">
            <p className="mb-2 text-center">
              <span className="text-blue-600">₹{totalPrice.toFixed(2)}</span>
            </p>
          </div>
        </div>
        <div className="flex-1 bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-3xl font-bold mb-6 text-center">Checkout</h1>
          {errorMessage && (
            <p className="text-red-500 mb-4 text-center">{errorMessage}</p>
          )}
          <div className="mb-6">
            <label htmlFor="name" className="block text-gray-700 mb-2">
              Name:
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="place" className="block text-gray-700 mb-2">
              Place:
            </label>
            <input
              type="text"
              id="place"
              value={place}
              onChange={(e) => setPlace(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="phone" className="block text-gray-700 mb-2">
              Phone:
            </label>
            <input
              type="text"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="address" className="block text-gray-700 mb-2">
              Address:
            </label>
            <input
              type="text"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <button
            onClick={handlePlaceOrder}
            className="w-full bg-green-600 text-white font-semibold px-4 py-3 rounded-md hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
          >
            <BsCheckCircleFill size={20} />
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
