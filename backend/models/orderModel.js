import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  user: { type: Object, required: true },
  orderDetails: {
    bindingtype: { type: Object, required: true },
    gsm: { type: Object, required: true },
    papersize: { type: Object, required: true },
    printcolour: { type: Object, required: true },
  },
  address: { type: Object, required: true },
  service: { type: String, required: true },
  totalPrice: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Order = mongoose.model('Order', orderSchema);
export default Order;
