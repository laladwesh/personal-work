import React from "react";

const Footer = () => {
  return (
    <div className="px-4 sm:px-8 md:px-16 lg:px-28 mt-6 bg-gray-100">
      <div className="bg-primary shadow-xl rounded-3xl text-white items-center px-4 sm:px-6 md:px-12 lg:px-16 py-6 sm:py-8">
        {/* Logo Section */}
        <div className="py-5 border-b border-white flex ">
          <div className="bg-white w-20 sm:w-24 h-8 rounded-sm"></div>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-wrap justify-between w-full sm:w-11/12 font-montserrat mx-auto text-white text-sm sm:text-base font-semibold mt-6 sm:mt-8">
          <a href="/contact"><span className="cursor-pointer mb-3 sm:mb-0">Contact us</span></a>
          <a href="/"><span className="cursor-pointer mb-3 sm:mb-0">Home</span></a>
          <a href="/about"><span className="cursor-pointer mb-3 sm:mb-0">About us</span></a>
          <a href="/my-acc"><span className="cursor-pointer mb-3 sm:mb-0">Account</span></a>
          <a href="/order-his"><span className="cursor-pointer mb-3 sm:mb-0">Order history</span></a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
