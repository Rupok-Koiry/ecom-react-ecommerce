import { Schema, model } from 'mongoose';
const transactionSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    shop: { type: Schema.Types.ObjectId, ref: 'Shop', required: true },
    amount: { type: Number, required: true },
  },
  {
    timestamps: true,
  },
);

const Transaction = model('Transaction', transactionSchema);
export default Transaction;
