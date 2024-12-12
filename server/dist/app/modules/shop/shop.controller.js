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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.blacklistShop = exports.getShopFollowers = exports.getShopProducts = exports.deleteShop = exports.updateShop = exports.getShopDetails = exports.getVendorShop = exports.createShop = void 0;
const http_status_1 = __importDefault(require("http-status"));
const handlerFactory_1 = require("../../utils/handlerFactory");
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const shop_model_1 = __importDefault(require("./shop.model"));
const product_model_1 = __importDefault(require("../product/product.model"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
// Create a shop
exports.createShop = (0, handlerFactory_1.createOne)(shop_model_1.default);
// Get all shops
exports.getVendorShop = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const shops = yield shop_model_1.default.findOne({
        vendor: req.user.userId,
    });
    res.status(http_status_1.default.OK).json({
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Shops retrieved successfully',
        data: shops,
    });
}));
// Get shop details
exports.getShopDetails = (0, handlerFactory_1.getOne)(shop_model_1.default, 'vendor');
// Update a shop
exports.updateShop = (0, handlerFactory_1.updateOne)(shop_model_1.default);
// Delete a shop
exports.deleteShop = (0, handlerFactory_1.deleteOne)(shop_model_1.default);
// Get all products for a specific shop
exports.getShopProducts = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { shopId } = req.params;
    const _a = req.query, { page = 1, limit = 100 } = _a, filters = __rest(_a, ["page", "limit"]);
    const products = yield product_model_1.default.find(Object.assign({ shop: shopId }, filters))
        .skip((+page - 1) * +limit)
        .limit(+limit);
    const total = yield product_model_1.default.countDocuments(Object.assign({ shop: shopId }, filters));
    res.status(http_status_1.default.OK).json({
        success: true,
        statusCode: http_status_1.default.OK,
        message: `Products retrieved successfully for shop ${shopId}`,
        data: products,
        pagination: {
            total,
            page: +page,
            limit: +limit,
        },
    });
}));
// Get shop followers
exports.getShopFollowers = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { shopId } = req.params;
    const shop = yield shop_model_1.default.findById(shopId).populate('followers', 'name email');
    if (!shop) {
        return next(new AppError_1.default(404, 'Shop not found'));
    }
    res.status(http_status_1.default.OK).json({
        success: true,
        statusCode: http_status_1.default.OK,
        message: `Followers retrieved successfully for shop ${shopId}`,
        data: shop.followers,
    });
}));
// Blacklist a shop
exports.blacklistShop = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { shopId } = req.params;
    const shop = yield shop_model_1.default.findById(shopId);
    if (!shop) {
        return next(new AppError_1.default(404, 'Shop not found'));
    }
    shop.isBlacklisted = true;
    yield shop.save();
    res.status(http_status_1.default.OK).json({
        success: true,
        statusCode: http_status_1.default.OK,
        message: `Shop ${shopId} has been blacklisted.`,
    });
}));
