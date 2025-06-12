import express from 'express';
// Import controller functions for each route
import { 
  signup, 
  signin, 
  loginotp, 
  updateUser, 
  getAddress, 
  addAddress, 
  getServiceById, 
  getMaterialsByCategory, 
  newOrder 
} from '../controllers/authController.js';

// Create a new Express router instance
const router = express.Router();

// Route for user signup (registration)
router.post('/signup', signup);

// Route for user signin (login with password)
router.post('/signin', signin);

// Route for login via OTP
router.post('/login-otp', loginotp);

// Route for updating user information
router.put('/update-user', updateUser);

// Route to get a user's address
router.post('/getaddress', getAddress);

// Route to add a new address for a user
router.post('/addaddress', addAddress);

// Route to get a service by its ID
router.get('/services/:id', getServiceById);

// Route to get materials by service ID and category
router.get('/materials/:id/:category', getMaterialsByCategory);

// Route to place a new order
router.post('/new-order', newOrder);

// Export the configured router for use in your app
export default router;
