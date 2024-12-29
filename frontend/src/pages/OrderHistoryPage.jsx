import React from "react";
import OrderCard from "../components/OrderCard";

const OrderHistoryPage = () => {
  return (
    <div className="min-h-screen px-4 py-8 bg-gray-100 md:px-8 lg:px-16 xl:px-28 font-montserrat">
      <div className="p-6 bg-white rounded-lg shadow-md md:p-10 lg:p-14">
        {/* Title */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-4xl font-bold text-primary mb-2">
            Order History
          </h1>
          <hr className="border-t-2 border-primary" />
        </div>

        {/* Order Cards */}
        <div className="flex flex-col gap-6">
          <OrderCard
            service="Custom Printing"
            id="12345678901"
            date="29/04/2023"
          />
          <OrderCard
            service="Photo Printing"
            id="12345678902"
            date="12/03/2023"
          />
          <OrderCard
            service="Binding Services"
            id="12345678903"
            date="05/01/2023"
          />
        </div>
      </div>
    </div>
  );
};

export default OrderHistoryPage;
