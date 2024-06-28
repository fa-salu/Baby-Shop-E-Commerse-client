import React from 'react';
import { FaTimes } from 'react-icons/fa';

const SlideBar = ({ isCartOpen, toggleCart }) => {
  return (
    <div
      className={`fixed top-0 right-0 h-full bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
        isCartOpen ? 'translate-x-0' : 'translate-x-full'
      } w-4/12 max-wid-[35%]`}
    //   style={{ width: '35%', maxWidth: '35%' }}
    >
      <div className="p-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">Your Cart</h2>
          <FaTimes size={24} className="cursor-pointer" onClick={toggleCart} />
        </div>
          <hr/>
        <div className="mt-4">
          <p>Item 1</p>
          <p>Item 2</p>
          <p>Item 3</p>
        </div>
      </div>
    </div>
  );
};

export default SlideBar;
