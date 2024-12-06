import { Schema, model } from 'mongoose';

const shopSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  vendor: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  followers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  isBlacklisted: { type: Boolean, default: false },
});

const Shop = model('Shop', shopSchema);
export default Shop;
