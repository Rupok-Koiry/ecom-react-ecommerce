"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const shopSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    image: { type: String },
    description: { type: String },
    vendor: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    followers: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'User' }],
    isBlacklisted: { type: Boolean, default: false },
}, {
    timestamps: true,
});
const Shop = (0, mongoose_1.model)('Shop', shopSchema);
exports.default = Shop;
