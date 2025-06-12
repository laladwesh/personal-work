import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useOrder } from "../context/order";
import { UserContext } from "../context/user";

const PaymentPage = () => {
  const navigate = useNavigate();
  const userContext = useContext(UserContext);
  const order = useOrder();
  const { setAddress, setOrdAddress, setOrder } = useOrder();
  const handleClick = async () => {
    try {
      const orderData = {
        user: userContext.user, // User details
        orderDetails: order.order, // Current order details (materials, etc.)
        ordAddress: order.ordAddress, // Address ID to be fetched by the backend
        serviceName: order.address, // Store the service name
      };
      console.log(orderData);
      // Send the order data to the backend
      const response = await fetch("http://localhost:4000/api/v1/new-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      const data = await response.json();

      // Handle response
      if (!response.ok) {
        throw new Error(data.message || "Failed to create order.");
      }

      console.log("Order created successfully:", data);

      // Clear the current order context
      setOrder({});
      setAddress(null);
      setOrdAddress(null);
      // Navigate to confirmation page with the order ID
      navigate(`/confirm?orderId=${data.orderId}`);
    } catch (error) {
      console.error("Error creating order:", error);
      alert("Failed to create the order. Please try again.");
    }
  };

  return (
    <div className=" flex px-4 md:px-16 lg:px-28 gap-x-8 bg-gray-100 font-montserrat">
      <div className="bg-white  shadow-xl w-full rounded-3xl px-6 md:px-12 lg:px-16 py-16">
        <button
          onClick={handleClick}
          className="w-full max-w-sm px-6 py-6 bg-primary text-white text-lg font-bold rounded-2xl hover:bg-purple-800 transition mt-auto"
        >
          Proceed to Next
        </button>
      </div>
    </div>
  );
};

export default PaymentPage;
