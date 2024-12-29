const otpGenerator = require('otp-generator');
const OTP = require('../models/otpModel');
const User = require('../models/userModel');

exports.sendOTP = async (req, res) => {
  try {
    const { email, firstName, lastName, phone, company, state, pincode } = req.body;

    // Check if the user already exists
    let user = await User.findOne({ email });

    // If the user is verified, block further OTP requests
    if (user && user.isVerified) {
      return res.status(401).json({
        success: false,
        message: 'User is already registered and verified',
      });
    }

    // If user doesn't exist, create an unverified user
    if (!user) {
      user = await User.create({
        email,
        firstName,
        lastName,
        phone,
        company,
        state,
        pincode,
        isVerified: false, // Mark as unverified initially
      });
    }

    // Generate a unique OTP
    let otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    // Ensure OTP is unique in the database
    let existingOtp = await OTP.findOne({ otp });
    while (existingOtp) {
      otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      });
      existingOtp = await OTP.findOne({ otp });
    }

    // Save the OTP to the database
    await OTP.create({ email, otp });

    res.status(200).json({
      success: true,
      message: 'OTP sent successfully',
      otp, // Include OTP for testing purposes; remove in production
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      success: false,
      message: 'An error occurred while sending OTP',
      error: error.message,
    });
  }
};

exports.sendLoginOTP = async (req, res) => {
  try {
    const { email } = req.body;

    // Check if the user exists
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found. Please sign up first.',
      });
    }

    // If the user is not verified, block login attempts
    if (!user.isVerified) {
      return res.status(403).json({
        success: false,
        message: 'User is not verified. Please complete the signup process.',
      });
    }

    // Generate a unique OTP
    const otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    // Save the OTP to the database (pre-save hook sends the email)
    await OTP.create({ email, otp });

    // Response back to the client
    res.status(200).json({
      success: true,
      message: 'OTP sent successfully. Please check your email.',
    });
  } catch (error) {
    console.error("Error in sendLoginOTP:", error.message);
    res.status(500).json({
      success: false,
      message: 'An error occurred while sending OTP',
      error: error.message,
    });
  }
};


