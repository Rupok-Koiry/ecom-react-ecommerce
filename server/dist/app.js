"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const errorHandler_1 = __importDefault(require("./app/middlewares/errorHandler"));
const notFound_1 = __importDefault(require("./app/middlewares/notFound"));
const routes_1 = __importDefault(require("./app/routes"));
const mongoose_1 = __importDefault(require("mongoose"));
const app = (0, express_1.default)();
// Middleware for parsing JSON bodies
app.use(express_1.default.json());
// Middleware for parsing cookies
app.use((0, cookie_parser_1.default)());
// Middleware for enabling Cross-Origin Resource Sharing (CORS) for specified origins
app.use((0, cors_1.default)({
    origin: [
        'http://localhost:5173',
        'https://ph-assignment-09-btl9.vercel.app',
    ],
}));
// Route handlers for API endpoints prefixed with /api/v1
app.use('/api', routes_1.default);
app.use('/api/model-counts', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Run all the count queries and calculate total earnings concurrently using Promise.all
        const [productCount, userCount, orderCount, totalEarning] = yield Promise.all([
            mongoose_1.default.model('Product').countDocuments().exec(),
            mongoose_1.default.model('User').countDocuments().exec(),
            mongoose_1.default.model('Order').countDocuments().exec(),
            mongoose_1.default
                .model('Order')
                .aggregate([
                { $match: { status: 'success' } },
                { $group: { _id: null, totalEarning: { $sum: '$totalPrice' } } },
            ])
                .exec(),
        ]);
        // Extract totalEarning value (it will be an array with one object)
        const totalEarningValue = totalEarning.length > 0 ? totalEarning[0].totalEarning : 0;
        // Send the counts and total earnings in the response
        res.json({
            productCount,
            userCount,
            orderCount,
            totalEarning: totalEarningValue,
        });
    }
    catch (error) {
        // Handle any errors that occur during the queries
        res.status(500).json({
            message: 'Error fetching model counts and total earnings',
            error: error.message,
        });
    }
}));
// Middleware for handling global errors
app.use(errorHandler_1.default);
// Middleware for handling 404 - Not Found errors
app.use(notFound_1.default);
exports.default = app;
