import mongoose from 'mongoose';

// Schema to define the structure of each material used in a service
const materialSchema = new mongoose.Schema({
  // The category/type of the material (e.g., Printcolour, Papersize)
  category: {
    type: String,
    required: true,
    enum: ["Printcolour", "Papersize", "Gsm", "Bindingtype"], // Allowed values for category
  },
  // Name of the material (e.g., "A4", "Glossy")
  name: {
    type: String,
    required: true,
  },
  // Optional description for additional details about the material
  description: {
    type: String,
    default: "",
  },
  // Price for the material (can be 0 by default)
  price: {
    type: Number,
    default: 0,
  },
});

// Schema to define the structure of each service
const serviceSchema = new mongoose.Schema({
  // Name of the service (must be unique)
  name: {
    type: String,
    required: true, // e.g., "idxx"
    unique: true,
  },
  // Array of image URLs associated with the service
  imageUrls: {
    type: [String], // List of image URLs
    required: true,
    validate: [(val) => val.length > 0, "At least one image URL is required"], // Must have at least one image
  },
  // Array of materials used/offered in the service
  materials: {
    type: [materialSchema], // Uses the materialSchema defined above
    required: true,
    validate: [(val) => val.length > 0, "At least one material is required"], // Must have at least one material
  },
  // Timestamp of when the service was created
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create the Service model based on the serviceSchema
const Service = mongoose.model('Service', serviceSchema);

export default Service;
