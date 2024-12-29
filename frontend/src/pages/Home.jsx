import React, { useEffect } from "react";
//import Navbar from "../components/Navbar";
import OfferCards from "../components/Card";
import { useOrder } from "../context/order";
//import Footer from "../components/Footer";

const Home = () => {
  const { order } = useOrder();

  // useEffect(() => {
   console.log("Current Order in Home:", order);
  // }, [order]);


  return (
    <div className="bg-gray-100">
      <div class="flex items-center justify-center min-h-[90vh] font-montserrat bg-gray-100 px-14">
        {/* <!-- Wrapper for the entire component --> */}
        <div class="w-full h-[100vh] flex px-16 space-x-11 p-2  ">
          {/* <!-- Left Section --> */}
          <div class="w-[50vw] h-full bg-white p-16 shadow-lg flex flex-col justify-between rounded-xl">
            {/* <!-- Text Section --> */}
            <div>
              <div class="text-[#1a0066] text-[44px] font-bold font-['Montserrat'] leading-[60px]">
                Prints So Fine, <br />
                Prices So Low. <br />
                Your Perfect Printing Partner.
              </div>
              <div class="mt-10">
                <div class="text-black text-2xl font-semibold font-['Montserrat'] leading-normal">
                  Guaranteed low prices
                </div>
                <div class="text-black text-2xl font-semibold font-['Montserrat'] leading-normal mt-2">
                  Exceptional quality
                </div>
                <div class="text-black text-2xl font-semibold font-['Montserrat'] leading-normal mt-2">
                  Professional Support
                </div>
              </div>
            </div>

            {/* <!-- Button Section --> */}
            <div class="px-24 py-8 bg-[#5230b2] rounded-3xl justify-center items-center gap-2 inline-flex">
              <div class="flex items-center gap-4">
                {/* <!-- Icon --> */}
                <div class="w-[59px] h-[60px] relative">
                  <svg
                    width="59"
                    height="61"
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
                        stroke-width="4"
                      />
                      <line
                        id="Line 3"
                        x1="29.8477"
                        y1="19.7537"
                        x2="29.8477"
                        y2="41.2462"
                        stroke="#F5F5F5"
                        stroke-width="4"
                      />
                    </g>
                  </svg>
                </div>
                {/* <!-- Button Text --> */}
                <div class="text-[#f4f4f4] text-[32px] font-bold font-['Montserrat']">
                  Start printing
                </div>
              </div>
            </div>
          </div>

          {/* <!-- Divider --> */}

          {/* <!-- Right Section --> */}
          <div class="w-[50vw] h-full flex bg-white items-center shadow-lg rounded-xl justify-center p-16">
            {/* <!-- Replace this placeholder with your image --> */}
            <img
              src="doodle.png"
              alt="Doodles illustration"
              class="w-full h-auto object-contain"
            />
          </div>
        </div>
      </div>
      <OfferCards/>
      
    </div>
  );
};

export default Home;
