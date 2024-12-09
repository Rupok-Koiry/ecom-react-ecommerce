import { Schema, model } from 'mongoose';
const transactionSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    shop: { type: Schema.Types.ObjectId, ref: 'Shop', required: true },
    products: [{ type: Schema.Types.ObjectId, ref: 'Product', required: true }],
    amount: { type: Number, required: true },
    status: {
      type: String,
      enum: ['pending', 'success', 'failed'],
      default: 'pending',
    },
    tran_id: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

const Transaction = model('Transaction', transactionSchema);
export default Transaction;
