import React from "react";
import AccordionWithOptions from "../Accordion";
import { useNavigate } from "react-router-dom";
import { useOrder } from "../../context/order";

const ServiceSection3b = () => {
  const navigate = useNavigate();
  const order = useOrder();

  const handleCalculate = () => {
    navigate("/price");
  };

  return (
    <div className="px-4 md:px-16 lg:px-28 bg-gray-100 font-montserrat">
      <div className="bg-white shadow-3xl rounded-3xl items-center px-6 md:px-12 lg:px-16 py-6 md:py-8 mt-6">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-heading font-montserrat mb-4 text-center lg:text-left">
          Price it now!
        </h2>
        <hr className="border-t-2 border-primary my-4" />
        <p className="text-sm md:text-lg lg:text-xl text-[#3d3d3d] font-medium leading-relaxed md:leading-loose text-center lg:text-left">
          Get instant, accurate pricing for all your printing needs with our
          price calculator. Choose options according to your requirements.
        </p>
        <div className="flex flex-col lg:flex-row justify-center gap-x-7 mt-8">
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

          {/* Summary & Button Section */}
          <div className="w-5/6 flex flex-col mx-auto h-full items-center gap-6">
            {/* Summary Section */}
            <div className="w-full max-w-sm bg-purple-100 p-4 rounded-xl shadow-md flex-grow">
              <h2 className="text-lg font-semibold mb-4">Summary</h2>
              {order?.order && Object.keys(order.order).length > 0 ? (
                <>
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
                </>
              ) : (
                <p className="text-gray-500">No items in the order summary.</p>
              )}
            </div>

            {/* Button Section */}
            <button
              type="button"
              onClick={handleCalculate}
              className="w-full max-w-sm px-6 py-3 bg-primary text-white text-lg font-bold rounded-2xl hover:bg-purple-800 transition mt-auto"
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceSection3b;
