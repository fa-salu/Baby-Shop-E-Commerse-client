import { useParams } from "react-router-dom";
import useFetch from "../../utils/Api";
import { useState } from "react";

const CustomerDetail = () => {
  const { userId } = useParams();
  console.log("userId from customer details: ", userId);

  // Fetching user details
  const {
    data: user,
    isPending,
    error,
  } = useFetch(`http://localhost:5000/admin/user/${userId}`);

  // Fetching user's orders
  const { data: orders } = useFetch(`http://localhost:5000/admin/order`);

  // State for accordion
  const [expandedOrder, setExpandedOrder] = useState(null);

  // Function to toggle accordion
  const toggleAccordion = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  return (
    <div className="container p-4 overflow-auto w-full">
      <h1 className="text-3xl font-bold text-center mt-20 mb-8 w-full">
        User Details
      </h1>
      {isPending && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      {user && (
        <div className="border p-4 rounded shadow-lg mb-6 w-full">
          <h2 className="text-xl font-bold">User: {user.username}</h2>
          <p className="text-gray-600">Email: {user.email}</p>
        </div>
      )}

      <h2 className="text-2xl font-semibold mt-8 mb-4 w-full">Orders</h2>
      {orders && orders.length > 0 ? (
        <div className="space-y-4 w-full">
          {orders.map((order) => (
            <div key={order._id} className="border p-4 rounded shadow-lg w-full">
              <div
                onClick={() => toggleAccordion(order._id)}
                className="cursor-pointer flex justify-between items-center"
              >
                <h3 className="text-lg font-bold">Order ID: {order.orderId}</h3>
                <button className="text-blue-500 focus:outline-none">
                  {expandedOrder === order._id ? "-" : "+"}
                </button>
              </div>
              {expandedOrder === order._id && (
                <div className="mt-4">
                   <p >
                <strong>Name:</strong> {order.userDetails.name}
              </p>
              <p>
                <strong>Place:</strong> {order.userDetails.place}
              </p>
              <p >
                <strong>Phone:</strong> {order.userDetails.phone}
              </p>
              <p >
                <strong>Address:</strong> {order.userDetails.address}
              </p>
              <hr className="p-2"/>
                  <p>
                    <strong>Total Price:</strong> ${order.totalPrice}
                  </p>
                  <p>
                    <strong>Total Items:</strong> {order.totalItems}
                  </p>
                  <p>
                    <strong>Total Quantity:</strong> {order.totalQuantity}
                  </p>
                  <p>
                    <strong>Purchase Date:</strong>{" "}
                    {new Date(order.purchaseDate).toLocaleString()}
                  </p>
                  <p>
                    <strong>Payment Status:</strong> {order.paymentStatus}
                  </p>
                  <h4 className="text-lg font-semibold mt-2">Products</h4>
                  <ul className="list-disc ml-5">
                    {order.products.map((product, idx) => (
                      <li key={product.productId} className="mb-2">
                        <p>
                          <strong>Product ID:</strong> {product.productId}
                        </p>
                        <p>
                          <strong>Quantity:</strong> {product.quantity}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p>No orders found.</p>
      )}
    </div>
  );
};

export default CustomerDetail;
