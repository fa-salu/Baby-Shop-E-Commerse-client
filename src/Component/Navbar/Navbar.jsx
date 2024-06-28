import React, { useContext, useState } from 'react';
import { FaSearch, FaCartArrowDown, FaUser, FaBars, FaTimes } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { ShopContext } from '../../Context/CartItem/ShopContext';
import SlideBar from '../CartSlidBar/SlideBar';


const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const navigate = useNavigate();
  const isLogged = localStorage.getItem("currentuser");
  const {total} = useContext(ShopContext)


  const handleClick = () => {
    navigate(isLogged ? '/profile' : '/login');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <div className="w-full bg-green-50 text-gray-800 sticky top-0 z-10">
      <nav className="container mx-auto flex items-center justify-between py-4 px-4 lg:px-0">
        <div className="text-2xl font-bold ml-5">
          Little<span className="text-pink-500">Love</span>
        </div>
        
        <ul className="hidden lg:flex lg:flex-row lg:items-center lg:space-x-8">
          <li className="hover:text-pink-500 cursor-pointer"><Link to='/'>Home</Link></li>
          <li className="hover:text-pink-500 cursor-pointer"><Link to='/shop'>Shop</Link></li>
          <li className="hover:text-pink-500 cursor-pointer"><Link to='/about'>About Us</Link></li>
          <li className="hover:text-pink-500 cursor-pointer"><Link to='/testimonial'>Testimonial</Link></li>
          <li className="hover:text-pink-500 cursor-pointer"><Link to='/contact'>Contact Us</Link></li>
        </ul>
        
        <div className="flex items-center space-x-4 mr-5">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 rounded-full text-black w-full sm:w-64"
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          </div>
          <div className="relative">
          <FaCartArrowDown onClick={toggleCart}
            size={24}
            className="hover:text-pink-500 cursor-pointer"
            
          />
          <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full text-xs px-1">
          {total}
          </span>
        </div>
          <FaUser size={20} onClick={handleClick} className="hover:text-pink-500 cursor-pointer" />
          <button onClick={toggleMenu} aria-label="Toggle menu" className="lg:hidden">
            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="lg:hidden w-full bg-green-50">
          <ul className="flex flex-col items-center space-y-4 py-4">
            <li className="hover:text-pink-500 cursor-pointer"><Link to='/' onClick={toggleMenu}>Home</Link></li>
            <li className="hover:text-pink-500 cursor-pointer"><Link to='/shop' onClick={toggleMenu}>Shop</Link></li>
            <li className="hover:text-pink-500 cursor-pointer"><Link to='/about' onClick={toggleMenu}>About Us</Link></li>
            <li className="hover:text-pink-500 cursor-pointer"><Link to='/testimonial' onClick={toggleMenu}>Testimonial</Link></li>
            <li className="hover:text-pink-500 cursor-pointer"><Link to='/contact' onClick={toggleMenu}>Contact Us</Link></li>
          </ul>
        </div>
      )}
       <SlideBar isCartOpen={isCartOpen} toggleCart={toggleCart} />
    </div>
    
  );
};

export default Navbar;
