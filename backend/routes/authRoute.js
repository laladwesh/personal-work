// routes/authRoutes.js
const express = require('express');
const authController = require('../controllers/authController');
const Service = require('../models/serviceModel');
const router = express.Router();

router.post('/signup', authController.signup);
router.post('/signin', authController.signin);
router.post('/login-otp', authController.loginotp);
router.put('/update-user', authController.updateUser);
router.post('/getaddress', authController.getAddress);
router.post('/addaddress', authController.addAddress);
router.get("/services/:id", authController.getServiceById);
router.get("/materials/:id/:category", authController.getMaterialsByCategory);


  
module.exports = router;