import React from "react";
import Footer from "../Component/Footer/Footer";

// About Component
const About = () => {
  return (
    <>
      <div className="relative bg-white py-16 px-6 lg:px-8">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="https://images.pexels.com/photos/1648374/pexels-photo-1648374.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt="Baby Shoes"
            className="w-full h-full object-cover opacity-50"
          />
        </div>
        <div className="relative max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-extrabold text-pink-600 mb-4">
            LittleLove
          </h2>
          <p className="text-lg text-gray-800 mb-6">
            Welcome to LittleLove, your one-stop shop for all things baby! We
            offer a curated selection of unique, high-quality items that bring
            joy to your little ones. Our collection includes handcrafted
            clothing, eco-friendly toys, and personalized accessories, ensuring
            your baby's comfort and happiness. Discover the difference with
            LittleLove, where every product is made with love and care.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            <div className="flex items-center space-x-4">
              <img
                src="https://images.pexels.com/photos/27596412/pexels-photo-27596412/free-photo-of-a-baby-in-african-clothing-standing-next-to-a-basket.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Handcrafted Baby Clothes"
                className="w-20 h-20 rounded-full shadow-lg"
              />
              <div>
                <h3 className="text-xl font-bold text-gray-900">
                  Handcrafted Clothing
                </h3>
                <p className="text-sm text-gray-600">
                  Beautiful, hand-sewn clothes designed with the softest fabrics
                  to keep your baby comfortable and stylish.
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <img
                src="https://images.pexels.com/photos/3933279/pexels-photo-3933279.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Eco-Friendly Toys"
                className="w-20 h-20 rounded-full shadow-lg"
              />
              <div>
                <h3 className="text-xl font-bold text-gray-900">
                  Eco-Friendly Toys
                </h3>
                <p className="text-sm text-gray-600">
                  Discover our range of sustainable toys made from natural
                  materials that are safe and fun for your baby.
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <img
                src="https://images.pexels.com/photos/27649927/pexels-photo-27649927/free-photo-of-two-cookies-with-pictures-of-dogs-on-them.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Personalized Accessories"
                className="w-20 h-20 rounded-full shadow-lg"
              />
              <div>
                <h3 className="text-xl font-bold text-gray-900">
                  Personalized Accessories
                </h3>
                <p className="text-sm text-gray-600">
                  Create lasting memories with our personalized accessories,
                  custom-made for your little one.
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <img
                src="https://images.pexels.com/photos/7180798/pexels-photo-7180798.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Unique Baby Gifts"
                className="w-20 h-20 rounded-full shadow-lg"
              />
              <div>
                <h3 className="text-xl font-bold text-gray-900">
                  Unique Baby Gifts
                </h3>
                <p className="text-sm text-gray-600">
                  Find exclusive baby gifts that are perfect for baby showers,
                  birthdays, and other special occasions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default About;
