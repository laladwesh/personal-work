import React from "react";

const OrderCard = ({ service, id, date }) => {
  return (
    <div className="flex flex-col w-full mt-10 gap-8">
      {/* Top Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex flex-col justify-center items-start gap-2">
          <div className="text-[#3d3d3d] text-xl md:text-2xl font-bold font-montserrat leading-normal">
            {service}
          </div>
          <div className="text-[#3d3d3d] text-sm md:text-base font-semibold font-montserrat leading-none">
            Order ID: {id}
          </div>
        </div>
        <div className="text-[#3d3d3d] text-sm md:text-base font-bold font-montserrat leading-none">
          {date}
        </div>
      </div>

      {/* Button Section */}
      <div className="px-8 py-4 md:ml-auto lg:ml-auto min-w-3/12 md:px-12 md:py-6 rounded-2xl md:rounded-3xl border-2 hover:bg-secondary cursor-pointer border-[#5230b2] flex justify-center items-center gap-2 transition-all duration-300">
        <div className="text-[#5230b2] text-sm md:text-base font-semibold font-montserrat leading-none">
          Download invoice
        </div>
      </div>

      {/* Divider */}
      <div className="w-full border-t border-gray-300"></div>
    </div>
  );
};

export default OrderCard;
