import React, { useContext } from "react";
import { UserContext } from "../context/user";

const Navbar = () => {
  const userContext = useContext(UserContext); // Access the user context

  return (
    <div className="bg-gray-100 flex flex-col items-center px-4 sm:px-8 md:px-16 lg:px-28 py-4 md:py-8">
      {/* Navbar */}
      <div
        className={`min-h-[12vh] w-full bg-white rounded-lg shadow-md flex flex-col sm:flex-row justify-between items-center px-4 sm:px-6 py-3 sm:py-4`}
      >
        {/* Logo */}
        <div className="h-6 w-16 sm:w-20 bg-gray-300 rounded mb-4 sm:mb-0"></div>

        {/* Links */}
        <div className="font-montserrat flex flex-col sm:flex-row sm:space-x-6 text-gray-600 text-center sm:text-left space-y-3 sm:space-y-0">
          <a
            href="/contact"
            className="font-montserrat  hover:text-primary flex items-center transition-all"
          >
            Contact us
          </a>
          <a
            href="/about"
            className="hover:text-primary flex items-center transition-all"
          >
            About us
          </a>
          {userContext.user ? ( // Check if the user exists
          
            <a href="/my-acc" className="hover:text-primary transition-all">
              {userContext.user.firstName} {/* Render user's first name */}
            </a>
          ) : (
            <a
              href="/sign-up"
              className="hover:text-primary transition-all"
            >
              <button className="h-12 px-6 rounded-2xl font-montserrat border-primary border-2 hover:bg-secondary transition text-primary bg-transparent ">
              Login
          </button>
             
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
