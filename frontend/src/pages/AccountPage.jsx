import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/user";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useOrder } from "../context/order";
const AccountPage = () => {
  const orderContext = useOrder();
  const navigate = useNavigate();
  const userContext = useContext(UserContext);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (!userContext.user) {
      navigate(-1);
    } else {
      setFormData(userContext.user);
    }
  }, [userContext.user, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSuccess = (message) => {
    toast.success(message, {
      position: "top-right",
      autoClose: 5000,
      className: "custom-toast",
      progressClassName: "custom-progress",
    });
  };
  const handleLogout = async () => {
    try {
      // Clear user session from context
      userContext.setUser(null);
      orderContext.setOrder(null);

      // Optionally, clear session storage or local storage
      localStorage.removeItem("token"); // Remove token if stored in local storage
      sessionStorage.removeItem("token"); // If stored in session storage

      // Display a logout success message
      handleSuccess("You have been logged out.");

      // Add a small delay to ensure the toast displays before navigating
      setTimeout(() => {
        navigate("/sign-up");
      }, 1000);
    } catch (error) {
      console.error("Error during logout:", error);
      toast.error("An error occurred during logout. Please try again.", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent page reload

    try {
      const response = await fetch("http://localhost:4000/api/v1/update-user", {
        method: "PUT", // Use PUT or POST based on your backend setup
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData), // Send form data as JSON
      });

      const data = await response.json();

      if (response.ok) {
         console.log("Data saved successfully:", data);

        // Update the user context with the updated data
        userContext.setUser(data.updatedUser || formData); // Ensure the backend sends updated user info
        handleSuccess("Your changes have been saved.");
      } else {
        console.error("Error saving data:", data.message);
        alert("Failed to save changes: " + (data.message || "Unknown error"));
      }
    } catch (error) {
      console.error("Error occurred while saving data:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="px-4 md:px-8 lg:px-16 xl:px-28 bg-gray-100 font-montserrat min-h-screen">
      <div className="w-full p-6 md:p-10 lg:p-14 bg-white rounded-[32px] shadow-md flex flex-col gap-14">
        <form onSubmit={handleSubmit} className="flex flex-col gap-10 w-full">
          <div className="flex flex-col gap-6">
            <h1 className="text-[#1a0066] text-3xl md:text-4xl font-bold leading-10">
              My Account
            </h1>
            <hr className="border-t-2 border-primary my-4" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* First Name */}
              <div className="flex flex-col gap-2 relative">
                <label className="text-[#5b5b5b] text-sm md:text-base font-semibold">
                  First name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="e.g. Raj"
                    className="h-12 px-4 bg-[#f4f4f4] rounded-lg text-[#5b5b5b] text-sm md:text-base w-full"
                    required
                  />
                  <img
                    src="icon.png"
                    className="w-8 h-8 absolute right-3 top-1/2 transform -translate-y-1/2"
                    alt="Edit Icon"
                  />
                </div>
              </div>
              {/* Last Name */}
             <div className="flex flex-col gap-2 relative">
                <label className="text-[#5b5b5b] text-sm md:text-base font-semibold">
                  Last name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="e.g. Sharma"
                    className="h-12 px-4 bg-[#f4f4f4] rounded-lg text-[#5b5b5b] text-sm md:text-base w-full"
                    required
                  />
                  <img
                    src="icon.png"
                    className="w-8 h-8 absolute right-3 top-1/2 transform -translate-y-1/2"
                    alt="Edit Icon"
                  />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Phone Number */}
              <div className="flex flex-col gap-2 relative">
                <label className="text-[#5b5b5b] text-sm md:text-base font-semibold">
                  Phone number
                </label>
                <div className="relative">
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="e.g. 987654321"
                  className="h-12 px-4 bg-[#f4f4f4] rounded-lg text-[#5b5b5b] text-sm md:text-base w-full"
                  required
                />
                 <img
                    src="icon.png"
                    className="w-8 h-8 absolute right-3 top-1/2 transform -translate-y-1/2"
                    alt="Edit Icon"
                  />
                </div>
              </div>
              {/* Email */}
              <div className="flex flex-col gap-2 relative">
                <label className="text-[#5b5b5b] text-sm md:text-base font-semibold">
                  Email
                </label>
                <div className="relative">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="e.g. Raj1234@gmail.com"
                  className="h-12 px-4 bg-[#f4f4f4] rounded-lg text-[#5b5b5b] text-sm md:text-base w-full"
                  required
                />
                <img
                    src="icon.png"
                    className="w-8 h-8 absolute right-3 top-1/2 transform -translate-y-1/2"
                    alt="Edit Icon"
                  />
              </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
              {/* Company Name */}
              <div className="flex flex-col gap-2 col-span-full relative">
                <label className="text-[#5b5b5b] text-sm md:text-base font-semibold">
                  Company’s name
                </label>
                <div className="relative">
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="e.g. Raj Industries Pvt. Ltd."
                  className="h-12 px-4 bg-[#f4f4f4] rounded-lg text-[#5b5b5b] text-sm md:text-base w-full"
                />
                <img
                    src="icon.png"
                    className="w-8 h-8 absolute right-3 top-1/2 transform -translate-y-1/2"
                    alt="Edit Icon"
                  />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* State */}
              <div className="flex flex-col gap-2 relative">
                <label className="text-[#5b5b5b] text-sm md:text-base font-semibold">
                  State
                </label>
                <div className="relative">
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  placeholder="e.g. Maharashtra"
                  className="h-12 px-4 bg-[#f4f4f4] rounded-lg text-[#5b5b5b] text-sm md:text-base w-full"
                />
                <img
                    src="icon.png"
                    className="w-8 h-8 absolute right-3 top-1/2 transform -translate-y-1/2"
                    alt="Edit Icon"
                  />
                </div>
              </div>
              {/* Pincode */}
              <div className="flex flex-col gap-2 relative">
                <label className="text-[#5b5b5b] text-sm md:text-base font-semibold">
                  Pincode
                </label>
                <div className="relative">
                <input
                  type="number"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  placeholder="6-Digit code"
                  className="h-12 px-4 bg-[#f4f4f4] rounded-lg text-[#5b5b5b] text-sm md:text-base w-full"
                />
                <img
                    src="icon.png"
                    className="w-8 h-8 absolute right-3 top-1/2 transform -translate-y-1/2"
                    alt="Edit Icon"
                  />
                </div>
              </div>
            </div>
          </div>
          {/* Buttons */}
          <div className="flex flex-col md:flex-row justify-end gap-4">
            <button
              type="submit"
              className="w-full md:w-auto px-6 py-3 bg-[#5230b2] transition hover:bg-heading text-white text-sm md:text-base rounded-2xl"
            >
              Save Changes
            </button>
          </div>
          <div className="flex flex-col md:flex-row justify-end gap-4">
            <button
              onClick={handleLogout}
              className="w-full md:w-auto px-6 py-3 transition bg-[#fff] border-primary border-2 hover:bg-secondary text-primary text-sm md:text-base rounded-2xl"
            >
              Log Out
            </button>
          </div>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default AccountPage;
