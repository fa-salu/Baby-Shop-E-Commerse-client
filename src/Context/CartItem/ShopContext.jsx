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
  const [total, setTotal] = useState(0);

  console.log(total);

  const addToCart = (itemId) => {
    setCart((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    
  };
  const removeToCart = (itemId) => {
    if (cart[itemId] > 0) {
      setCart((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    }
  };
  
  const handleAddToCart = () => {
    setTotal(Object.values(cart).reduce((acc, curr) => acc + curr, 0))
  }

  
  return (
    <ShopContext.Provider value={{cart, total, addToCart, removeToCart, handleAddToCart}}>
      {props.children}
    </ShopContext.Provider>
  );
};

