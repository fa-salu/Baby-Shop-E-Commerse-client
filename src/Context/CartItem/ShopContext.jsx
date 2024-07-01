// import React, { createContext, useState } from "react";
// import { data_Product } from "../../assets/data";

// export const ShopContext = createContext();

// const getItemCart = () => {
//   let cart = {};
//   for (let i = 1; i <= data_Product.length; i++) {
//     cart[i] = 0;
//   }
//   return cart;
// };
// export const ShopContextProvider = (props) => {
//   const [cart, setCart] = useState(getItemCart());
//   const [total, setTotal] = useState(0);
//   const [search, setSearch] = useState("");
//   const [login, setLogin] = useState(false);
//   console.log("login: ", login);
//   console.log('cart: ', cart);

//   console.log(search);
//   console.log("total: ", total);

//   const addToCart = (itemId) => {
//     setCart((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
//   };
//   const removeToCart = (itemId) => {
//     if (cart[itemId] > 0) {
//       setCart((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
//     }
//   };
//   const deleteItem = (itemId) => {
//     if (cart[itemId] > 0) {
//       setCart((prev) => ({ ...prev, [itemId]: 0 }));
//     }
//   };

//   const handleAddToCart = () => {
//     setTotal(Object.values(cart).filter((itemId)=> itemId > 0).length)
//   };

//   const cartItems = Object.keys(cart)
//     .filter((id) => cart[id] > 0)
//     .map((id) => {
//       const product = data_Product.find((prod) => prod.id === parseInt(id));
//       return { ...product, quantity: cart[id] };
//     });

//   const filteredProducts = data_Product.filter((product) =>
//     product.name.toLowerCase().includes(search.toLowerCase())
//   );

//   return (
//     <ShopContext.Provider
//       value={{
//         cart,
//         total,
//         cartItems,
//         filteredProducts,
//         search,
//         login,
//         setLogin,
//         setSearch,
//         addToCart,
//         removeToCart,
//         handleAddToCart,
//         deleteItem,
//       }}
//     >
//       {props.children}
//     </ShopContext.Provider>
//   );
// };


import React, { createContext, useState } from "react";
import { data_Product } from "../../assets/data";

export const ShopContext = createContext();

const getItemCart = () => {
  let cart = {};
  for (let i = 1; i <= data_Product.length; i++) {
    cart[i] = 0;
  }
  return cart;
};

export const ShopContextProvider = (props) => {
  const [cart, setCart] = useState(getItemCart());
  const [search, setSearch] = useState("");
  const [login, setLogin] = useState(false);

  const addToCart = (itemId) => {
    setCart((prevCart) => ({
      ...prevCart,
      [itemId]: prevCart[itemId] + 1,
    }));
  };

  const removeToCart = (itemId) => {
    if (cart[itemId] > 0) {
      setCart((prevCart) => ({
        ...prevCart,
        [itemId]: prevCart[itemId] - 1,
      }));
    }
  };

  const deleteItem = (itemId) => {
    setCart((prevCart) => ({
      ...prevCart,
      [itemId]: 0,
    }));
  };

  const handleAddToCart = (itemId) => {
    addToCart(itemId);
  };

  const cartItems = Object.keys(cart)
    .filter((id) => cart[id] > 0)
    .map((id) => {
      const product = data_Product.find((prod) => prod.id === parseInt(id));
      return { ...product, quantity: cart[id] };
    });

  const filteredProducts = data_Product.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <ShopContext.Provider
      value={{
        cart,
        cartItems,
        filteredProducts,
        search,
        login,
        setLogin,
        setSearch,
        addToCart,
        removeToCart,
        handleAddToCart,
        deleteItem,
      }}
    >
      {props.children}
    </ShopContext.Provider>
  );
};
