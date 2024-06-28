// Footer.jsx
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-100 py-8 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Contact Information */}
        <div className="col-span-1 md:col-span-2 lg:col-span-1">
          <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
          <p>123 Fifth Ave, New York, NY 12004.</p>
          <p>+1 123 456 78 90</p>
          <p>mail@example.com</p>
        </div>

        {/* Customer Service Links */}
        <div className="col-span-1 md:col-span-1 lg:col-span-1">
          <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
          <ul className="space-y-2">
            <li><a href="#">Contact Us</a></li>
            <li><a href="#">Help & FAQs</a></li>
            <li><a href="#">Payment Method</a></li>
            <li><a href="#">Delivery Information</a></li>
            <li><a href="#">Track Your Order</a></li>
            <li><a href="#">Return & Exchanges</a></li>
          </ul>
        </div>

        {/* Categories */}
        <div className="col-span-1 md:col-span-1 lg:col-span-1">
          <h3 className="text-lg font-semibold mb-4">Categories</h3>
          <ul className="space-y-2">
            <li><a href="#">Clothing & Fashion</a></li>
            <li><a href="#">Toys</a></li>
            <li><a href="#">School Supplies</a></li>
            <li><a href="#">Birthday Party Supplies</a></li>
            <li><a href="#">Baby Diapering</a></li>
          </ul>
        </div>

        {/* Company Information */}
        <div className="col-span-1 md:col-span-2 lg:col-span-1">
          <h3 className="text-lg font-semibold mb-4">Our Company</h3>
          <ul className="space-y-2">
            <li><a href="#">Corporate Information</a></li>
            <li><a href="#">Privacy & Cookies Policy</a></li>
            <li><a href="#">Terms & Condition</a></li>
            <li><a href="#">Promo & Terms</a></li>
          </ul>
        </div>
      </div>

      {/* Copyright Section */}
      <hr className='mt-8 mb-4 bg-black '/>
      <div className="mt-8 text-center text-gray-600">
        <p>Copyright © 2024 Baby Store | Powered by Baby Store</p>
      </div>
    </footer>
  );
};

export default Footer;
