import express from 'express';
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

const router = express.Router();

router.post('/signup', signup);
router.post('/signin', signin);
router.post('/login-otp', loginotp);
router.put('/update-user', updateUser);
router.post('/getaddress', getAddress);
router.post('/addaddress', addAddress);
router.get("/services/:id", getServiceById);
router.get("/materials/:id/:category", getMaterialsByCategory);
router.post("/new-order", newOrder);

export default router;
