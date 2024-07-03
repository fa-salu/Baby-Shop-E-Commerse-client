import React, { useContext, useEffect } from "react";
import { ShopContext } from "../Context/CartItem/ShopContext";

const Api = () => {
  const { setProduct } = useContext(ShopContext);

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const res = await fetch("http://localhost:8000/db");
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchApi();
  }, [setProduct]);

  return <div></div>;
};

export default Api;
