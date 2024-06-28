import React from 'react';

const Contact = () => {
  return (
    <div className="bg-white py-12">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-4">Contact Us</h2>
        <p className="text-gray-700 mb-6">
          Have any questions or want to get in touch? We'd love to hear from you!
        </p>
        <form className="max-w-md mx-auto">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Name
            </label>
            <input 
              type="text" 
              id="name" 
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
              placeholder="Your name" 
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input 
              type="email" 
              id="email" 
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
              placeholder="Your email" 
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="message">
              Message
            </label>
            <textarea 
              id="message" 
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
              placeholder="Your message" 
              rows="4"
            ></textarea>
          </div>
          <button 
            type="submit" 
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}

export default Contact;
