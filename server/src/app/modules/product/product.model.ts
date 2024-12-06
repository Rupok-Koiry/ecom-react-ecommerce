import { Schema, model } from 'mongoose';

const productSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
  images: [{ type: String }],
  inventoryCount: { type: Number, required: true },
  discount: { type: Number, default: 0 },
  shop: { type: Schema.Types.ObjectId, ref: 'Shop', required: true },
  averageRating: { type: Number, default: 0 },
  ratingsCount: { type: Number, default: 0 },
});

const Product = model('Product', productSchema);
export default Product;
