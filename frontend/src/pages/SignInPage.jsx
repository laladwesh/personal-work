import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserContext } from "../context/user";

const SignInPage = () => {
  const navigate = useNavigate();
  const userContext = useContext(UserContext);
  const [formData, setFormData] = useState({ email: "", otp: "" });
  const [secondPage, setSecondPage] = useState(false);
  const [loading, setLoading] = useState(false);

  // Redirect if user is already logged in
  useEffect(() => {
    if (userContext.user && userContext.user.email) {
      navigate("/"); // Redirect to home if already logged in
    }
  }, [userContext.user, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

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

  // Handle sending OTP
  const handleSendOTP = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:4000/api/v1/send-login-otp",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: formData.email }),
        }
      );

      const data = await response.json();

      if (data.success) {
        handleSuccess("OTP sent to your email!");
        setSecondPage(true); // Move to OTP verification page
      } else {
        handleError(data.message || "Failed to send OTP.");
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      handleError("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Handle verifying OTP and logging in
  const handleVerifyOTP = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("http://localhost:4000/api/v1/login-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: formData.email, otp: formData.otp }),
      });

      const data = await response.json();

      if (data.success) {
        // Update user context with full user data from the backend
        userContext.setUser(data.user);
        handleSuccess("Login successful!");
        navigate("/"); // Redirect to home
      } else {
        handleError(data.message || "OTP verification failed.");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      handleError("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-4 md:px-8 lg:px-16 xl:px-28 bg-gray-100 font-montserrat">
      <div className="w-full h-auto lg:h-[100vh] p-6 md:p-10 lg:p-14 bg-white rounded-[16px] md:rounded-[24px] lg:rounded-[32px] shadow-md flex flex-col lg:flex-row gap-10 lg:gap-14">
        {secondPage ? (
          <form
            onSubmit={handleVerifyOTP}
            className="flex flex-col gap-6 md:gap-10 lg:gap-14 w-full lg:w-1/2"
          >
            <h1 className="text-[#1a0066] text-2xl md:text-3xl lg:text-4xl font-bold leading-8 md:leading-9 lg:leading-10">
              Verify OTP
            </h1>
            <div className="flex flex-col gap-4 md:gap-6">
              <label className="text-[#5b5b5b] text-sm md:text-base font-semibold">
                Enter the one-time password sent to your email
              </label>
              <input
                type="text"
                name="otp"
                value={formData.otp}
                onChange={handleChange}
                placeholder="e.g. 123456"
                className="h-10 md:h-12 px-3 md:px-4 bg-[#f4f4f4] rounded-lg text-[#5b5b5b]"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full px-12 py-3 md:px-24 md:py-4 bg-[#5230b2] text-white text-lg md:text-2xl font-bold rounded-2xl"
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
          </form>
        ) : (
          <form
            onSubmit={handleSendOTP}
            className="flex flex-col gap-6 md:gap-10 lg:gap-14 w-full lg:w-1/2"
          >
            <h1 className="text-[#1a0066] text-2xl md:text-3xl lg:text-4xl font-bold leading-8 md:leading-9 lg:leading-10">
              Login
            </h1>
            <div className="flex flex-col gap-4 md:gap-6">
              <label className="text-[#5b5b5b] text-sm md:text-base font-semibold">
                Enter your email to receive a one-time password
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="e.g. johndoe@mail.com"
                className="h-10 md:h-12 px-3 md:px-4 bg-[#f4f4f4] rounded-lg text-[#5b5b5b]"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full px-12 py-3 md:px-24 mWd:py-4 bg-[#5230b2] flex justify-center text-white text-lg md:text-2xl font-bold rounded-2xl"
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
                "Send OTP"
              )}
            </button>
            <p className="text-[#5b5b5b] text-sm md:text-base font-semibold">
              Don’t have an account?
            </p>
            <button
              onClick={() => navigate("/sign-up")}
              className="w-full px-12 py-3 md:px-24 md:py-4 border-primary border-2 hover:bg-secondary bg-[#fff] text-primary text-lg md:text-2xl font-bold rounded-2xl"
            >
              Create Account
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

export default SignInPage;
