import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useOrder } from "../context/order";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserContext } from "../context/user";
import AddressCard from "../components/AddressCard";

const AddressPage = () => {
  const steps = [
    { label: "Requirements", path: "/price" },
    { label: "Address", path: "/address" },
    { label: "Payment", path: "" },
    { label: "Confirmation", path: "" },
  ];
  const order = useOrder();
  const navigate = useNavigate();
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAddingNew, setIsAddingNew] = useState(false); // Tracks if the "Add New Address" form is open
  const [tempSelectedAddress, setTempSelectedAddress] = useState(null); // Tracks the previous address before opening the form
  const location = useLocation();
  const userContext = useContext(UserContext);

  const handleError = () => {
    toast.error(error, {
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
  const fetchAddresses = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch user's email from userContext
      const email = userContext?.user.email;
      if (!email) {
        throw new Error("User email is missing.");
      }

      // Make a POST request to the API
      const response = await fetch("http://localhost:4000/api/v1/getaddress", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch addresses.");
      }

      // Update the state with the fetched addresses
      setAddresses(data.data || []);
      if (data.data && data.data.length > 0) {
        setSelectedAddress(data.data[0]._id); // Assuming each address has a unique `_id`
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch addresses on component mount
  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch user's email from userContext
        const email = userContext?.user.email;
        if (!email) {
          throw new Error("User email is missing.");
        }

        // Make a POST request to the API
        const response = await fetch(
          "http://localhost:4000/api/v1/getaddress",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email }),
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch addresses.");
        }

        // Update the state with the fetched addresses
        setAddresses(data.data || []);
        if (data.data && data.data.length > 0) {
          setSelectedAddress(data.data[0]._id); // Assuming each address has a unique `_id`
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchAddresses();
  }, [userContext.user]);

  // Handle saving the new address
  const handleSaveNewAddress = async (e) => {
    e.preventDefault(); // Prevent the form from reloading the page

    try {
      // Construct the payload for the backend
      const payload = {
        email: userContext?.user.email, // Get email from the user context
        firstname: formData.firstName,
        lastname: formData.lastName,
        pinCode: formData.pincode,
        address: formData.address,
        city: formData.city,
        landmark: formData.landmark,
        state: formData.state,
        phoneNumber: formData.phoneNumber,
        alternatePhoneNumber: formData.alternatePhoneNumber,
      };

      // Make a POST request to save the new address
      const response = await fetch("http://localhost:4000/api/v1/addaddress", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to save address.");
      }

      // Reset the form and close the add new address form
      setFormData({
        firstName: "",
        lastName: "",
        pincode: "",
        address: "",
        city: "",
        landmark: "",
        state: "",
        phoneNumber: "",
        alternatePhoneNumber: "",
      });
      setIsAddingNew(false);

      // Fetch the updated list of addresses
      await fetchAddresses();
      handleSuccess("Address saved successfully.");
    } catch (err) {
      handleError();
      console.error("Error saving address:", err.message);
      setError(err.message);
    }
  };

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    pincode: "",
    address: "",
    city: "",
    landmark: "",
    state: "",
    phoneNumber: "",
    alternatePhoneNumber: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle canceling the new address
  const handleCancelNewAddress = () => {
    setIsAddingNew(false);
    setSelectedAddress(tempSelectedAddress); // Reselect the previously selected address
  };

  return (
    <div className="flex flex-col lg:flex-row px-4 md:px-16 lg:px-28 gap-8 bg-gray-100 font-montserrat">
      {/* Left Section */}
      <div className="bg-white shadow-xl w-full lg:w-3/5 rounded-3xl px-6 md:px-12 lg:px-16 py-8 md:py-16">
        <div className="px-3">
          <div className="flex flex-wrap items-center space-x-2">
            {steps.map((step, index) => (
              <div key={step.path} className="flex items-center">
                <span
                  className={`text-sm md:text-base font-medium font-['Montserrat'] leading-none ${
                    location.pathname === step.path
                      ? "text-[#5230b2]"
                      : "text-[#3d3d3d]"
                  }`}
                >
                  <a href={step.path}>{step.label}</a>
                </span>
                {index < steps.length - 1 && (
                  <span className="mx-2 text-[#3d3d3d]">{">"}</span>
                )}
              </div>
            ))}
          </div>
          <div className="text-[#1a0066] text-3xl md:text-5xl font-bold font-['Montserrat'] my-6 md:my-10 leading-8 md:leading-10">
            Address
          </div>
          <hr className="border-t-2 border-[#3d3d3d] my-4" />
          <div className="text-[#3d3d3d] text-lg md:text-2xl font-bold font-['Montserrat']">
            Select delivery address
          </div>
        </div>

        <div className="w-full flex-grow mt-8 md:mt-10">
          {/* Existing Address Cards */}
          {addresses.map((address) => (
            <AddressCard
              key={address._id}
              type="Type"
              address={`${address.address}, ${address.city}, ${address.state}, ${address.pinCode}`}
              phoneNumber={address.phoneNumber}
              alternatePhoneNumber={address.alternatePhoneNumber}
              selected={selectedAddress === address._id}
              onSelect={() => setSelectedAddress(address._id)}
            />
          ))}

          {/* Add New Address Button */}
          {!isAddingNew && (
            <div
              className="border-2 rounded-3xl p-4 mb-4 cursor-pointer border-gray-300"
              onClick={() => {
                setTempSelectedAddress(selectedAddress);
                setIsAddingNew(true);
              }}
            >
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600 font-medium">
                  <strong>+ Add New Address</strong>
                </div>
                <input
                  type="radio"
                  name="address"
                  className="mr-2 accent-primary"
                  checked={isAddingNew}
                  readOnly
                />
              </div>
            </div>
          )}

          {/* Add New Address Form */}
          {isAddingNew && (
            <div className="border-2 rounded-3xl p-4 md:p-8 mb-4 border-primary ring-2 ring-purple-200">
              <div className="text-lg font-bold text-primary mb-4">
                Add new address
              </div>
              <form
                onSubmit={handleSaveNewAddress}
                className="flex flex-col gap-4 md:gap-6 w-full"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-[#5b5b5b] text-sm md:text-base font-semibold">
                      First Name *
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="e.g. Raj"
                      className="h-10 md:h-12 px-3 bg-[#f4f4f4] rounded-lg text-sm md:text-base text-[#5b5b5b]"
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[#5b5b5b] text-sm md:text-base font-semibold">
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="e.g. Sharma"
                      className="h-10 md:h-12 px-3 bg-[#f4f4f4] rounded-lg text-sm md:text-base text-[#5b5b5b]"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-[#5b5b5b] text-sm md:text-base font-semibold">
                      Pincode *
                    </label>
                    <input
                      type="text"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleChange}
                      placeholder="e.g. 123456"
                      className="h-10 md:h-12 px-3 bg-[#f4f4f4] rounded-lg text-sm md:text-base text-[#5b5b5b]"
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[#5b5b5b] text-sm md:text-base font-semibold">
                      Address *
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="e.g. 1564, Ishwar Nagar Market"
                      className="h-10 md:h-12 px-3 bg-[#f4f4f4] rounded-lg text-sm md:text-base text-[#5b5b5b]"
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-[#5b5b5b] text-sm md:text-base font-semibold">
                      City/District/Town *
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="e.g. Delhi"
                      className="h-10 md:h-12 px-3 bg-[#f4f4f4] rounded-lg text-sm md:text-base text-[#5b5b5b]"
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[#5b5b5b] text-sm md:text-base font-semibold">
                      Landmark
                    </label>
                    <input
                      type="text"
                      name="landmark"
                      value={formData.landmark}
                      onChange={handleChange}
                      placeholder="e.g. Near India Gate"
                      className="h-10 md:h-12 px-3 bg-[#f4f4f4] rounded-lg text-sm md:text-base text-[#5b5b5b]"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-[#5b5b5b] text-sm md:text-base font-semibold">
                      State *
                    </label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      placeholder="e.g. Uttar Pradesh"
                      className="h-10 md:h-12 px-3 bg-[#f4f4f4] rounded-lg text-sm md:text-base text-[#5b5b5b]"
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[#5b5b5b] text-sm md:text-base font-semibold">
                      Phone Number *
                    </label>
                    <input
                      type="text"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      placeholder="e.g. 9876543210"
                      className="h-10 md:h-12 px-3 bg-[#f4f4f4] rounded-lg text-sm md:text-base text-[#5b5b5b]"
                      required
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-4 mt-6">
                  <button
                    type="button"
                    onClick={handleCancelNewAddress}
                    className="w-full md:w-auto px-6 py-3 bg-white border border-primary text-primary rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="w-full md:w-auto px-6 py-3 bg-primary text-white rounded-lg"
                  >
                    Save this address
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>

      {/* Right Section */}
      <div className="w-full lg:w-2/5 space-y-6">
        <div className="shadow-xl rounded-3xl px-4 md:px-12 lg:px-11 py-8 bg-white">
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
        <button
          type="button"
          onClick={() => navigate("/payment")}
          className="w-full px-6 py-4 bg-primary text-white text-lg font-bold rounded-lg hover:bg-purple-800 transition"
        >
        {loading ? "Loading..." : "Next"}
        </button>
        <ToastContainer />
      </div>
    </div>
  );
};

export default AddressPage;
