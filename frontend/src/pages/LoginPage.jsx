import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/user";

const LoginPage = () => {
  const userContext = useContext(UserContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (userContext.user && userContext.user.email) {
      navigate(-1);
    }
  }, []);

  const handleError = (message) => {
    toast.error(message, {
      position: "top-right",
      autoClose: 5000,
      className: "custom-toast",
      progressClassName: "custom-progress",
    });
  };

  const handleSuccess = (message) => {
    toast.success(message, {
      position: "top-right",
      autoClose: 5000,
      className: "custom-toast",
      progressClassName: "custom-progress",
    });
  };

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    company: "",
    state: "",
    pincode: "",
    otp: "",
  });
  const [secondpage, setSecondPage] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  useEffect(() => {
    console.log("Updated user context:", userContext.user);
  }, [userContext.user]);

  const handleLoginSubmit = async (event) => {
    setLoading(true);
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:4000/api/v1/send-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const contentType = response.headers.get("Content-Type");
      let data;
      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
      } else {
        data = await response.text();
      }

      if (data.success) {
        handleSuccess("OTP sent successfully!");
        setSecondPage(true);
      } else {
        handleError(data.message || "Failed to send OTP.");
      }
    } catch (error) {
      console.error("Error submitting the form:", error);
      handleError("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const goback = () => {
    setSecondPage(false);
  };

  const handleCancel = (event) => {
    event.preventDefault();
    navigate(-1);
  };

  const handleVerificationSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:4000/api/v1/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: formData.email, otp: formData.otp }),
      });

      const contentType = response.headers.get("Content-Type");
      let data;
      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
      } else {
        data = await response.text();
      }

      if (data.success) {
        handleSuccess("Account created successfully!");
        navigate("/");
        userContext.setUser(formData);
        // console.log(userContext.user);
      } else {
        handleError(data.message || "Verification failed.");
      }
    } catch (error) {
      console.error("Error verifying the OTP:", error);
      handleError("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="px-4 md:px-8 lg:px-16 xl:px-28 bg-gray-100 font-montserrat">
      <div className="w-full h-auto lg:h-[120vh] p-6 md:p-10 lg:p-14 bg-white rounded-[16px] md:rounded-[24px] lg:rounded-[32px] shadow-md flex flex-col lg:flex-row gap-10 lg:gap-14">
        {secondpage ? (
          <form
            onSubmit={handleVerificationSubmit}
            className="flex flex-col gap-6 md:gap-10 lg:gap-14 w-full lg:w-1/2"
          >
            <div className="flex flex-col gap-4 md:gap-6">
              <button
                type="button"
                className="mb-3 md:mb-5"
                onClick={() => setSecondPage(false)}
              >
                <svg
                  width="16"
                  height="16"
                  className="md:w-11 md:h-11 lg:w-16 lg:h-16"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.434 17.3333L17.9007 24.8L16.0007 26.6666L5.33398 16L16.0007 5.33331L17.9007 7.19998L10.434 14.6666H26.6673V17.3333H10.434Z"
                    fill="#3D3D3D"
                  />
                </svg>
              </button>
              <h1 className="text-[#1a0066] text-2xl md:text-3xl lg:text-4xl font-bold leading-8 md:leading-9 lg:leading-10">
                Verification
              </h1>
              <div className="flex flex-col gap-4 md:gap-6">
                <label className="text-[#5b5b5b] text-sm md:text-base font-semibold">
                  Enter the one-time password sent to your phone number
                </label>
                <input
                  type="text"
                  name="otp"
                  value={formData.otp}
                  onChange={handleChange}
                  placeholder="e.g. 123456"
                  className="h-10 md:h-12 px-3 md:px-4 bg-[#f4f4f4] rounded-lg text-[#5b5b5b]"
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full px-12 py-3 md:px-24 md:py-4 bg-[#5230b2] text-white text-lg md:text-2xl font-bold rounded-2xl"
            >
              Verify OTP
            </button>
            <p className="text-[#5b5b5b] text-sm md:text-base font-semibold">
              Incorrect number?{" "}
              <a className="text-primary cursor-pointer" onClick={goback}>
                Go back
              </a>
            </p>
          </form>
        ) : (
          <form
            onSubmit={handleLoginSubmit}
            className="flex flex-col gap-6 md:gap-8 lg:gap-11 w-full lg:w-1/2"
          >
            <div className="flex flex-col gap-4 md:gap-6">
              <h1 className="text-[#1a0066] text-2xl md:text-3xl lg:text-4xl font-bold leading-8 md:leading-9 lg:leading-10">
                Create account
              </h1>
              <div className="flex flex-wrap gap-4 md:gap-6">
                <div className="flex-1 flex flex-col gap-2">
                  <label className="text-[#5b5b5b] text-sm md:text-base font-semibold">
                    Enter your first name *
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="e.g. Raj"
                    className="h-10 md:h-12 px-3 md:px-4 bg-[#f4f4f4] rounded-lg text-[#5b5b5b]"
                    required
                  />
                </div>
                <div className="flex-1 flex flex-col gap-2">
                  <label className="text-[#5b5b5b] text-sm md:text-base font-semibold">
                    Enter your last name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="e.g. Sharma"
                    className="h-10 md:h-12 px-3 md:px-4 bg-[#f4f4f4] rounded-lg text-[#5b5b5b]"
                  />
                </div>
              </div>
              <div className="flex flex-wrap gap-4 md:gap-6">
                <div className="flex-1 flex flex-col gap-2">
                  <label className="text-[#5b5b5b] text-sm md:text-base font-semibold">
                    Phone Number *
                  </label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="e.g. 9876543210"
                    className="h-10 md:h-12 px-3 md:px-4 bg-[#f4f4f4] rounded-lg text-[#5b5b5b]"
                    required
                  />
                </div>
                <div className="flex-1 flex flex-col gap-2">
                  <label className="text-[#5b5b5b] text-sm md:text-base font-semibold">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="e.g. Raj@1234mail.com"
                    className="h-10 md:h-12 px-3 md:px-4 bg-[#f4f4f4] rounded-lg text-[#5b5b5b]"
                    required
                  />
                </div>
              </div>
              <div className="flex flex-wrap gap-4 md:gap-6">
                <div className="flex-1 flex flex-col gap-2">
                  <label className="text-[#5b5b5b] text-sm md:text-base font-semibold">
                    Company Name
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="e.g. Raj Industries Pvt. Ltd."
                    className="h-10 md:h-12 px-3 md:px-4 bg-[#f4f4f4] rounded-lg text-[#5b5b5b]"
                  />
                </div>
              </div>
              <div className="flex flex-wrap gap-4 md:gap-6">
                <div className="flex-1 flex flex-col gap-2">
                  <label className="text-[#5b5b5b] text-sm md:text-base font-semibold">
                    State
                  </label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    placeholder="e.g. Uttar Pradesh"
                    className="h-10 md:h-12 px-3 md:px-4 bg-[#f4f4f4] rounded-lg text-[#5b5b5b]"
                  />
                </div>
                <div className="flex-1 flex flex-col gap-2">
                  <label className="text-[#5b5b5b] text-sm md:text-base font-semibold">
                    Pincode
                  </label>
                  <input
                    type="number"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                    placeholder="e.g. 123456"
                    className="h-10 md:h-12 px-3 md:px-4 bg-[#f4f4f4] rounded-lg text-[#5b5b5b]"
                  />
                </div>
              </div>
            </div>
            <p className="text-[#5b5b5b] text-sm md:text-base font-semibold">
              Already have an account?{" "}
              <a href="/sign-in" className="text-primary cursor-pointer" onClick={goback}>
                Login
              </a>
            </p>
            <button
              type="submit"
              className="w-full px-12 py-3 md:px-24 md:py-4 bg-[#5230b2] flex justify-center text-white text-lg md:text-2xl font-bold rounded-2xl"
            >
              {loading ? (
                <>
                  Sending OTP
                  <div
                    className="w-5 h-5 border-2 border-white border-t-transparent mt-1 ml-2 rounded-full animate-spin"
                    aria-label="Loading"
                  ></div>
                </>
              ) : (
                "Create Account"
              )}
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="w-full px-12 py-3 md:px-24 md:py-4 border-2 border-[#5230b2] text-[#5230b2] hover:bg-secondary text-lg md:text-2xl font-semibold rounded-2xl"
            >
              Cancel
            </button>
          </form>
        )}

        <div className="flex-1 rounded-3xl flex items-center justify-center">
          <div className="relative w-full h-[50vh] md:h-[65vh] lg:h-[85vh]">
            <div className="absolute w-full h-full bg-hero-pattern bg-cover rounded-3xl"></div>
          </div>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
};

export default LoginPage;
