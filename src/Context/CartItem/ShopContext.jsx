import React, { createContext, useState, useEffect } from "react";
import useFetch from "../../utils/Api";  

export const ShopContext = createContext();

export const ShopContextProvider = (props) => {
  const { data: products, isPending, error } = useFetch('http://localhost:8000/db');
  const [cart, setCart] = useState({});
  const [search, setSearch] = useState("");
  const [currentUser, setCurrentUser] = useState(null);

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
        setCart({});
      }
    } else {
      setCart({});
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
      [itemId]: (prevCart[itemId] || 0) + 1,
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
    setCart({});
    if (currentUser) {
      localStorage.removeItem(`cart_${currentUser.username}`);
    }
  };

  const cartItems = Object.keys(cart)
    .filter((id) => cart[id] > 0)
    .map((id) => {
      const product = products.find((prod) => prod.id == parseInt(id));
      return { ...product, quantity: cart[id] };
    });

  const filteredProducts = products
    ? products.filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase())
      )
    : [];

  const logout = () => {
    setCurrentUser(null);
    setCart({});
    localStorage.removeItem("currentUser");
    localStorage.removeItem("isLogged");
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
        isPending,
        error
      }}
    >
      {props.children}
    </ShopContext.Provider>
  );
};
