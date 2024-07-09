// import React, { useContext, useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { ShopContext } from "../../Context/CartItem/ShopContext";
// import useFetch from "../../utils/Api";

// const Cart = () => {
//   const { id } = useParams();
//   const { data, isPending, error } = useFetch("http://localhost:8000/db");
//   const [product, setProduct] = useState(null);
//   const [relatedProducts, setRelatedProducts] = useState([]);
//   const navigate = useNavigate();
//   const { addToCart } = useContext(ShopContext);

//   useEffect(() => {
//     if (data) {
//       const selectedProduct = data.find((item) => item.id == parseInt(id));
//       setProduct(selectedProduct);

//       if (selectedProduct) {
//         const filteredProducts = data.filter(
//           (prod) =>
//             prod.category == selectedProduct.category &&
//             prod.id !== selectedProduct.id
//         );
//         setRelatedProducts(filteredProducts);
//       } else {
//         setRelatedProducts([]);
//       }
//     }
//   }, [data, id]);

//   const handleAddToCartClick = () => {
//     const login = localStorage.getItem("isLogged");
//     if (login) {
//       addToCart(id);
//     } else {
//       alert("Please Login");
//       navigate("/login");
//     }
//   };

//   if (isPending) return <div>Loading...</div>;
//   if (error) return <div>Error: {error}</div>;
//   if (!product) return <div>Product not found</div>;

//   return (
//     <div className="container mx-auto p-6">
//       <div className="flex flex-col md:flex-row items-start md:items-center">
//         <div className="w-full md:w-1/2 p-4">
//           <img
//             className="w-full h-96 object-cover rounded-lg"
//             src={product.image}
//             alt={product.name}
//           />
//         </div>
//         <div className="w-full md:w-1/2 p-4 flex flex-col justify-between">
//           <div className="mb-6">
//             <p className="text-gray-500">{product.category}</p>
//             <h1 className="text-2xl font-bold text-gray-800">{product.name}</h1>
//             <p className="text-lg font-semibold text-gray-600 mt-2">
//               ${product.price}
//             </p>
//             <p className="text-gray-600 mt-4">{product.description}</p>
//           </div>
//           <button
//             onClick={handleAddToCartClick}
//             className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
//           >
//             Add to cart
//           </button>
//         </div>
//       </div>
//       <div className="mt-12">
//         <h2 className="text-xl font-bold text-gray-800 mb-6">
//           Related Products
//         </h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//           {relatedProducts.map((item) => (
//             <div
//               key={item.id}
//               onClick={() => navigate(`/shop/${item.id}`)}
//               className="bg-white shadow-md rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transform hover:scale-105 transition-transform duration-300"
//             >
//               <img
//                 src={item.image}
//                 alt={item.name}
//                 className="w-full h-52 object-cover"
//               />
//               <div className="p-4">
//                 <h4 className="text-lg font-semibold text-gray-900">
//                   {item.name}
//                 </h4>
//                 <p className="text-gray-700">${item.price}</p>
//                 <p className="text-yellow-500">
//                   {"★".repeat(item.stars)}
//                   {"☆".repeat(5 - item.stars)}
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Cart;

import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ShopContext } from "../../Context/CartItem/ShopContext";
import useFetch from "../../utils/Api";

const Cart = () => {
  const { id } = useParams();
  const { data, isPending, error } = useFetch("http://localhost:8000/db");
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const navigate = useNavigate();
  const { addToCart } = useContext(ShopContext);

  useEffect(() => {
    if (data) {
      const selectedProduct = data.find((item) => item.id == parseInt(id));
      setProduct(selectedProduct);

      if (selectedProduct) {
        const filteredProducts = data.filter(
          (prod) =>
            prod.category == selectedProduct.category &&
            prod.id !== selectedProduct.id
        );
        setRelatedProducts(filteredProducts);
      } else {
        setRelatedProducts([]);
      }
    }
  }, [data, id]);

  const fetchUserData = async () => {
    const response = await fetch("http://localhost:8000/user");
    const userData = await response.json();
    return userData[0]; 
  };

  const updateUserCart = async (user) => {
    const response = await fetch(`http://localhost:8000/user/${user.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    return response.json();
  };

  const handleAddToCartClick = async () => {
    const login = localStorage.getItem("isLogged");
    if (login) {
      const user = await fetchUserData();
      if (!user.cart[id]) {
        user.cart[id] = 1;
      } else {
        user.cart[id]++;
      }
      await updateUserCart(user);
      addToCart(id); 
    } else {
      alert("Please Login");
      navigate("/login");
    }
  };

  if (isPending) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!product) return <div>Product not found</div>;

  return (
    <div className="container mx-auto p-6">
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
            <p className="text-gray-500">{product.category}</p>
            <h1 className="text-2xl font-bold text-gray-800">{product.name}</h1>
            <p className="text-lg font-semibold text-gray-600 mt-2">
              ${product.price}
            </p>
            <p className="text-gray-600 mt-4">{product.description}</p>
          </div>
          <button
            onClick={handleAddToCartClick}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
          >
            Add to cart
          </button>
        </div>
      </div>
      <div className="mt-12">
        <h2 className="text-xl font-bold text-gray-800 mb-6">
          Related Products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {relatedProducts.map((item) => (
            <div
              key={item.id}
              onClick={() => navigate(`/shop/${item.id}`)}
              className="bg-white shadow-md rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transform hover:scale-105 transition-transform duration-300"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-52 object-cover"
              />
              <div className="p-4">
                <h4 className="text-lg font-semibold text-gray-900">
                  {item.name}
                </h4>
                <p className="text-gray-700">${item.price}</p>
                <p className="text-yellow-500">
                  {"★".repeat(item.stars)}
                  {"☆".repeat(5 - item.stars)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Cart;
