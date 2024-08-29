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
  const [wishlistItems, setWishlistItems]= useState([])
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


  const addToWishlist = async (userId, productId) => {
    console.log('addtowishlist: ', userId, productId);
    
    try {
      const token = Cookies.get("token");
      const response = await fetch("http://localhost:5000/users/wishlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userId, productId }),
      });
      if (!response.ok) throw new Error("Failed to add item to wishlist");

      const data = await response.json();
      setWishlistItems(data.wishlist.products); 
    } catch (error) {
      console.error("Error adding item to wishlist:", error);
    }
  };

  const removeFromWishlist = async (userId, productId) => {
    try {
      const token = Cookies.get("token");
      const response = await fetch(`http://localhost:5000/users/wishlist/remove/${userId}/${productId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userId, productId }),
      });
      if (!response.ok) throw new Error("Failed to remove item from wishlist");
  
      const data = await response.json();
      setWishlistItems(data.wishlist.products); 
    } catch (error) {
      console.error("Error removing item from wishlist:", error);
    }
  };


  const getWishlist = async (userId) => {
    try {
      const token = Cookies.get("token");
      const response = await fetch(`http://localhost:5000/users/wishlist/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      
      if (!response.ok) throw new Error("Failed to fetch wishlist");

      const data = await response.json();
      setWishlistItems(data); 
    } catch (error) {
      console.error("Error fetching wishlist:", error);
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
        addToWishlist,
        wishlistItems,
        removeFromWishlist,
        getWishlist,
        isPending,
        error,
      }}
    >
      {props.children}
    </ShopContext.Provider>
  );
};
