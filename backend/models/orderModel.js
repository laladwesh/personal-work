const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user: { type: Object, required: true }, // Reference to User
  orderDetails: {
    bindingtype: Object,
    gsm: Object,
    papersize: Object,
    printcolour: Object,
  },
  address: { type: Object, required: true }, // Store the full address object
  service: { type: String, required: true }, // Store the service name
  totalPrice: { type: Number, required: true }, // Total price of the order
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Order", orderSchema);
