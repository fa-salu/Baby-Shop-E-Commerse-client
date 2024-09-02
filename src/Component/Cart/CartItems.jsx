import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../../Context/CartItem/ShopContext";
import { Link, useNavigate } from "react-router-dom";
import { FaPlus, FaMinus, FaTrash } from "react-icons/fa";
import Cookies from "js-cookie";
import { BsFillArrowLeftSquareFill, BsFillCartCheckFill } from "react-icons/bs";

const CartItems = () => {
  const { addToCart, deleteCartItem, removeCartItem, getCartItems } =
    useContext(ShopContext);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();
  const currentUser = Cookies.get("currentUser");
  const userId = currentUser ? JSON.parse(currentUser).id : null;

  const fetchCartItems = async () => {
    if (!userId) return;
    try {
      const items = await getCartItems(userId);
      setCartItems(items);

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

  const handleAddToCart = async (productId) => {
    try {
      await addToCart(userId, productId);
      fetchCartItems();
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };

  const handleRemoveFromCart = async (productId) => {
    try {
      await removeCartItem(userId, productId);
      fetchCartItems();
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  const handleDeleteCart = async (productId) => {
    try {
      await deleteCartItem(userId, productId);
      fetchCartItems();
    } catch (error) {
      console.error("Error deleting item from cart:", error);
    }
  };

  const handleCheckout = () => {
    navigate("/payment");
  };

  return (
    <>
      <Link to={"/shop"} className="flex items-center ml-28 mt-8">
        <BsFillArrowLeftSquareFill size={32} />
        <span className="ml-2 text-black text-lg">Add More</span>
      </Link>
      <div className="flex flex-col lg:flex-row font-serif text-center items-center justify-center p-6">
        {/* Cart Details */}
        <div className="w-full lg:w-7/12 mb-8 lg:mb-0">
          <h1 className="text-2xl font-bold mb-4">Cart</h1>
          <hr className="mb-5" />
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
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item._id}>
                    <td className="py-2 border-b border-gray-300 text-center">
                      {item.productId ? (
                        <div>
                          <img
                            src={item.productId.image}
                            alt={item.productId.name}
                            className="w-16 h-16 object-cover mb-2"
                          />
                          <p className="text-center">{item.productId.name}</p>
                        </div>
                      ) : (
                        "Product not found"
                      )}
                    </td>
                    <td className="py-2 border-b border-gray-300 text-center">
                      ₹{item.productId ? item.productId.price : "N/A"}
                    </td>
                    <td className="py-2 border-b border-gray-300 text-center flex flex-col items-center space-y-2">
                      <button
                        onClick={() => handleRemoveFromCart(item.productId._id)}
                        className="text-red-500"
                      >
                        <FaMinus />
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() => handleAddToCart(item.productId._id)}
                        className="text-green-500"
                      >
                        <FaPlus />
                      </button>
                      <button
                        onClick={() => handleDeleteCart(item.productId._id)}
                        className="text-red-500"
                      >
                        <FaTrash />
                      </button>
                    </td>
                    <td className="py-2 border-b border-gray-300 text-center">
                      ₹
                      {item.productId
                        ? item.productId.price * item.quantity
                        : "N/A"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-4 text-right">
              <h2 className="text-xl font-bold">Total: ₹{totalPrice}</h2>
            </div>
          </div>
          {/* <button
            onClick={handleCheckout}
            className="w-1/2 px-4 py-2 bg-blue-500 text-white rounded-md mt-4"
          >
            Proceed to Checkout
          </button> */}
          <button
            onClick={handleCheckout}
            className="w-1/2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-700 mt-4 flex items-center justify-center gap-2" 
          >
            <BsFillCartCheckFill size={20} /> 
            Proceed to Checkout
          </button>
        </div>
      </div>
    </>
  );
};

export default CartItems;
