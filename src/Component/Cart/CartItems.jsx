import React, { useContext } from "react";
import { ShopContext } from "../../Context/CartItem/ShopContext";
import { useNavigate } from "react-router-dom";

const CartItems = () => {
  const { cartItems } = useContext(ShopContext);
  const navigate = useNavigate();
  console.log(cartItems);

 

  const calculateSubtotal = () => {
    return cartItems
      .reduce((acc, item) => acc + item.price * item.quantity, 0)
      .toFixed(2);
  };

  const total = calculateSubtotal();

  return (
    <div className="flex flex-col lg:flex-row justify-between p-6">
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
                  Subtotal
                </th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.id}>
                  <td className="py-2 border-b border-gray-300 text-center">
                    {item.name}
                  </td>
                  <td className="py-2 border-b border-gray-300 text-center">
                    ${item.price.toFixed(2)}
                  </td>
                  <td className="py-2 border-b border-gray-300 text-center">
                    {item.quantity}
                  </td>
                  <td className="py-2 border-b border-gray-300 text-center">
                    ${(item.price * item.quantity).toFixed(2)}
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
          <div className="flex justify-between mb-4">
            <span className="text-gray-900">Total:</span>
            <span className="text-gray-900">${total}</span>
          </div>
          <input
            type="text"
            placeholder="Coupon code"
            className="w-full p-2 mb-4 border border-gray-300 rounded-md"
          />
          <button className="w-full py-2 mb-4 bg-blue-600 text-white rounded-md">
            Apply
          </button>
          <button
             onClick={() => {
              if (cartItems.length > 0) {
                navigate('/checkout');
              } else {
                alert('Your cart is empty.');
              }
            }}
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
