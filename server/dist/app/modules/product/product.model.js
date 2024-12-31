"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const productSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    category: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Category', required: true },
    inventory: { type: Number, default: 0 },
    images: [{ type: String }],
    discount: { type: Number, default: 0 },
    shop: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Shop', required: true },
    vendor: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    averageRating: { type: Number, default: 0 },
    ratingsCount: { type: Number, default: 0 },
});
const Product = (0, mongoose_1.model)('Product', productSchema);
exports.default = Product;
