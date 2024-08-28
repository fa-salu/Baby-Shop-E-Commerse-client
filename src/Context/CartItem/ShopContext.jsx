import React, { createContext, useState, useEffect } from "react";
import Cookies from "js-cookie"; // Import js-cookie for managing cookies
import useFetch from "../../utils/Api";
// import { AdminData } from "../../Admin/AdminData/AdminData";

export const ShopContext = createContext();

export const ShopContextProvider = (props) => {
  const { data: products, isPending, error } = useFetch("http://localhost:5000/users/products");
  // console.log(products);
  
  // const [cart, setCart] = useState({});
  // console.log('data from get cart item : ', cart);
  
  const [search, setSearch] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [productId, setProductId] = useState(null)
  // console.log("con: currentUser:", currentUser);
  
  

  // Load currentUser from cookies on initial load
  useEffect(() => {
    const storedUser = Cookies.get("currentUser");
    // console.log("con: storedUser:" , storedUser);
    
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
  }, []);

  // Fetch cart items
  // ShopContext.jsx
const getCartItems = async (userId) => {
  console.log('userid from getcart item: ', userId);
  
  try {
    const token = Cookies.get("token");
    const response = await fetch(`http://localhost:5000/users/cart/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch cart items");
    }

    const data = await response.json();
    console.log("data from get cart item :", data);
    return data; 
  } catch (error) {
    console.error("Error fetching cart items:", error);
  }
};



  // add to cart
  const addToCart = async (userId, productId) => {
    console.log('addtocart context: ', userId, productId);
    setProductId(productId)
    
    try {
      const token = Cookies.get('token'); // Assuming you store your JWT token in localStorage
      const response = await fetch('http://localhost:5000/users/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Add the JWT token here
        },
        body: JSON.stringify({ userId, productId }),
      });
      if (!response.ok) throw new Error('Failed to add item to cart');
      // alert('Product added to cart');
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  };
  

  // delete cart item
  const removeCartItem = async (userId, productId) => {
    try {
      const token = Cookies.get('token'); // Get the JWT token
      const response = await fetch(`http://localhost:5000/users/cart/remove/${userId}/${productId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`, // Include the JWT token
        },
      });
      if (!response.ok) throw new Error('Failed to delete cart item');
      await getCartItems(userId); // Re-fetch cart items after deletion
    } catch (error) {
      console.error('Error deleting cart item:', error);
    }
  };
  

  // delete cart item
  const deleteCartItem = async (userId, productId) => {
    try {
      const token = Cookies.get('token'); // Get the JWT token
      const response = await fetch(`http://localhost:5000/users/cart/delete/${userId}/${productId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`, // Include the JWT token
        },
      });
      if (!response.ok) throw new Error('Failed to delete cart item');
      await getCartItems(userId); // Re-fetch cart items after deletion
    } catch (error) {
      console.error('Error deleting cart item:', error);
    }
  };

  // clear cart item
  const clearCart = async (userId) => {
    try {
      const token = Cookies.get('token'); // Get the JWT token
      const response = await fetch(`http://localhost:5000/users/cart/${userId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`, // Include the JWT token
        },
      });
      if (!response.ok) throw new Error('Failed to clear cart');
      // setCartItems([]); // Clear cart in frontend
    } catch (error) {
      console.error('Error clearing cart:', error);
    }
  };
  


  // // Load cart from cookies when currentUser changes
  // useEffect(() => {
  //   if (currentUser) {
  //     const storedCart = Cookies.get(`cart_${currentUser.username}`);
  //     if (storedCart) {
  //       setCart(JSON.parse(storedCart));
  //     } else {
  //       setCart({});
  //     }
  //   } else {
  //     setCart({});
  //   }
  // }, [currentUser]);

  // // Save cart to cookies whenever it changes
  // useEffect(() => {
  //   if (currentUser) {
  //     Cookies.set(`cart_${currentUser.username}`, JSON.stringify(cart), { expires: 7 });
  //     updateUserCart();
  //   }
  // }, [cart, currentUser]);

  // const addToCart = (itemId) => {
  //   setCart((prevCart) => ({
  //     ...prevCart,
  //     [itemId]: (prevCart[itemId] || 0) + 1,
  //   }));
  // };

  // const removeFromCart = (itemId) => {
  //   if (cart[itemId] > 0) {
  //     setCart((prevCart) => ({
  //       ...prevCart,
  //       [itemId]: prevCart[itemId] - 1,
  //     }));
  //   }
  // };

  // const deleteItem = (itemId) => {
  //   setCart((prevCart) => {
  //     const newCart = { ...prevCart };
  //     delete newCart[itemId];
  //     return newCart;
  //   });
  // };

  // const clearCart = () => {
  //   setCart({});
  //   if (currentUser) {
  //     Cookies.remove(`cart_${currentUser.username}`);
  //   }
  // };

  // const cartItems = products
  //   ? Object.keys(cart)
  //       .filter((id) => cart[id] > 0)
  //       .map((id) => {
  //         const product = products.find((prod) => prod.id === parseInt(id));
  //         return product ? { ...product, quantity: cart[id] } : null;
  //       })
  //       .filter((item) => item !== null)
  //   : [];

  const filteredProducts = Array.isArray(products)
  ? products.filter((product) =>
      product.name && search &&
      product.name.toLowerCase().includes(search.toLowerCase())
    )
  : [];


  const logout = () => {
    setCurrentUser(null);
    // setCart({});
    Cookies.remove("currentUser");
    Cookies.remove("token");
  };

  // const updateUserCart = async () => {
  //   if (!currentUser) return;

  //   const isAdmin = AdminData.some((admin) => admin.id === currentUser.id);
  //   if (isAdmin) return; 

  //   const userId = currentUser.id;
  //   try {
  //     const response = await fetch(`http://localhost:8000/user/${userId}`, {
  //       method: "PUT",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ ...currentUser, cart }),
  //     });
  //     if (!response.ok) {
  //       throw new Error("Network response was not ok");
  //     }
  //     const updatedUser = await response.json();
  //     setCurrentUser(updatedUser);
  //   } catch (error) {
  //     console.error("Error updating user cart:", error);
  //   }
  // };

  return (
    <ShopContext.Provider
      value={{
        productId,
        // cart,
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
        isPending,
        error,
      }}
    >
      {props.children}
    </ShopContext.Provider>
  );
};



// import React, { createContext, useState, useEffect } from "react";
// import useFetch from "../../utils/Api";
// import { AdminData } from "../../Admin/AdminData/AdminData";

// export const ShopContext = createContext();

// export const ShopContextProvider = (props) => {
//   const {
//     data: products,
//     isPending,
//     error,
//   } = useFetch("http://localhost:8000/db");
//   const [cart, setCart] = useState({});
//   const [search, setSearch] = useState("");
//   const [currentUser, setCurrentUser] = useState(null);

//   useEffect(() => {
//     const storedUser = JSON.parse(localStorage.getItem("currentUser"));
//     if (storedUser) {
//       setCurrentUser(storedUser);
//     }
//   }, []);

//   useEffect(() => {
//     if (currentUser) {
//       const storedCart = localStorage.getItem(`cart_${currentUser.username}`);
//       if (storedCart) {
//         setCart(JSON.parse(storedCart));
//       } else {
//         setCart({});
//       }
//     } else {
//       setCart({});
//     }
//   }, [currentUser]);

//   useEffect(() => {
//     if (currentUser) {
//       localStorage.setItem(
//         `cart_${currentUser.username}`,
//         JSON.stringify(cart)
//       );
//       updateUserCart();
//     }
//   }, [cart, currentUser]);

//   const addToCart = (itemId) => {
//     setCart((prevCart) => ({
//       ...prevCart,
//       [itemId]: (prevCart[itemId] || 0) + 1,
//     }));
//   };

//   const removeFromCart = (itemId) => {
//     if (cart[itemId] > 0) {
//       setCart((prevCart) => ({
//         ...prevCart,
//         [itemId]: prevCart[itemId] - 1,
//       }));
//     }
//   };

//   const deleteItem = (itemId) => {
//     setCart((prevCart) => {
//       const newCart = { ...prevCart };
//       delete newCart[itemId];
//       return newCart;
//     });
//   };

//   const clearCart = () => {
//     setCart({});
//     if (currentUser) {
//       localStorage.removeItem(`cart_${currentUser.username}`);
//     }
//   };

//   const cartItems = products
//     ? Object.keys(cart)
//         .filter((id) => cart[id] > 0)
//         .map((id) => {
//           const product = products.find((prod) => prod.id == parseInt(id));
//           return product ? { ...product, quantity: cart[id] } : null;
//         })
//         .filter((item) => item !== null)
//     : [];

//   const filteredProducts = products
//     ? products.filter((product) =>
//         product.name.toLowerCase().includes(search.toLowerCase())
//       )
//     : [];

//   const logout = () => {
//     setCurrentUser(null);
//     setCart({});
//     localStorage.removeItem("currentUser");
//     localStorage.removeItem("isLogged");
//   };

//   const updateUserCart = async () => {
//     if (!currentUser) return;
//     // Check if the current user is an admin
//     const isAdmin = AdminData.some((admin) => admin.id === currentUser.id);
//     if (isAdmin) return; // Skip server call for admin

//     const userId = currentUser.id;
//     try {
//       const response = await fetch(`http://localhost:8000/user/${userId}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ ...currentUser, cart }),
//       });
//       if (!response.ok) {
//         throw new Error("Network response was not ok");
//       }
//       const updatedUser = await response.json();
//       setCurrentUser(updatedUser);
//     } catch (error) {
//       console.error("Error updating user cart:", error);
//     }
//   };

//   return (
//     <ShopContext.Provider
//       value={{
//         cart,
//         cartItems,
//         filteredProducts,
//         search,
//         setSearch,
//         addToCart,
//         removeFromCart,
//         deleteItem,
//         setCurrentUser,
//         currentUser,
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
