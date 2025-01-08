import mongoose from 'mongoose';

const addressSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
    ref: 'User',
  },
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
  },
  pinCode: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  landmark: {
    type: String,
  },
  state: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: Number,
    default: 0,
    required: true,
  },
  alternatePhoneNumber: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Address = mongoose.model('Address', addressSchema);
export default Address;
