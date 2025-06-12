import mongoose from 'mongoose';

// Define the Address schema to store user address information
const addressSchema = new mongoose.Schema({
  // Reference to the user (as a String ID, should ideally be mongoose.Schema.Types.ObjectId)
  user: {
    type: String,         // Typically ObjectId, but String here (change to ObjectId if possible)
    required: true,
    ref: 'User',          // References the User collection
  },

  // User's first name (required)
  firstname: {
    type: String,
    required: true,
  },

  // User's last name (optional)
  lastname: {
    type: String,
  },

  // 6-digit pincode/postal code (required)
  pinCode: {
    type: Number,
    required: true,
  },

  // Main address string (required)
  address: {
    type: String,
    required: true,
  },

  // City name (required)
  city: {
    type: String,
    required: true,
  },

  // Optional landmark (like 'Near Park', etc.)
  landmark: {
    type: String,
  },

  // State name (required)
  state: {
    type: String,
    required: true,
  },

  // Main phone number (required)
  phoneNumber: {
    type: Number,
    default: 0,
    required: true,
  },

  // Optional alternate phone number
  alternatePhoneNumber: {
    type: Number,
    default: 0,
  },

  // Timestamp when the address was created (auto-set to now)
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create the Address model from the schema
const Address = mongoose.model('Address', addressSchema);

export default Address;
