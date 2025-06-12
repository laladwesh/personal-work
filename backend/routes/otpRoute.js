// routes/otpRoutes.js

import express from 'express';
// Import controller functions for handling OTP requests
import { sendOTP, sendLoginOTP } from '../controllers/otpController.js';

// Create a new Express router instance
const router = express.Router();

// Route to send OTP for signup or registration
router.post('/send-otp', sendOTP);

// Route to send OTP for login (existing verified users)
router.post('/send-login-otp', sendLoginOTP);

// Export the router to use in your main app
export default router;
