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
exports.getPaymentMetrics = exports.getOrderMetrics = exports.getModelCounts = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const order_model_1 = __importDefault(require("../order/order.model"));
const product_model_1 = __importDefault(require("../product/product.model"));
const shop_model_1 = __importDefault(require("../shop/shop.model"));
const user_model_1 = __importDefault(require("../user/user.model"));
exports.getModelCounts = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userCount = yield user_model_1.default.countDocuments();
    const products = req.user.role === 'admin'
        ? yield product_model_1.default.find({}).select('_id')
        : yield product_model_1.default.find({ vendor: req.user.userId }).select('_id');
    const orderCount = req.user.role === 'admin'
        ? yield order_model_1.default.countDocuments()
        : yield order_model_1.default.countDocuments({
            products: {
                $elemMatch: {
                    product: { $in: products.map((product) => product._id) },
                },
            },
        });
    const incomeResult = req.user.role === 'admin'
        ? yield order_model_1.default.aggregate([
            { $match: { status: 'success' } },
            { $group: { _id: null, totalEarning: { $sum: '$totalPrice' } } },
        ])
        : yield order_model_1.default.aggregate([
            {
                $match: {
                    status: 'success',
                    products: {
                        $elemMatch: {
                            product: { $in: products.map((product) => product._id) },
                        },
                    },
                },
            },
            { $group: { _id: null, totalEarning: { $sum: '$totalPrice' } } },
        ]);
    const totalEarning = incomeResult.length > 0 ? incomeResult[0].totalEarning : 0;
    res.json({
        userCount,
        productCount: products.length,
        orderCount,
        totalEarning,
    });
}));
exports.getOrderMetrics = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const endDate = new Date();
    const startDate = new Date(endDate);
    startDate.setDate(startDate.getDate() - 29);
    let shop = null;
    if (req.user.role !== 'admin') {
        shop = yield shop_model_1.default.findOne({ vendor: req.user.userId }).select('_id');
        if (!shop) {
            return res.status(404).json({ message: 'Shop not found' });
        }
    }
    // Build match conditions dynamically
    const matchConditions = {
        createdAt: { $gte: startDate, $lte: endDate },
    };
    if (req.user.role !== 'admin' && shop) {
        matchConditions.shop = shop._id;
    }
    // Aggregate orders by creation date
    const orders = yield order_model_1.default.aggregate([
        {
            $match: matchConditions,
        },
        {
            $group: {
                _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
                orderCount: { $sum: 1 },
            },
        },
    ]);
    const orderMap = new Map(orders.map((order) => [order._id, order.orderCount]));
    // Prepare the result with all three datasets
    const resultData = Array.from({ length: 30 }, (_, i) => {
        const date = new Date(startDate);
        date.setDate(date.getDate() + i);
        const dateString = date.toISOString().split('T')[0];
        return {
            date: dateString,
            orderCount: orderMap.get(dateString) || 0,
        };
    });
    res.json(resultData);
}));
exports.getPaymentMetrics = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const endDate = new Date();
    const startDate = new Date(endDate);
    startDate.setDate(startDate.getDate() - 29);
    let shop = null;
    if (req.user.role !== 'admin') {
        shop = yield shop_model_1.default.findOne({ vendor: req.user.userId }).select('_id');
        if (!shop) {
            return res.status(404).json({ message: 'Shop not found' });
        }
    }
    // Build match conditions dynamically
    const matchConditions = {
        createdAt: { $gte: startDate, $lte: endDate },
        status: 'success', // Match the enum value for successful orders
    };
    if (req.user.role !== 'admin' && shop) {
        matchConditions.shop = shop._id;
    }
    // Aggregate payments
    const payments = yield order_model_1.default.aggregate([
        {
            $match: matchConditions,
        },
        {
            $group: {
                _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
                totalAmount: { $sum: '$totalPrice' }, // Sum totalPrice
            },
        },
    ]);
    const paymentMap = new Map(payments.map((payment) => [payment._id, payment.totalAmount]));
    const paymentData = Array.from({ length: 30 }, (_, i) => {
        const date = new Date(startDate);
        date.setDate(date.getDate() + i);
        const dateString = date.toISOString().split('T')[0];
        return {
            date: dateString,
            totalAmount: paymentMap.get(dateString) || 0,
        };
    });
    res.json(paymentData);
}));
