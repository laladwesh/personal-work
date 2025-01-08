import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: { type: String, required: true, unique: true },
  phone: String,
  company: String,
  state: String,
  pincode: String,
  isVerified: { type: Boolean, default: false }, // Add this field
  password: String, 
});

const User = mongoose.model('User', userSchema);
export default User;
