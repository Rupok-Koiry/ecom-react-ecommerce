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
exports.getVendorOrders = exports.getUserOrders = exports.getOrderDetails = exports.placeOrder = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const order_model_1 = __importDefault(require("./order.model"));
const shop_model_1 = __importDefault(require("../shop/shop.model"));
// Place a new order
exports.placeOrder = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { products, totalAmount, shippingAddress, shopId } = req.body;
    if (!products || products.length === 0) {
        return next(new AppError_1.default(400, 'Order must have at least one product'));
    }
    const order = yield order_model_1.default.create({
        user: req.user.userId,
        products,
        totalAmount,
        shippingAddress,
        shop: shopId,
    });
    res.status(201).json({
        success: true,
        statusCode: 201,
        message: 'Order placed successfully',
        data: order,
    });
}));
// Get details of a specific order
exports.getOrderDetails = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { orderId } = req.params;
    const order = yield order_model_1.default.findById(orderId)
        .populate('products.product shop')
        .populate('user', 'name email');
    if (!order) {
        return next(new AppError_1.default(404, 'Order not found'));
    }
    // Allow only the order's user, vendor of the shop, or admin to view
    if ((req.user.role === 'user' &&
        order.user._id.toString() !== req.user.userId) ||
        (req.user.role === 'vendor' &&
            //@ts-expect-error eslint-disable-next-line
            order.shop.vendor.toString() !== req.user.userId)) {
        return next(new AppError_1.default(403, 'You are not authorized to view this order'));
    }
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: 'Order details retrieved successfully',
        data: order,
    });
}));
exports.getUserOrders = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { page = 1, limit = 10 } = req.query;
    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);
    const skip = (pageNumber - 1) * limitNumber;
    const orders = yield order_model_1.default.find({ user: req.user.userId })
        .populate('products.product shop')
        .skip(skip)
        .limit(limitNumber);
    const totalOrders = yield order_model_1.default.countDocuments({ user: req.user.userId });
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: 'User orders retrieved successfully',
        data: {
            orders,
            totalOrders,
        },
    });
}));
exports.getVendorOrders = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { shopId } = req.params;
    const { page = 1, limit = 10 } = req.query;
    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit);
    const skip = (pageNumber - 1) * limitNumber;
    // Verify that the shop belongs to the vendor
    const shop = yield shop_model_1.default.findById(shopId);
    if (!shop || shop.vendor.toString() !== req.user.userId) {
        return next(new AppError_1.default(403, 'You are not authorized to view orders for this shop'));
    }
    const orders = yield order_model_1.default.find({ shop: shopId })
        .populate('products.product')
        .skip(skip)
        .limit(limitNumber);
    const totalOrders = yield order_model_1.default.countDocuments({ shop: shopId });
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: 'Vendor orders retrieved successfully',
        data: {
            orders,
            totalOrders,
        },
    });
}));
