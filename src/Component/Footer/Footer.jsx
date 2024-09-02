import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="text-gray-600 body-font bg-gray-100">
      <div className="container flex flex-col flex-wrap px-5 py-8 mx-auto md:items-start lg:items-start md:flex-row">
        <div className="flex-shrink-0 w-64 mx-auto text-center md:mx-0 md:text-left mb-6 md:mb-0">
          <a className="flex items-center justify-center font-medium text-gray-900 title-font md:justify-start">
            <span className="ml-3 text-xl font-bold">Litte<span className="text-pink-500">Love</span></span>
          </a>
          <p className="mt-2 text-sm text-gray-500">Visit us at our Baby Shop HQ. 123 Baby Lane, Malappuram, Manjeri city</p>
        </div>
        <div className="flex flex-wrap flex-grow mx-8 text-center md:text-left">
          <div className="w-full px-4 lg:w-1/4 md:w-1/2 mb-6 md:mb-0">
            <h2 className="mb-3 text-sm font-medium tracking-widest text-gray-900 uppercase title-font">
              About
            </h2>
            <nav className="list-none">
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-800">Company</a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-800">Careers</a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-800">Blog</a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-800">Partners</a>
              </li>
            </nav>
          </div>
          <div className="w-full px-4 lg:w-1/4 md:w-1/2 mb-6 md:mb-0">
            <h2 className="mb-3 text-sm font-medium tracking-widest text-gray-900 uppercase title-font">
              Support
            </h2>
            <nav className="list-none">
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-800">Help Center</a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-800">Contact Us</a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-800">Privacy Policy</a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-800">Terms of Service</a>
              </li>
            </nav>
          </div>
          <div className="w-full px-4 lg:w-1/4 md:w-1/2 mb-6 md:mb-0">
            <h2 className="mb-3 text-sm font-medium tracking-widest text-gray-900 uppercase title-font">
              Follow Us
            </h2>
            <nav className="list-none">
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-800">Facebook</a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-800">Twitter</a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-800">Instagram</a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-800">LinkedIn</a>
              </li>
            </nav>
          </div>
        </div>
        <div className="flex flex-col items-center md:items-start mt-4 md:mt-0">
          <p className="mt-2 text-sm text-gray-500">Follow us on our social media channels.</p>
          <div className="inline-flex justify-center mt-4 space-x-3">
            <a href="#" className="text-gray-500 cursor-pointer hover:text-gray-700 transition-colors">
              <FaFacebookF size={20} />
            </a>
            <a href="#" className="text-gray-500 cursor-pointer hover:text-gray-700 transition-colors">
              <FaTwitter size={20} />
            </a>
            <a href="#" className="text-gray-500 cursor-pointer hover:text-gray-700 transition-colors">
              <FaInstagram size={20} />
            </a>
            <a href="#" className="text-gray-500 cursor-pointer hover:text-gray-700 transition-colors">
              <FaLinkedinIn size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
