import React, { useContext, useRef } from "react";
import { UserContext } from "../context/user";
import ServiceSection1 from "../components/service/ServiceSection1";
import ServiceSection2 from "../components/service/ServiceSection2";
import ServiceSection3 from "../components/service/ServiceSection3";
import ServiceSection4 from "../components/service/ServiceSection4";
import ServiceSection3b from "../components/service/ServiceSection3b";
import { useParams } from "react-router-dom";
import { useOrder } from "../context/order";


const ServicePage = () => {
  const section3Ref = useRef(null); // Create a reference for ServiceSection3
  const userContext = useContext(UserContext);
  const{ setAddress} = useOrder();
  const {id} = useParams();
      setAddress(id);  
  const scrollToSection3 = () => {
    section3Ref.current.scrollIntoView({ behavior: "smooth" }); // Scroll to ServiceSection3 smoothly
  };
  return (
    <div>
        <ServiceSection1 onKnowMoreClick={scrollToSection3}/>
        <ServiceSection2/>
        <div ref={section3Ref}> {/* Attach the reference to ServiceSection3 */}
        {userContext.user?<ServiceSection3b />:<ServiceSection3/>}
      </div>
        <ServiceSection4/>
    </div>
  );
};

export default ServicePage;
