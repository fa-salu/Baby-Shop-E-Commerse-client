// import React, { createContext, useState, useEffect } from "react";
// import Cookies from "js-cookie"; // Import js-cookie for managing cookies
// import useFetch from "../../utils/Api";
// // import { AdminData } from "../../Admin/AdminData/AdminData";

// export const ShopContext = createContext();

// export const ShopContextProvider = (props) => {
//   const {
//     data: products,
//     isPending,
//     error,
//   } = useFetch("http://localhost:5000/users/products");
//   // console.log(products);

//   const [search, setSearch] = useState("");
//   const [currentUser, setCurrentUser] = useState(null);
//   const [productId, setProductId] = useState(null);
//   // console.log("con: currentUser:", currentUser);

//   // Load currentUser from cookies on initial load
//   useEffect(() => {
//     const storedUser = Cookies.get("currentUser");
//     // console.log("con: storedUser:" , storedUser);

//     if (storedUser) {
//       setCurrentUser(JSON.parse(storedUser));
//     }
//   }, []);

//   const getCartItems = async (userId) => {
//     console.log("userid from getcart item: ", userId);

//     try {
//       const token = Cookies.get("token");
//       const response = await fetch(
//         `http://localhost:5000/users/cart/${userId}`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       if (!response.ok) {
//         throw new Error("Failed to fetch cart items");
//       }

//       const data = await response.json();
//       console.log("data from get cart item :", data);
//       return data;
//     } catch (error) {
//       console.error("Error fetching cart items:", error);
//     }
//   };

//   // add to cart
//   const addToCart = async (userId, productId) => {
//     console.log("addtocart context: ", userId, productId);
//     setProductId(productId);

//     try {
//       const token = Cookies.get("token"); // Assuming you store your JWT token in localStorage
//       const response = await fetch("http://localhost:5000/users/cart", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`, // Add the JWT token here
//         },
//         body: JSON.stringify({ userId, productId }),
//       });
//       if (!response.ok) throw new Error("Failed to add item to cart");
//       // alert('Product added to cart');
//     } catch (error) {
//       console.error("Error adding item to cart:", error);
//     }
//   };

//   // delete cart item
//   const removeCartItem = async (userId, productId) => {
//     try {
//       const token = Cookies.get("token"); // Get the JWT token
//       const response = await fetch(
//         `http://localhost:5000/users/cart/remove/${userId}/${productId}`,
//         {
//           method: "DELETE",
//           headers: {
//             Authorization: `Bearer ${token}`, // Include the JWT token
//           },
//         }
//       );
//       if (!response.ok) throw new Error("Failed to delete cart item");
//       await getCartItems(userId); // Re-fetch cart items after deletion
//     } catch (error) {
//       console.error("Error deleting cart item:", error);
//     }
//   };

//   // delete cart item
//   const deleteCartItem = async (userId, productId) => {
//     try {
//       const token = Cookies.get("token"); // Get the JWT token
//       const response = await fetch(
//         `http://localhost:5000/users/cart/delete/${userId}/${productId}`,
//         {
//           method: "DELETE",
//           headers: {
//             Authorization: `Bearer ${token}`, // Include the JWT token
//           },
//         }
//       );
//       if (!response.ok) throw new Error("Failed to delete cart item");
//       await getCartItems(userId); // Re-fetch cart items after deletion
//     } catch (error) {
//       console.error("Error deleting cart item:", error);
//     }
//   };

//   // clear cart item
//   const clearCart = async (userId) => {
//     try {
//       const token = Cookies.get("token"); // Get the JWT token
//       const response = await fetch(
//         `http://localhost:5000/users/cart/${userId}`,
//         {
//           method: "DELETE",
//           headers: {
//             Authorization: `Bearer ${token}`, // Include the JWT token
//           },
//         }
//       );
//       if (!response.ok) throw new Error("Failed to clear cart");
//       // setCartItems([]); // Clear cart in frontend
//     } catch (error) {
//       console.error("Error clearing cart:", error);
//     }
//   };

//   const filteredProducts = Array.isArray(products)
//     ? products.filter(
//         (product) =>
//           product.name &&
//           search &&
//           product.name.toLowerCase().includes(search.toLowerCase())
//       )
//     : [];

//   const logout = () => {
//     setCurrentUser(null);
//     // setCart({});
//     Cookies.remove("currentUser");
//     Cookies.remove("token");
//   };

//   return (
//     <ShopContext.Provider
//       value={{
//         productId,
//         // cart,
//         filteredProducts,
//         search,
//         setSearch,
//         addToCart,
//         removeCartItem,
//         deleteCartItem,
//         setCurrentUser,
//         currentUser,
//         getCartItems,
//         logout,
//         clearCart,
//         isPending,
//         error,
//       }}
//     >
//       {props.children}
//     </ShopContext.Provider>
//   );
// };



import React, { createContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import useFetch from "../../utils/Api";

export const ShopContext = createContext();

export const ShopContextProvider = (props) => {
  const {
    data: products,
    isPending,
    error,
  } = useFetch("http://localhost:5000/users/products");

  const [search, setSearch] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [productId, setProductId] = useState(null);

  useEffect(() => {
    const storedUser = Cookies.get("currentUser");

    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
  }, []);

  const getCartItems = async (userId) => {
    try {
      const token = Cookies.get("token");
      const response = await fetch(
        `http://localhost:5000/users/cart/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch cart items");
      }

      const data = await response.json();
      setCartItems(data);
      return data;
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };

  const addToCart = async (userId, productId) => {
    setProductId(productId);
    try {
      const token = Cookies.get("token");
      const response = await fetch("http://localhost:5000/users/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userId, productId }),
      });
      if (!response.ok) throw new Error("Failed to add item to cart");
      await getCartItems(userId);
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };

  const removeCartItem = async (userId, productId) => {
    try {
      const token = Cookies.get("token");
      const response = await fetch(
        `http://localhost:5000/users/cart/remove/${userId}/${productId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) throw new Error("Failed to delete cart item");
      await getCartItems(userId);
    } catch (error) {
      console.error("Error deleting cart item:", error);
    }
  };

  const deleteCartItem = async (userId, productId) => {
    try {
      const token = Cookies.get("token");
      const response = await fetch(
        `http://localhost:5000/users/cart/delete/${userId}/${productId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) throw new Error("Failed to delete cart item");
      await getCartItems(userId);
    } catch (error) {
      console.error("Error deleting cart item:", error);
    }
  };

  const clearCart = async (userId) => {
    try {
      const token = Cookies.get("token");
      const response = await fetch(
        `http://localhost:5000/users/cart/${userId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) throw new Error("Failed to clear cart");
      setCartItems([]); // Clear cart in frontend
    } catch (error) {
      console.error("Error clearing cart:", error);
    }
  };

  const filteredProducts = Array.isArray(products)
    ? products.filter(
        (product) =>
          product.name &&
          search &&
          product.name.toLowerCase().includes(search.toLowerCase())
      )
    : [];

  const logout = () => {
    setCurrentUser(null);
    setCartItems([]);
    Cookies.remove("currentUser");
    Cookies.remove("token");
  };

  return (
    <ShopContext.Provider
      value={{
        productId,
        filteredProducts,
        search,
        setSearch,
        addToCart,
        removeCartItem,
        deleteCartItem,
        setCurrentUser,
        currentUser,
        getCartItems,
        logout,
        clearCart,
        cartItems, 
        isPending,
        error,
      }}
    >
      {props.children}
    </ShopContext.Provider>
  );
};

