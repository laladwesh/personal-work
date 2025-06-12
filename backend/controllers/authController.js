// controllers/authController.js
import bcrypt from 'bcrypt';
import User from '../models/userModel.js';
import OTP from '../models/otpModel.js';
import Address from '../models/addressModel.js';
import Service from '../models/serviceModel.js';
import Order from '../models/orderModel.js';

export const signup = async (req, res) => {
  try {
    const { email ,  otp } = req.body;
    // Validate request body
    if (!email || !otp) {
      return res.status(403).json({
        success: false,
        message: 'Email and OTP are required',
      });
    }
    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User doesn't exist. Please request an OTP first.",
      });
    }

    // Verify the OTP
    const existingOtp = await OTP.findOne({ email, otp });
    if (!existingOtp) {
      return res.status(400).json({
        success: false,
        message: 'Invalid or expired OTP',
      });
    }
    // Mark the user as verified
    user.isVerified = true;
    await user.save();

    // Delete all OTPs for the user
    await OTP.deleteMany({ email });

    res.status(200).json({
      success: true,
      message: 'User verified successfully',
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      success: false,
      message: 'An error occurred while verifying the user',
      error: error.message,
    });
  }
};

export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Check if all details are provided
    if (!email || !password) {
      return res.status(403).json({
        success: false,
        message: "All fields are required",
      });
    }
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({
        success: false,
        message: "User doesn't exists",
      });
    }
    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordValid) {
      return res.status(400).json({
        success: false,
        message: "Invalid password",
      });
    }
    return res.status(200).json({
      success: true,
      message: "User logged in successfully",
      user: existingUser,
    });
  } catch (error) {}
};

export const updateUser = async (req, res) => {
  const { email, firstName, lastName, phone, company, state, pincode } = req.body;

  try {
    const user = await User.findOneAndUpdate(
      { email }, // Find user by email
      { firstName, lastName, phone, company, state, pincode }, // Update fields
      { new: true } // Return updated document
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User updated successfully", user });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const loginotp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    // Validate request body
    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: 'Email and OTP are required',
      });
    }

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User doesn't exist. Please sign up first.",
      });
    }

    // Check if the user is already verified
    if (!user.isVerified) {
      return res.status(403).json({
        success: false,
        message: 'User is not verified. Please complete the signup process.',
      });
    }

    // Verify the OTP
    const existingOtp = await OTP.findOne({ email, otp });
    if (!existingOtp) {
      return res.status(400).json({
        success: false,
        message: 'Invalid or expired OTP',
      });
    }

    // Delete the OTP after verification
    await OTP.deleteMany({ email });

    // Return the full user data
    res.status(200).json({
      success: true,
      message: 'Login successful!',
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        company: user.company,
        state: user.state,
        pincode: user.pincode,
      },
    });
  } catch (error) {
    console.error('Error during login OTP verification:', error.message);
    res.status(500).json({
      success: false,
      message: 'An error occurred during login OTP verification.',
      error: error.message,
    });
  }
};

export const getAddress = async (req, res) => {
  try {
    const { email } = req.body;

    // Validate request body
    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email is required',
      });
    }

    // Check if the user exists
    const user = await User.findOne({ email }); // Assuming User is defined elsewhere in your code
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User doesn't exist. Please sign up first.",
      });
    }

    // Fetch the user's addresses using the `user` field
    const addresses = await Address.find({ user: user._id }); // `user` refers to the `ref` in your schema

    // If no addresses are found
    if (!addresses || addresses.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No addresses found for the given user.',
      });
    }

    // Return the addresses
    res.status(200).json({
      success: true,
      data: addresses,
    });
  } catch (error) {
    console.error('Error fetching address:', error.message);
    res.status(500).json({
      success: false,
      message: 'An error occurred while fetching the address.',
      error: error.message,
    });
  }
};


export const addAddress = async (req, res) => {
  try {
    const {
      email,
      firstname,
      lastname,
      pinCode,
      address,
      city,
      landmark,
      state,
      phoneNumber,
      alternatePhoneNumber,
    } = req.body;

    // Validate required fields
    if (!email || !firstname || !pinCode || !address || !city || !state || !phoneNumber) {
      return res.status(400).json({
        success: false,
        message: "All required fields (email, firstname, pinCode, address, city, state, phoneNumber) must be provided.",
      });
    }

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User doesn't exist. Please sign up first.",
      });
    }

    // Create a new address
    const newAddress = new Address({
      user: user._id, // Use the user's ID for the `user` reference
      firstname,
      lastname,
      pinCode,
      address,
      city,
      landmark,
      state,
      phoneNumber,
      alternatePhoneNumber,
    });

    // Save the address to the database
    const savedAddress = await newAddress.save();

    // Return the saved address
    res.status(201).json({
      success: true,
      message: "Address saved successfully.",
      data: savedAddress,
    });
  } catch (error) {
    console.error("Error saving address:", error.message);
    res.status(500).json({
      success: false,
      message: "An error occurred while saving the address.",
      error: error.message,
    });
  }
};
export const getServiceById = async (req, res) => {
  try {
    const { id } = req.params;

    // Fetch the service by name (not _id)
    const service = await Service.findOne({ name: id });

    if (!service) {
      return res.status(404).json({
        success: false,
        message: `No service found with name: ${id}`,
      });
    }

    // Return imageUrls from the service
    res.status(200).json({
      success: true,
      slides: service.imageUrls, // Send only the imageUrls array as `slides`
    });
  } catch (error) {
    console.error("Error fetching service images:", error.message);
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching service images.",
      error: error.message,
    });
  }
}
export const getMaterialsByCategory = async (req, res) => {
  try {
    const { id, category } = req.params;

    const formattedCategory = category
      .toLowerCase() // Ensure it's lowercase
      .replace(/(^\w|\s\w)/g, (c) => c.toUpperCase()); // Capitalize first letter of each word

    // Fetch the service by name
    const service = await Service.findOne({ name: id }); // Use the `name` field instead of `_id`

    if (!service) {
      return res.status(404).json({
        success: false,
        message: `No service found with name: ${id}`,
      });
    }

    // Filter materials by category
    const materials = service.materials.filter(
      (material) => material.category === formattedCategory
    );

    // Return response
    if (materials.length === 0) {
      return res.status(404).json({
        success: false,
        message: `No materials found for category: ${formattedCategory} in service with name: ${id}`,
      });
    }

    res.status(200).json({
      success: true,
      data: materials,
    });
  } catch (error) {
    console.error("Error fetching materials:", error.message);
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching materials.",
      error: error.message,
    });
  }
}
export const newOrder = async (req, res) => {
  try {
    const { user, orderDetails, ordAddress, serviceName } = req.body;

    // Fetch the address from the database using the address ID
    const address = await Address.findOne({ _id: ordAddress });
    const useri = await User.findOne({ email: user.email });

    if (!address) {
      return res.status(404).json({ message: "Address not found." });
    }

    let totalPrice = 0;
    if (orderDetails) {
      Object.values(orderDetails).forEach((item) => {
        if (item.price) {
          totalPrice += item.price;
        }
      });
    }

    // Create the new order
    const newOrder = new Order({
      user:useri, // Associate the order with the user
      orderDetails,
      address, // Use the fetched address
      service: serviceName, // Save the service name
      totalPrice,
    });

    const savedOrder = await newOrder.save();

    res.status(201).json({ success: true, orderId: savedOrder._id });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ message: "Internal server error." });
  }
}