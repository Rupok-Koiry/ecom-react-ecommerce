"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const orderSchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    products: [
        {
            product: {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: 'Product',
                required: true,
            },
            quantity: { type: Number, required: true },
        },
    ],
    totalPrice: { type: Number, required: true },
    status: {
        type: String,
        enum: ['pending', 'success', 'failed'],
        default: 'pending',
        lowercase: true,
    },
    shop: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Shop',
        required: true,
    },
    tran_id: { type: String, required: true },
}, {
    timestamps: true,
});
const Order = (0, mongoose_1.model)('Order', orderSchema);
exports.default = Order;
