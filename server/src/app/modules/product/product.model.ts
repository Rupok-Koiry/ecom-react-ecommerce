import { Schema, model } from 'mongoose';

const productSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
  inventory: { type: Number, default: 0 },
  images: [{ type: String }],
  discount: { type: Number, default: 0 },
  shop: { type: Schema.Types.ObjectId, ref: 'Shop', required: true },
  vendor: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  averageRating: { type: Number, default: 0 },
  ratingsCount: { type: Number, default: 0 },
});

const Product = model('Product', productSchema);
export default Product;
