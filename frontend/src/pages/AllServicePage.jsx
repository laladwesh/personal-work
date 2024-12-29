import React from "react";
import { useNavigate } from "react-router-dom";

const AllServicePage = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1); // This navigates to the previous page in the history stack
  };
  return (
    <div className="px-4 md:px-16 lg:px-28 bg-gray-100 font-montserrat">
      <div className="bg-white shadow-xl rounded-3xl items-center px-6 md:px-12 lg:px-16 py-6 md:py-8">
        <button className="mb-11" onClick={goBack}>
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="arrow_back">
              <path
                id="icon"
                d="M10.434 17.3333L17.9007 24.8L16.0007 26.6666L5.33398 16L16.0007 5.33331L17.9007 7.19998L10.434 14.6666H26.6673V17.3333H10.434Z"
                fill="#3D3D3D"
              />
            </g>
          </svg>
        </button>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-heading font-montserrat mb-2 text-center lg:text-left">
          Our Services
        </h2>
        <hr className="border-t-2 border-primary my-4" />
        <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-8 md:gap-y-11 ">
          {Array.from({ length: 12 }).map((_, index) => (
            <div
              key={index}
              className="w-full h-[480px] bg-white rounded-md flex flex-col justify-between p-4"
            >
              <div className="w-full h-[70%] bg-gray-100 rounded-md"></div>
              <div className="text-left">
                <h3 className="text-lg md:text-xl font-semibold mt-4 font-montserrat">
                  Lorem Ipsum
                </h3>
                <a href="/service/idxx"><button className="mt-4 px-4 md:px-6 py-2 md:py-4 font-montserrat w-full border-2 border-primary text-primary rounded-xl md:rounded-2xl hover:bg-secondary transition">
                  Details
                </button> </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllServicePage;
