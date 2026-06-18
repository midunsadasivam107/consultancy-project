const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema(
  {
    productId: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    quantity: { type: Number, required: true, min: 1 },
    subtotal: { type: Number, required: true, min: 0 },
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    userSnapshot: {
      name: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String, default: '' },
      role: { type: String, required: true },
    },
    items: { type: [orderItemSchema], required: true, validate: [(arr) => arr.length > 0, 'At least one item is required'] },
    totalAmount: { type: Number, required: true, min: 0 },
    status: { type: String, default: 'placed', enum: ['placed', 'processing', 'completed'] },
    payment: {
      method: { type: String, enum: ['cod', 'razorpay'], default: 'cod' },
      status: { type: String, enum: ['pending', 'paid', 'failed'], default: 'pending' },
      razorpayOrderId: { type: String, default: '' },
      razorpayPaymentId: { type: String, default: '' },
      razorpaySignature: { type: String, default: '' },
      amountPaid: { type: Number, default: 0, min: 0 },
      currency: { type: String, default: 'INR' },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema);
