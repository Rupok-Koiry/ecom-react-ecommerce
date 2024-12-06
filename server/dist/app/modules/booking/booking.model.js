"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const bookingSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    car: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Car',
        required: true,
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
    },
    totalCost: {
        type: Number,
        default: 0,
    },
    isPaid: {
        type: Boolean,
        default: false,
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'cancelled', 'completed'],
        required: true,
        default: 'pending',
    },
}, {
    timestamps: true,
});
const Booking = (0, mongoose_1.model)('Booking', bookingSchema);
exports.default = Booking;
