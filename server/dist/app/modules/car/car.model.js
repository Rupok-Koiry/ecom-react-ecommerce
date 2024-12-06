"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const carSchema = new mongoose_1.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
    },
    images: {
        type: [String],
        required: true,
    },
    description: {
        type: String,
        trim: true,
        required: true,
    },
    color: {
        type: String,
        trim: true,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['available', 'unavailable'],
        default: 'available',
    },
    features: {
        type: [String],
        default: [],
    },
    pricePerHour: {
        type: Number,
        required: true,
    },
}, {
    timestamps: true,
});
const Car = (0, mongoose_1.model)('Car', carSchema);
exports.default = Car;
