import { Schema, model } from 'mongoose';

const couponSchema = new Schema({
  code: { type: String, required: true, unique: true },
  discount: { type: Number, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  shop: { type: Schema.Types.ObjectId, ref: 'Shop', required: true },
});
const Coupon = model('Coupon', couponSchema);
export default Coupon;
