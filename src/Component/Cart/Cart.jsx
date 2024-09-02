import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ShopContext } from "../../Context/CartItem/ShopContext";
import Spinner from "../Spinner/Spinner";
import { BsFillArrowLeftSquareFill } from "react-icons/bs";
import { FaShoppingCart } from "react-icons/fa";

const Cart = () => {
  const { id } = useParams();
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [product, setProduct] = useState(null);
  const [relatedLoading, setRelatedLoading] = useState(true);
  const navigate = useNavigate();
  const { addToCart, currentUser } = useContext(ShopContext);

  // Fetch the product by ID from the backend
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `https://babyshop-backend.onrender.com/users/product/${id}`
        );
        const data = await response.json();
        setProduct(data);

        // Fetch related products based on category
        if (data.category) {
          const response = await fetch(
            `https://babyshop-backend.onrender.com/users/products/${data.category}`
          );
          const relatedData = await response.json();

          const filteredRelatedProducts = relatedData.filter(
            (item) => item._id !== id
          );

          setRelatedProducts(filteredRelatedProducts);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setRelatedLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // Handle Add to Cart Click
  const handleAddToCartClick = async () => {
    if (currentUser) {
      try {
        await addToCart(currentUser.id, id);
      } catch (error) {
        console.error("Error adding item to cart:", error);
      }
    } else {
      alert("Please login to add items to your cart.");
      navigate("/login");
    }
  };

  if (!product) return <Spinner />;

  return (
    <div className="container mx-auto p-6">
      <Link to="/shop">
        <BsFillArrowLeftSquareFill size={32} />
      </Link>
      <div className="flex flex-col md:flex-row items-start md:items-center">
        <div className="w-full md:w-1/2 p-4">
          <img
            className="w-full h-96 object-cover rounded-lg"
            src={product.image}
            alt={product.name}
          />
        </div>
        <div className="w-full md:w-1/2 p-4 flex flex-col justify-between">
          <div className="mb-6">
            <p className="text-gray-500 text-center font-serif">
              {product.category}
            </p>
            <h1 className="text-2xl font-bold text-gray-800 text-center font-serif">
              {product.name}
            </h1>
            <p className="text-2xl font-semibold text-gray-600 mt-2 text-center font-serif">
              ${product.price}
            </p>
            <p className="text-gray-600 mt-4 text-center font-serif">
              {product.description}
            </p>
            <p className="text-yellow-500 text-center">
              {"★".repeat(product.stars)}
              {"☆".repeat(5 - product.stars)}
            </p>
          </div>
          <div className="flex justify-center">
            {" "}
            <button
              onClick={handleAddToCartClick}
              className="w-20 p-2 bg-green-500 text-white rounded-full hover:bg-green-700 flex items-center justify-center"
            >
              <FaShoppingCart className="text-xl" />
            </button>
          </div>
        </div>
      </div>
      <div className="mt-12">
        <h2 className="text-xl font-bold text-gray-800 mb-6">
          Related Products
        </h2>
        {relatedLoading ? (
          <Spinner />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {relatedProducts.map((item) => (
              <div
                key={item._id}
                onClick={() => navigate(`/shop/${item._id}`)}
                className="bg-white shadow-md rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transform hover:scale-105 transition-transform duration-300"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-52 object-cover"
                />
                <div className="p-4">
                  <h4 className="text-lg font-semibold font-serif text-center text-gray-900">
                    {item.name}
                  </h4>
                  <p className="text-gray-700 font-serif text-center ">
                    ${item.price}
                  </p>
                  <p className="text-yellow-500 text-center">
                    {"★".repeat(item.stars)}
                    {"☆".repeat(5 - item.stars)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
