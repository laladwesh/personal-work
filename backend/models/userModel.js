import mongoose from 'mongoose';

// Schema to define the structure of user documents in the database
const userSchema = new mongoose.Schema({
  // User's first name
  firstName: String,

  // User's last name
  lastName: String,

  // User's email address (must be unique and required)
  email: {
    type: String,
    required: true,
    unique: true,
  },

  // User's phone number (optional)
  phone: String,

  // Name of the company the user belongs to (optional)
  company: String,

  // User's state (optional)
  state: String,

  // User's pincode or postal code (optional)
  pincode: String,

  // Indicates if the user's email is verified (defaults to false)
  isVerified: {
    type: Boolean,
    default: false,
  },

  // Hashed password for the user (optional)
  password: String,
});

// Create the User model from the schema
const User = mongoose.model('User', userSchema);

export default User;
