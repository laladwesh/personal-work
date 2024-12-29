import React from "react";
import { ReactComponent as MyIcon1 } from '../../assets/group1.svg';
import { ReactComponent as MyIcon2 } from '../../assets/group2.svg';

const ServiceSection2 = () => {
  return (
    <div className="px-4 md:px-16 lg:px-28 bg-gray-100 font-montserrat">
      <div className="bg-white shadow-3xl rounded-3xl items-center px-6 md:px-12 lg:px-16 py-6 md:py-8 mt-6">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-heading font-montserrat mb-4 text-center lg:text-left">
          Things that stand out.
        </h2>
        <hr className="border-t-2 border-primary my-4" />
        <p className="text-sm md:text-lg lg:text-xl text-[#3d3d3d] font-medium leading-relaxed md:leading-loose text-center lg:text-left">
          Experience convenience, affordability, and eco-friendliness with our
          document printing services. Upload your files, choose color or
          black-and-white printing or mix, and select from various paper sizes.
          Complete your order in minutes at the best market prices.
        </p>

        {/* Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {/* Card 1 */}
          <div className="bg-[#f8f8fc] p-6 rounded-2xl shadow-md w-full flex flex-col">
            <div className="w-20 h-20 mb-4">
              <MyIcon1 className="w-full h-full" />
            </div>
            <h3 className="text-lg md:text-xl font-semibold text-gray-800">
              Affordability
            </h3>
            <p className="text-sm md:text-base lg:text-lg font-medium text-gray-600 mt-2">
              Enjoy premium-quality prints at unbeatable prices. Our competitive
              rates ensure great value for your money.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-[#f8f8fc] p-6 rounded-2xl shadow-md w-full flex flex-col ">
            <div className="w-20 h-20 mb-4">
              <MyIcon2 className="w-full h-full" />
            </div>
            <h3 className="text-lg md:text-xl font-semibold text-gray-800">
              Confidentiality
            </h3>
            <p className="text-sm md:text-base lg:text-lg font-medium text-gray-600 mt-2">
              Your privacy is our priority. Our secure online printing and
              discreet shipping keep your documents confidential.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-[#f8f8fc] p-6 rounded-2xl shadow-md w-full flex flex-col ">
            <div className="w-20 h-20 mb-4">
              <img src="/quality1.png" className="w-full h-full" alt="Quality" />
            </div>
            <h3 className="text-lg md:text-xl font-semibold text-gray-800">
              Quality
            </h3>
            <p className="text-sm md:text-base lg:text-lg font-medium text-gray-600 mt-2">
              Enjoy top-tier printing with advanced technology for sharp,
              vibrant results that make your documents shine.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceSection2;
