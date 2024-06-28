import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { data_Product } from "../../assets/data";
import { ShopContext } from "../../Context/CartItem/ShopContext";

const Cart = () => {
  const { id } = useParams();
  const product = data_Product[id - 1];
  const { cart, addToCart, removeToCart, handleAddToCart } = useContext(ShopContext);

  return (
    <div className="flex flex-col items-center">
      <div
        key={product.id}
        className="w-full max-w-sm p-4 bg-white shadow-lg rounded-lg"
      >
        <div className="mb-4">
          <img
            className="w-full h-48 object-cover rounded-md"
            src={product.image}
            alt={product.name}
          />
        </div>
        <div className="text-center">
          <p className="text-gray-500">{product.category}</p>
          <h1 className="text-xl font-bold text-gray-800">{product.name}</h1>
          <p className="text-lg font-semibold text-gray-600">{product.price}</p>
          <p className="text-gray-600 mt-2">{product.description}</p>
          <div className="mt-4 flex justify-center items-center space-x-4">
            <p className=" bg-gray-200 text-gray-700 rounded-md ">
              <button
                onClick={() => {
                  removeToCart(id);
                }}
                className="px-3 py-1 hover:bg-gray-500 hover:text-white cursor-pointer"
              >
                -
              </button>
              <input
                value={cart[id]}
                className="w-4 bg-transparent"
                type="text"
                readOnly
              />
              <button
                onClick={() => {
                  addToCart(id);
                }}
                className="px-3 py-1 hover:bg-gray-500 hover:text-white cursor-pointer"
              >
                +
              </button>
            </p>
            <button
              onClick={handleAddToCart}
              className="px-3 py-1 bg-blue-500 text-white rounded-md"
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
