import React, { createContext, useState, useEffect } from "react";
import Cookies from "js-cookie"; // Import js-cookie for managing cookies
import useFetch from "../../utils/Api";
import { AdminData } from "../../Admin/AdminData/AdminData";

export const ShopContext = createContext();

export const ShopContextProvider = (props) => {
  const { data: products, isPending, error } = useFetch("http://localhost:5000/users/products");
  console.log(products);
  
  const [cart, setCart] = useState({});
  const [search, setSearch] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  // console.log("con: currentUser:", currentUser);
  
  

  // Load currentUser from cookies on initial load
  useEffect(() => {
    const storedUser = Cookies.get("currentUser");
    // console.log("con: storedUser:" , storedUser);
    
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
  }, []);

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

  const addToCart = (itemId) => {
    setCart((prevCart) => ({
      ...prevCart,
      [itemId]: (prevCart[itemId] || 0) + 1,
    }));
  };

  const removeFromCart = (itemId) => {
    if (cart[itemId] > 0) {
      setCart((prevCart) => ({
        ...prevCart,
        [itemId]: prevCart[itemId] - 1,
      }));
    }
  };

  const deleteItem = (itemId) => {
    setCart((prevCart) => {
      const newCart = { ...prevCart };
      delete newCart[itemId];
      return newCart;
    });
  };

  const clearCart = () => {
    setCart({});
    if (currentUser) {
      Cookies.remove(`cart_${currentUser.username}`);
    }
  };

  const cartItems = products
    ? Object.keys(cart)
        .filter((id) => cart[id] > 0)
        .map((id) => {
          const product = products.find((prod) => prod.id === parseInt(id));
          return product ? { ...product, quantity: cart[id] } : null;
        })
        .filter((item) => item !== null)
    : [];

  const filteredProducts = products
    ? products.filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase())
      )
    : [];

  const logout = () => {
    setCurrentUser(null);
    setCart({});
    Cookies.remove("currentUser");
    Cookies.remove("token");
  };

  const updateUserCart = async () => {
    if (!currentUser) return;

    const isAdmin = AdminData.some((admin) => admin.id === currentUser.id);
    if (isAdmin) return; 

    const userId = currentUser.id;
    try {
      const response = await fetch(`http://localhost:8000/user/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...currentUser, cart }),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const updatedUser = await response.json();
      setCurrentUser(updatedUser);
    } catch (error) {
      console.error("Error updating user cart:", error);
    }
  };

  return (
    <ShopContext.Provider
      value={{
        cart,
        cartItems,
        filteredProducts,
        search,
        setSearch,
        addToCart,
        removeFromCart,
        deleteItem,
        setCurrentUser,
        currentUser,
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
