import { Schema, model } from 'mongoose';

const orderSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  products: [
    {
      product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
      quantity: { type: Number, required: true },
    },
  ],
  totalPrice: { type: Number, required: true },
  paymentStatus: {
    type: String,
    enum: ['pending', 'completed', 'failed'],
    default: 'pending',
  },
  shop: {
    type: Schema.Types.ObjectId,
    ref: 'Shop',
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
});
const Order = model('Order', orderSchema);
export default Order;
