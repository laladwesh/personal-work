const mongoose = require('mongoose');
const mailSender = require('../utils/mailSender');

const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 60 * 5, // 5 minutes expiration
  },
});

// Function to send verification email
async function sendVerificationEmail(email, otp) {
  try {
    const mailResponse = await mailSender(
      email,
      "Verification Email",
      `<h1>Please confirm your OTP</h1>
       <p>Here is your OTP code: <strong>${otp}</strong></p>`
    );
    //console.log("Email sent successfully: ", mailResponse);
  } catch (error) {
    console.error("Error occurred while sending email: ", error.message);
    throw error; // Rethrow the error to handle it in the pre-save hook
  }
}

// Pre-save hook to send email when document is created
otpSchema.pre("save", async function (next) {
  //console.log("New document saved to the database");
  if (this.isNew) {
    try {
      await sendVerificationEmail(this.email, this.otp);
    } catch (error) {
      console.error("Error in pre-save hook: ", error.message);
      return next(error); // Pass the error to Mongoose
    }
  }
  next();
});

module.exports = mongoose.model("OTP", otpSchema);
