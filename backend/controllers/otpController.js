import otpGenerator from 'otp-generator';
import OTP from '../models/otpModel.js';
import User from '../models/userModel.js';

/**
 * Handles sending OTP for new user signup.
 * - Creates a new unverified user if one doesn't exist.
 * - Prevents sending OTP if the user is already verified.
 * - Generates a unique OTP and saves it to the database.
 */
export const sendOTP = async (req, res) => {
  try {
    // Extract required fields from the request body
    const { email, firstName, lastName, phone, company, state, pincode } = req.body;

    // 1. Check if the user already exists
    let user = await User.findOne({ email });

    // 2. If user is verified, block further OTP requests (user already registered)
    if (user && user.isVerified) {
      return res.status(401).json({
        success: false,
        message: 'User is already registered and verified',
      });
    }

    // 3. If user does not exist, create a new unverified user record
    if (!user) {
      user = await User.create({
        email,
        firstName,
        lastName,
        phone,
        company,
        state,
        pincode,
        isVerified: false, // Initially unverified
      });
    }

    // 4. Generate a 6-digit numeric OTP (no alphabets or special characters)
    let otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    // 5. Ensure the generated OTP is unique in the database (no collisions)
    let existingOtp = await OTP.findOne({ otp });
    while (existingOtp) {
      otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      });
      existingOtp = await OTP.findOne({ otp });
    }

    // 6. Save the OTP to the database (linked to the user's email)
    await OTP.create({ email, otp });

    // 7. Respond to the client (send OTP in response only for testing, remove in production)
    res.status(200).json({
      success: true,
      message: 'OTP sent successfully',
      otp, // ⚠️ Remove this line in production!
    });
  } catch (error) {
    // Handle errors (log for debugging)
    console.error(error.message);
    res.status(500).json({
      success: false,
      message: 'An error occurred while sending OTP',
      error: error.message,
    });
  }
};

/**
 * Handles sending OTP for login (existing users).
 * - Ensures only verified users can request login OTPs.
 * - Generates and saves a new OTP, triggers email sending (via model hook).
 */
export const sendLoginOTP = async (req, res) => {
  try {
    const { email } = req.body;

    // 1. Check if the user exists in the database
    const user = await User.findOne({ email });

    // 2. If user doesn't exist, prompt to sign up first
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found. Please sign up first.',
      });
    }

    // 3. Block login OTP requests if user isn't verified
    if (!user.isVerified) {
      return res.status(403).json({
        success: false,
        message: 'User is not verified. Please complete the signup process.',
      });
    }

    // 4. Generate a new 6-digit numeric OTP for login
    const otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    // 5. Save the OTP to the database (assumes a pre-save hook sends the email)
    await OTP.create({ email, otp });

    // 6. Respond to the client (do NOT send the OTP itself)
    res.status(200).json({
      success: true,
      message: 'OTP sent successfully. Please check your email.',
    });
  } catch (error) {
    // Log and handle server errors
    console.error("Error in sendLoginOTP:", error.message);
    res.status(500).json({
      success: false,
      message: 'An error occurred while sending OTP',
      error: error.message,
    });
  }
};
