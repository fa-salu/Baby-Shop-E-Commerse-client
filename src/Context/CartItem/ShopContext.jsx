import React, { createContext, useState, useEffect } from "react";
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
  const [currentUser, setCurrentUser] = useState(null);
  const [product, setProduct] = useState(null)
  // console.log('Product: ',product);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("currentUser"));
    if (storedUser) {
      setCurrentUser(storedUser);
    }
  }, []);

  useEffect(() => {
    if (currentUser) {
      const storedCart = localStorage.getItem(`cart_${currentUser.username}`);
      if (storedCart) {
        setCart(JSON.parse(storedCart));
      } else {
        setCart(getItemCart());
      }
    } else {
      setCart(getItemCart());
    }
  }, [currentUser]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(
        `cart_${currentUser.username}`,
        JSON.stringify(cart)
      );
    }
  }, [cart, currentUser]);

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

  const clearCart = () => {
    setCart(getItemCart());
    if (currentUser) {
      localStorage.removeItem(`cart_${currentUser.username}`);
    }
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

  const logout = () => {
    setCurrentUser(null);
    setCart(getItemCart());
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
        removeToCart,
        deleteItem,
        setCurrentUser,
        currentUser,
        logout,
        clearCart,
        setProduct
      }}
    >
      {props.children}
    </ShopContext.Provider>
  );
};
