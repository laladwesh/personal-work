import React from "react";

const OfferCards = () => {
  return (
    <div className="px-4 md:px-16 lg:px-28 mt-6 bg-gray-100">
      <div className="bg-white shadow-xl rounded-3xl items-center px-6 md:px-12 lg:px-16 py-6 md:py-8">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary font-montserrat mb-2 text-center lg:text-left">
          What we offer?
        </h2>
        <hr className="border-t-2 border-primary my-4" />
        <p className="text-gray-600 font-montserrat text-center lg:text-left">
          Get instant, accurate pricing for all your printing needs with our
          price calculator.
        </p>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-8 md:gap-y-11">
          {Array.from({ length: 6 }).map((_, index) => (
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
                </button></a>
              </div>
            </div>
          ))}
        </div>
        <div className="h-20 flex items-center justify-end mt-8">
          <a href="/allservices"><button className="h-12 px-6 rounded-3xl font-montserrat hover:bg-secondary transition text-primary bg-transparent  flex items-center justify-center">
            See All
          </button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default OfferCards;
