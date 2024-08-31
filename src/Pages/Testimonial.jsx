import React, { useState, useRef, useEffect } from "react";
import Footer from "../Component/Footer/Footer";

const Testimonial = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [slideWidth, setSlideWidth] = useState(0);
  const slideRefs = useRef([]);

  useEffect(() => {
    if (slideRefs.current[activeSlide]) {
      setSlideWidth(slideRefs.current[activeSlide].offsetWidth);
    }
  }, [activeSlide]);

  const handlePrev = () => {
    if (activeSlide > 0) {
      setActiveSlide(activeSlide - 1);
    }
  };

  const handleNext = () => {
    if (activeSlide < slideRefs.current.length - 1) {
      setActiveSlide(activeSlide + 1);
    }
  };

  const handleDotClick = (index) => {
    setActiveSlide(index);
  };

  return (
    <section className="relative pt-20 pb-0 lg:pt-32 lg:pb-36 bg-gray-50 overflow-hidden">
      <div className="relative container px-4 mx-auto mb-12">
        <div className="flex flex-col items-center text-center">
          <img
            src="https://images.pexels.com/photos/301977/pexels-photo-301977.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt="What our clients said"
            className="w-full max-w-2xl mb-6 rounded-lg shadow-lg"
          />
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            What Our Clients Said
          </h2>
          <p className="text-gray-600">
            Discover why our clients love us! Read their testimonials and see
            how our services have made a difference.
          </p>
        </div>
      </div>

      <div className="relative container px-4 mx-auto">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap -mx-4 items-center mb-20">
            <div className="w-full lg:w-1/1 px-4">
              <div className="flex items-center justify-between">
                <button
                  onClick={handlePrev}
                  className="inline-flex mr-3 w-14 h-14 items-center justify-center rounded-full border border-gray-200 hover:border-orange-900 text-gray-600 hover:text-orange-900 transition duration-200"
                >
                  <svg
                    width="12"
                    height="14"
                    viewBox="0 0 12 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0.0799999 6.62C0.127594 6.49725 0.19896 6.38511 0.290001 6.29L5.29 1.29C5.38324 1.19676 5.49393 1.1228 5.61575 1.07234C5.73757 1.02188 5.86814 0.995911 6 0.995911C6.2663 0.995911 6.5217 1.1017 6.71 1.29C6.80324 1.38324 6.8772 1.49393 6.92766 1.61575C6.97812 1.73758 7.00409 1.86814 7.00409 2C7.00409 2.2663 6.8983 2.5217 6.71 2.71L3.41 6H11C11.2652 6 11.5196 6.10536 11.7071 6.2929C11.8946 6.48043 12 6.73479 12 7C12 7.26522 11.8946 7.51957 11.7071 7.70711C11.5196 7.89465 11.2652 8 11 8H3.41L6.71 11.29C6.80373 11.383 6.87812 11.4936 6.92889 11.6154C6.97966 11.7373 7.0058 11.868 7.0058 12C7.0058 12.132 6.97966 12.2627 6.92889 12.3846C6.87812 12.5064 6.80373 12.617 6.71 12.71C6.61704 12.8037 6.50644 12.8781 6.38458 12.9289C6.26272 12.9797 6.13201 13.0058 6 13.0058C5.86799 13.0058 5.73728 12.9797 5.61542 12.9289C5.49356 12.8781 5.38296 12.8037 5.29 12.71L0.290001 7.71C0.19896 7.6149 0.127594 7.50275 0.0799999 7.38C-0.0200176 7.13654 -0.0200176 6.86346 0.0799999 6.62Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                </button>
                <button
                  onClick={handleNext}
                  className="inline-flex w-14 h-14 items-center justify-center rounded-full bg-orange-50 hover:bg-orange-100 text-orange-900 transition duration-200"
                >
                  <svg
                    width="12"
                    height="14"
                    viewBox="0 0 12 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11.92 6.62C11.8724 6.49725 11.801 6.38511 11.71 6.29L6.71 1.29C6.61676 1.19676 6.50607 1.1228 6.38425 1.07234C6.26243 1.02188 6.13186 0.995911 6 0.995911C5.7337 0.995911 5.4783 1.1017 5.29 1.29C5.19676 1.38324 5.1228 1.49393 5.07234 1.61575C5.02188 1.73758 4.99591 1.86814 4.99591 2C4.99591 2.2663 5.1017 2.5217 5.29 2.71L8.59 6H1C0.734784 6 0.48043 6.10536 0.292893 6.2929C0.105357 6.48043 0 6.73479 0 7C0 7.26522 0.105357 7.51957 0.292893 7.70711C0.48043 7.89465 0.734784 8 1 8H8.59L5.29 11.29C5.19627 11.383 5.12188 11.4936 5.07111 11.6154C5.02034 11.7373 4.9942 11.868 4.9942 12C4.9942 12.132 5.02034 12.2627 5.07111 12.3846C5.12188 12.5064 5.19627 12.617 5.29 12.71C5.38296 12.8037 5.49356 12.8781 5.61542 12.9289C5.73728 12.9797 5.86799 13.0058 6 13.0058C6.13201 13.0058 6.26272 12.9797 6.38458 12.9289C6.50644 12.8781 6.61704 12.8037 6.71 12.71L11.71 7.71C11.801 7.6149 11.8724 7.50275 11.92 7.38C12.02 7.13654 12.02 6.86346 11.92 6.62Z"
                      fill="#FF460C"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <div
            className="mb-12 flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${slideWidth * activeSlide}px)` }}
          >
            <div
              ref={(el) => (slideRefs.current[0] = el)}
              className="flex-shrink-0 w-full lg:w-1/2 px-4"
            >
              <div className="relative flex flex-col overflow-hidden bg-white shadow-lg rounded-lg p-8">
                <p className="text-gray-600 mb-6">
                  "The customer service here is amazing. They went above and
                  beyond to help me."
                </p>
                <div className="flex items-center">
                  <img
                    src="https://via.placeholder.com/150"
                    alt="Avatar"
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <p className="font-semibold">Jane Doe</p>
                    <p className="text-gray-500">CEO at Company</p>
                  </div>
                </div>
              </div>
            </div>
            <div
              ref={(el) => (slideRefs.current[1] = el)}
              className="flex-shrink-0 w-full lg:w-1/2 px-4"
            >
              <div className="relative flex flex-col overflow-hidden bg-white shadow-lg rounded-lg p-8">
                <p className="text-gray-600 mb-6">
                  "Exceptional quality and service. I would recommend them to
                  anyone!"
                </p>
                <div className="flex items-center">
                  <img
                    src="https://via.placeholder.com/150"
                    alt="Avatar"
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <p className="font-semibold">John Smith</p>
                    <p className="text-gray-500">Manager at Business</p>
                  </div>
                </div>
              </div>
            </div>
            <div
              ref={(el) => (slideRefs.current[1] = el)}
              className="flex-shrink-0 w-full lg:w-1/2 px-4"
            >
              <div className="relative flex flex-col overflow-hidden bg-white shadow-lg rounded-lg p-8">
                <p className="text-gray-600 mb-6">
                  "Exceptional quality and service. I would recommend them to
                  anyone!"
                </p>
                <div className="flex items-center">
                  <img
                    src="https://via.placeholder.com/150"
                    alt="Avatar"
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <p className="font-semibold">John Smith</p>
                    <p className="text-gray-500">Manager at Business</p>
                  </div>
                </div>
              </div>
            </div>
            <div
              ref={(el) => (slideRefs.current[1] = el)}
              className="flex-shrink-0 w-full lg:w-1/2 px-4"
            >
              <div className="relative flex flex-col overflow-hidden bg-white shadow-lg rounded-lg p-8">
                <p className="text-gray-600 mb-6">
                  "Exceptional quality and service. I would recommend them to
                  anyone!"
                </p>
                <div className="flex items-center">
                  <img
                    src="https://via.placeholder.com/150"
                    alt="Avatar"
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <p className="font-semibold">John Smith</p>
                    <p className="text-gray-500">Manager at Business</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
          <div className="flex justify-center mt-8">
            {slideRefs.current.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full mx-2 ${
                  index === activeSlide ? "bg-orange-900" : "bg-gray-300"
                }`}
                onClick={() => handleDotClick(index)}
              ></button>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-5">
      <Footer />
      </div>
    </section>
  );
};

export default Testimonial;
