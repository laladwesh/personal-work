// routes/otpRoutes.js
import express from 'express';
import { sendOTP, sendLoginOTP } from '../controllers/otpController.js';

const router = express.Router();

router.post('/send-otp', sendOTP);
router.post('/send-login-otp', sendLoginOTP);

export default router;
