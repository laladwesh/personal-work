import React, { useRef } from "react";
import OfferCards from "../components/Card";
import { useOrder } from "../context/order";

const Home = () => {
  const { order } = useOrder();
  const offerCardsRef = useRef(null);  

  console.log("Current Order in Home:", order);

  const handleScrollToOffers = () => {
    if (offerCardsRef.current) {
      offerCardsRef.current.scrollIntoView({ behavior: "smooth" });  
    }
  };

  return (
    <div className="bg-gray-100">
      <div className="flex items-center justify-center min-h-[90vh] font-montserrat bg-gray-100 px-6 lg:px-14">
        {/* Wrapper for the entire component */}
        <div className="w-full h-auto lg:h-[100vh] flex flex-col lg:flex-row px-6 lg:px-16 space-y-6 lg:space-y-0 lg:space-x-11">
          {/* Left Section */}
          <div className="w-full lg:w-[50%] bg-white p-8 lg:p-16 shadow-lg flex flex-col justify-between rounded-2xl">
            {/* Text Section */}
            <div>
              <h1 className="text-[#1a0066] text-2xl sm:text-4xl lg:text-[44px] font-bold leading-tight lg:leading-[60px]">
                Prints So Fine, <br />
                Prices So Low. <br />
                Your Perfect Printing Partner.
              </h1>
              <div className="mt-6 lg:mt-10 space-y-3">
                <p className="text-black text-lg sm:text-xl lg:text-2xl font-semibold">
                  Guaranteed low prices
                </p>
                <p className="text-black text-lg sm:text-xl lg:text-2xl font-semibold">
                  Exceptional quality
                </p>
                <p className="text-black text-lg sm:text-xl lg:text-2xl font-semibold">
                  Professional Support
                </p>
              </div>
            </div>

            {/* Button Section */}
            <div className="mt-6 w-full lg:mt-12 flex justify-center">
              <button
                onClick={handleScrollToOffers}  
                className="px-4 py-4 w-full bg-[#5230b2] rounded-3xl flex items-center justify-center gap-4 text-white text-lg sm:text-2xl lg:text-[32px] font-bold"
              >
                <div className="w-10 h-16 lg:w-[59px] lg:h-[60px]">
                  <svg
                    width="100%"
                    height="100%"
                    viewBox="0 0 59 61"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="Print icon">
                      <rect
                        id="Rectangle 11"
                        y="2.85209"
                        width="38.0743"
                        height="38.0743"
                        transform="matrix(0.70114 0.713024 -0.70114 0.713024 31.4997 1.31848)"
                        stroke="#F5F5F5"
                        strokeWidth="4"
                      />
                      <line
                        id="Line 3"
                        x1="29.8477"
                        y1="19.7537"
                        x2="29.8477"
                        y2="41.2462"
                        stroke="#F5F5F5"
                        strokeWidth="4"
                      />
                    </g>
                  </svg>
                </div>
                Start Printing
              </button>
            </div>
          </div>

          {/* Right Section */}
          <div className="w-full lg:w-[50%] flex items-center justify-center bg-white shadow-lg rounded-2xl p-8 lg:p-16">
            <img
              src="doodle.png"
              alt="Doodles illustration"
              className="w-full h-full object-contain rounded-xl"
            />
          </div>
        </div>
      </div>

      {/* Offer Cards Section */}
      <div ref={offerCardsRef} className="px-4 sm:px-8 lg:px-14"> {/* Ref added here */}
        <OfferCards />
      </div>
    </div>
  );
};

export default Home;
