const mongoose = require('mongoose');

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

module.exports = mongoose.model('User', userSchema);
