import mongoose from 'mongoose';

const materialSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
    enum: ["Printcolour", "Papersize", "Gsm", "Bindingtype"], // Add all possible categories
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: "",
  },
  price: {
    type: Number,
    default: 0,
  },
});

const serviceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // e.g., "idxx"
    unique: true,
  },
  imageUrls: {
    type: [String], // Array of image URLs
    required: true,
    validate: [(val) => val.length > 0, "At least one image URL is required"],
  },
  materials: {
    type: [materialSchema], // Array of materials
    required: true,
    validate: [(val) => val.length > 0, "At least one material is required"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Service = mongoose.model('Service', serviceSchema);
export default Service;
