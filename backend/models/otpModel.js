import mongoose from 'mongoose';
import mailSender from '../utils/mailSender.js';

// Define the OTP schema for storing OTPs for email verification
const otpSchema = new mongoose.Schema({
  // Email associated with the OTP
  email: {
    type: String,
    required: true,
  },
  // The actual OTP code sent to the user
  otp: {
    type: String,
    required: true,
  },
  // Time when the OTP was created, with auto-expiry after 5 minutes
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 60 * 5, // Document will automatically be deleted after 5 minutes
  },
});

// Function to send the verification email to the user
async function sendVerificationEmail(email, otp) {
  try {
    // Call the utility function to send email with OTP
    const mailResponse = await mailSender(
      email,
      "Verification Email",
      `<h1>Please confirm your OTP</h1>
       <p>Here is your OTP code: <strong>${otp}</strong></p>`
    );
    // You can log the mail response if needed for debugging
    // console.log("Email sent successfully: ", mailResponse);
  } catch (error) {
    // Log any error and rethrow it to be handled in the pre-save hook
    console.error("Error occurred while sending email: ", error.message);
    throw error; // This will make the save operation fail if mail sending fails
  }
}

// Pre-save Mongoose hook: Runs before saving a new OTP document
otpSchema.pre("save", async function (next) {
  // Only send email when creating a new document, not on updates
  if (this.isNew) {
    try {
      // Attempt to send the OTP email
      await sendVerificationEmail(this.email, this.otp);
    } catch (error) {
      // If email sending fails, pass the error to Mongoose
      console.error("Error in pre-save hook: ", error.message);
      return next(error);
    }
  }
  // Continue with save operation
  next();
});

// Create the OTP model from the schema
const OTP = mongoose.model("OTP", otpSchema);

export default OTP;
