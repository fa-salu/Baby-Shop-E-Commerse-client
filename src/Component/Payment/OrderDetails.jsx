import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";

const OrderDetails = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = Cookies.get("token");
  const currentUser = Cookies.get("currentUser");

  const userId = currentUser ? JSON.parse(currentUser).id : null;

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/users/order/${userId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();

        // Assuming data contains the product details in each order
        setOrders(data.orders);
      } catch (error) {
        setError(error.message || "Error fetching order details");
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [userId, token]);

  if (loading) return <div className="text-center mt-5">Loading...</div>;
  // if (error) return <div className="text-center mt-5 text-red-500">Error: {error}</div>;

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Order Details</h1>
      {orders.length === 0 ? (
        <p className="text-center">No orders found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white shadow-md rounded-lg p-6 border border-gray-200"
            >
              <p className="mb-2">
                <strong>Order ID:</strong> {order.orderId}
              </p>
              <p className="mb-2">
                <strong>Total Price:</strong> ${order.totalPrice}
              </p>
              <p className="mb-2">
                <strong>Total Items:</strong> {order.totalItems}
              </p>
              <p className="mb-2">
                <strong>Total Quantity:</strong> {order.totalQuantity}
              </p>
              <p className="mb-2">
                <strong>Purchase Date:</strong>{" "}
                {new Date(order.purchaseDate).toLocaleString()}
              </p>
              <p className="mb-2">
                <strong>Payment Status:</strong> {order.paymentStatus}
              </p>
              <h2 className="text-xl font-semibold mt-4">User Details</h2>
              <p className="mb-2">
                <strong>Name:</strong> {order.userDetails.name}
              </p>
              <p className="mb-2">
                <strong>Place:</strong> {order.userDetails.place}
              </p>
              <p className="mb-2">
                <strong>Phone:</strong> {order.userDetails.phone}
              </p>
              <p className="mb-2">
                <strong>Address:</strong> {order.userDetails.address}
              </p>
              <h2 className="text-xl font-semibold mt-4">Products</h2>
              <ul className="list-disc ml-5">
                {order.products.map((product) => (
                  <li
                    key={product.productId._id}
                    className="mb-2 flex items-center"
                  >
                    <img
                      src={product.productId.image}
                      alt={product.productId.name}
                      className="w-16 h-16 rounded-md object-cover mr-4"
                    />
                    <div>
                      <p>
                        <strong>Product Name:</strong> {product.name}
                      </p>
                      <p>
                        <strong>Quantity:</strong> {product.quantity}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderDetails;
