import React from 'react';
import Footer from '../Component/Footer/Footer';

const Testimonial = () => {
  const testimonials = [
    {
      name: 'Sarah J.',
      image: 'https://via.placeholder.com/150',
      text: 'I absolutely love the baby products from this shop! They are of great quality and my baby loves them.',
    },
    {
      name: 'Michael K.',
      image: 'https://via.placeholder.com/150',
      text: 'Fast delivery and excellent customer service. Highly recommend this shop to all parents!',
    },
    {
      name: 'Emily R.',
      image: 'https://via.placeholder.com/150',
      text: 'The variety of products available is fantastic. I found everything I needed for my newborn.',
    },
  ];

  return (
    <div className="bg-gray-100 py-12">
      <div className="container mx-auto px-6 mb-10  ">
        <h2 className="text-3xl font-bold text-center mb-8">Customer Testimonials</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
              <img 
                src={testimonial.image} 
                alt={`${testimonial.name}'s picture`} 
                className="w-16 h-16 rounded-full mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold text-center mb-2">{testimonial.name}</h3>
              <p className="text-gray-700 text-center">{testimonial.text}</p>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Testimonial;
