import React, { useContext } from "react";
import AccordionWithOptions from "../Accordion";
import { UserContext } from "../../context/user";
import { useNavigate } from "react-router-dom";

const ServiceSection3 = () => {
  const userContext = useContext(UserContext); 
  const navigate = useNavigate();
  const handleCalculate = () => {
    if(!userContext.user){
      navigate("/sign-up");
      return;
    }else{
      navigate("/price");
    }
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
        <div className="flex gap-x-7 mt-8">
          <div className="w-full">
            <AccordionWithOptions is={true} title="Print Colour" category="printcolour" />
            <AccordionWithOptions is={false} title="Paper Size" category="papersize" />
            <AccordionWithOptions is={false} title="GSM" category="gsm" />
            <AccordionWithOptions is={false} title="Binding Type" category="bindingtype" />
          </div>
          <div className="w-4/6 mt-auto flex justify-center">
            <button
              type="button"
              onClick={handleCalculate}
              className="w-5/6 px-6 py-2 md:px-12 md:py-3 border-2 border-[#5230b2] text-[#5230b2] hover:bg-secondary text-sm md:text-lg lg:text-xl font-semibold rounded-2xl"
            >
              Calculate price
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceSection3;
