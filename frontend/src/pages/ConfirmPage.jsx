import { useLocation, Link, useNavigate } from "react-router-dom";

const ConfirmPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const steps = [
    { label: "Requirements", path: "" },
    { label: "Address", path: "" },
    { label: "Payment", path: "" },
    { label: "Confirmation", path: "/confirm" },
  ];
  const queryParams = new URLSearchParams(location.search);
  const orderId = queryParams.get("orderId");
  return (
    <div className="flex flex-col lg:flex-row px-4 md:px-16 lg:px-28 gap-y-6 lg:gap-x-8 bg-gray-100 font-montserrat">
      {/* Left Section */}
      <div className="bg-white shadow-xl w-full rounded-3xl px-6 md:px-12 lg:px-16 py-16">
        <div className="px-3 space-y-6">
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
                  <Link to={step.path}>{step.label}</Link>
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
            Order Successful!
          </div>
          <hr className="border-[#3d3d3d] border-1" />
          <div class="text-[#3d3d3d] text-2xl font-semibold font-['Montserrat'] leading-normal">
            Your order has been placed successfully.{" "}
          </div>
          <div class="text-[#3d3d3d] text-base font-semibold font-['Montserrat'] leading-none">
            Order ID: {orderId}
          </div>
          <div className="text-[#3d3d3d] text-sm md:text-base space-x-8">
            <button
              onClick={() => navigate("/confirm")}
              className="w-full max-w-sm px-6 py-6 bg-white text-primary border-primary border-2 text-lg font-bold rounded-3xl hover:bg-secondary transition mt-auto"
              
            >
              Download Invoice
            </button>
            <button
              onClick={() => navigate("/")}
              className="w-full max-w-sm px-6 py-6 bg-primary text-white text-lg font-bold rounded-3xl hover:bg-heading transition mt-auto"
            >
              Go Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmPage;
