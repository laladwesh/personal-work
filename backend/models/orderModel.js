import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  user: { type: Object, required: true }, // Reference to User
  orderDetails: {
    bindingtype: { type: Object, required: true },
    gsm: { type: Object, required: true },
    papersize: { type: Object, required: true },
    printcolour: { type: Object, required: true },
  },
  address: { type: Object, required: true }, // Store the full address object
  service: { type: String, required: true }, // Store the service name
  totalPrice: { type: Number, required: true }, // Total price of the order
  createdAt: { type: Date, default: Date.now },
});

const Order = mongoose.model('Order', orderSchema);
export default Order;
