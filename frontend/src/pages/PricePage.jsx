import React from "react";
import { useOrder } from "../context/order";
import AccordionWithOptions from "../components/Accordion";
import { useLocation, useNavigate } from "react-router-dom";

const PricePage = () => {
  const order = useOrder();
  const navigate = useNavigate();
  const location = useLocation();
  const steps = [
    { label: "Requirements", path: "/price" },
    { label: "Address", path: "" },
    { label: "Payment", path: "" },
    { label: "Confirmation", path: "" },
  ];
  return (
    <div className="flex flex-col lg:flex-row px-4 md:px-16 lg:px-28 gap-y-6 lg:gap-x-8 bg-gray-100 font-montserrat">
  {/* Left Section */}
  <div className="bg-white shadow-xl w-full rounded-3xl px-6 md:px-12 lg:px-16 py-16">
    <div className="px-3">
      {/* Breadcrumb Section */}
      <div className="flex items-center flex-wrap gap-2">
        {steps.map((step, index) => (
          <div key={step.path} className="flex items-center">
            {/* Link */}
            <span
              className={`text-base font-medium font-['Montserrat'] leading-none ${
                location.pathname === step.path
                  ? "text-[#5230b2]"
                  : "text-[#3d3d3d]"
              }`}
            >
              <a href={step.path}>{step.label}</a>
            </span>

            {/* ">" icon except for the last item */}
            {index < steps.length - 1 && (
              <span className="mx-2 text-[#3d3d3d]">{">"}</span>
            )}
          </div>
        ))}
      </div>

      {/* Title Section */}
      <div className="text-[#1a0066] text-2xl md:text-4xl lg:text-5xl font-bold font-['Montserrat'] my-6 md:my-10 leading-snug">
        Book printing
      </div>
      <div className="text-[#3d3d3d] text-sm md:text-base font-normal font-['Montserrat'] leading-relaxed">
        Choose options according to your requirements
      </div>
    </div>

    {/* Accordion Section */}
    <div className="w-full flex-grow">
    <AccordionWithOptions
  is={true}
  title="Print Colour"
  category="printcolour"
  selected={order.order?.printcolour?.id}
/>
<AccordionWithOptions
  is={false}
  title="Paper Size"
  category="papersize"
  selected={order.order?.papersize?.id}
/>
<AccordionWithOptions
  is={false}
  title="GSM"
  category="gsm"
  selected={order.order?.gsm?.id}
/>
<AccordionWithOptions
  is={false}
  title="Binding Type"
  category="bindingtype"
  selected={order.order?.bindingtype?.id}
/>
    </div>
  </div>

  {/* Right Section */}
  <div className="w-full lg:w-3/6 flex flex-col space-y-6">
    {/* Summary Section */}
    <div className="shadow-xl rounded-3xl px-4 md:px-12 lg:px-11 py-8 bg-white w-full max-w-full lg:max-w-sm">
      <h2 className="text-lg font-semibold mb-4">Summary</h2>
      <ul className="space-y-2">
        {Object.entries(order.order).map(([key, value]) => (
          <li className="flex justify-between" key={key}>
            <span>{key.charAt(0).toUpperCase() + key.slice(1)}</span>
            <span>${value.price}</span>
          </li>
        ))}
      </ul>
      <hr className="my-4 border-gray-300" />
      <div className="flex justify-between font-semibold">
        <span>TOTAL</span>
        <span>
          $
          {Object.values(order.order).reduce(
            (total, item) => total + item.price,
            0
          )}
        </span>
      </div>
    </div>

    {/* Button Section */}
    <button
      type="button"
      onClick={() => navigate("/address")}
      className="w-full lg:max-w-sm px-6 py-6 bg-primary text-white text-lg font-bold rounded-2xl hover:bg-purple-800 transition mt-auto"
    >
      Place Order
    </button>
  </div>
</div>
  );
};

export default PricePage;
