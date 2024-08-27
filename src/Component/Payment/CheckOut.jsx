import React, { useContext } from "react";
import { ShopContext } from "../../Context/CartItem/ShopContext";
import { useNavigate } from "react-router-dom";

const CheckOut = () => {
  const { cartItems, clearCart } = useContext(ShopContext);
  const navigate = useNavigate()

  const handleOrder = () => {
    clearCart();
    alert('You Ordered');
    navigate('/');
  };

  return (
    <div className="p-4 lg:p-6">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>
      <div className="flex flex-col lg:flex-row justify-between space-y-4 lg:space-y-0">
        <div className="w-full lg:w-8/12">
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>
          <div className="bg-white p-4 rounded-md shadow-md mb-6">
            <table className="min-w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="py-2 text-center">Product</th>
                  <th className="py-2 text-center">Price</th>
                  <th className="py-2 text-center">Quantity</th>
                  <th className="py-2 text-center">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.id} className="border-b border-gray-200">
                    <td className="py-2 text-center">{item.name}</td>
                    <td className="py-2 text-center">
                      ${item.price.toFixed(2)}
                    </td>
                    <td className="py-2 text-center">{item.quantity}</td>
                    <td className="py-2 text-center">
                      ${(item.price * item.quantity).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="w-full lg:w-4/12">
          <div className="bg-white p-4 rounded-md shadow-md">
            <h2 className="text-xl font-bold mb-4">Payment Information</h2>
            <div className="mb-4">
              <label htmlFor="paymentMethod" className="block font-medium text-gray-700">
                Payment Method:
              </label>
              <select
                id="paymentMethod"
                name="paymentMethod"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="select">Select Payment Method</option>
                <option value="gpay">Gpay</option>
                <option value="paytm">Paytm</option>
                <option value="phonepay">Phone Pay</option>
              </select>
            </div>
            <div className="grid grid-cols-1 gap-y-4">
              <div>
                <label htmlFor="cardNumber" className="block font-medium text-gray-700">
                  Card Number:
                </label>
                <input
                  type="text"
                  id="cardNumber"
                  name="cardNumber"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor="expDate" className="block font-medium text-gray-700">
                  Expiration Date:
                </label>
                <input
                  type="text"
                  id="expDate"
                  name="expDate"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor="cvv" className="block font-medium text-gray-700">
                  CVV:
                </label>
                <input
                  type="text"
                  id="cvv"
                  name="cvv"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>
          </div>
          <div className="mt-6">
            <button onClick={handleOrder}
              type="button"
              className="w-full py-3 bg-gray-800 text-white rounded-md shadow-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
