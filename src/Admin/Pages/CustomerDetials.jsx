import { Link, useParams } from "react-router-dom";
import useFetch from "../../utils/Api";
import { useState } from "react";
import Spinner from "../../Component/Spinner/Spinner";
import { BsFillArrowLeftSquareFill } from "react-icons/bs";


const CustomerDetail = () => {
  const { userId } = useParams();
  console.log("userId from customer details: ", userId);

  // Fetching user details
  const {
    data: user,
    isPending: userIsPending,
    error: userError,
  } = useFetch(`https://babyshop-backend.onrender.com/admin/user/${userId}`);

  // Fetching user's orders
  const {
    data: orders,
    isPending: ordersIsPending,
    error: ordersError,
  } = useFetch(`https://babyshop-backend.onrender.com/admin/order/${userId}`);

  // State for accordion
  const [expandedOrder, setExpandedOrder] = useState(null);

  // Function to toggle accordion
  const toggleAccordion = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  return (
    <div className="container p-4 overflow-auto w-full text-white">
      {userIsPending && <Spinner />}
      {userError && <div className="text-center text-red-500">Error: {userError}</div>}
      {user && (
        <div className="border p-4 rounded mb-6 w-full text-center bg-[#172F4A] shadow-md">
          <h1 className="text-3xl font-bold text-center mb-4 bg-[#193351] p-4 rounded-md shadow-lg">
            User Details
          </h1>
          <Link to={'/customers'}><BsFillArrowLeftSquareFill size={32} /></Link>
          <h2 className="text-xl font-bold">User: {user.username}</h2>
          <p className="text-gray-600 text-white">Email: {user.email}</p>
        </div>
      )}

      <h2 className="text-2xl rounded-md font-semibold mt-8 mb-4 w-full">Orders</h2>
      {ordersIsPending && <Spinner />}
      {ordersError && <div className="text-center text-red-500">Error: {ordersError}</div>}
      {orders && orders.length > 0 ? (
        <div className="grid grid-cols-1 gap-4">
          {orders.map((order) => (
            <div
              key={order._id}
              className="border p-4 rounded-lg bg-[#193351] shadow-md"
            >
              <div
                onClick={() => toggleAccordion(order._id)}
                className="cursor-pointer flex justify-between items-center mb-4 border-b pb-2"
              >
                <h3 className="text-lg font-bold">Order ID: {order.orderId}</h3>
                <button className="text-blue-500 focus:outline-none">
                  {expandedOrder === order._id ? "-" : "+"}
                </button>
              </div>
              {expandedOrder === order._id && (
                <div className="mt-4">
                  <div className="mb-4">
                    <p>
                      <strong>Name:</strong> {order.userDetails?.name || "N/A"}
                    </p>
                    <p>
                      <strong>Place:</strong> {order.userDetails?.place || "N/A"}
                    </p>
                    <p>
                      <strong>Phone:</strong> {order.userDetails?.phone || "N/A"}
                    </p>
                    <p>
                      <strong>Address:</strong> {order.userDetails?.address || "N/A"}
                    </p>
                  </div>
                  <hr className="my-2" />
                  <div className="mb-4">
                    <p>
                      <strong>Total Price:</strong> ${order.totalPrice || "0.00"}
                    </p>
                    <p>
                      <strong>Total Items:</strong> {order.totalItems || 0}
                    </p>
                    <p>
                      <strong>Total Quantity:</strong> {order.totalQuantity || 0}
                    </p>
                    <p>
                      <strong>Purchase Date:</strong> {order.purchaseDate ? new Date(order.purchaseDate).toLocaleString() : "N/A"}
                    </p>
                    <p>
                      <strong>Payment Status:</strong> {order.paymentStatus || "N/A"}
                    </p>
                  </div>
                  <h4 className="text-lg font-semibold mt-2 mb-2">Products</h4>
                  <ul className="list-disc ml-5">
                    {order.products && order.products.length > 0 ? (
                      order.products.map((product, index) => (
                        <li key={index} className="mb-4 flex items-center bg-[#172F4A] p-4 rounded-lg shadow-sm">
                          <img
                            src={
                              product.productId?.image ||
                              "http://example.com/default.jpg"
                            }
                            alt={`Product ${product.productId?.name}`}
                            className="w-16 h-16 object-cover mr-4"
                          />
                          <div>
                            <p>
                              <strong>Product Name:</strong>{" "}
                              {product.productId?.name || "N/A"}
                            </p>
                            <p>
                              <strong>Description:</strong>{" "}
                              {product.productId?.description || "N/A"}
                            </p>
                            <p>
                              <strong>Price:</strong> $
                              {product.productId?.price || "0.00"}
                            </p>
                            <p>
                              <strong>Quantity:</strong> {product.quantity || 0}
                            </p>
                          </div>
                        </li>
                      ))
                    ) : (
                      <li>No products found.</li>
                    )}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center">No orders found.</p>
      )}
    </div>
  );
};

export default CustomerDetail;
