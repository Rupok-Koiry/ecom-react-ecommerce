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
exports.deleteUser = exports.banUser = exports.getAllUsers = exports.unfollowShop = exports.followShop = exports.updateUserProfile = exports.getUserProfile = void 0;
const http_status_1 = __importDefault(require("http-status"));
const user_model_1 = __importDefault(require("./user.model"));
const shop_model_1 = __importDefault(require("../shop/shop.model"));
const mongoose_1 = require("mongoose");
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const handlerFactory_1 = require("../../utils/handlerFactory");
// Get the user's profile
exports.getUserProfile = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user.userId;
    const user = yield user_model_1.default.findById(userId);
    res.status(http_status_1.default.OK).json({
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'User retrieved successfully',
        data: user,
    });
}));
// Update the user's profile
exports.updateUserProfile = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user.userId;
    const user = yield user_model_1.default.findByIdAndUpdate(userId, req.body, {
        new: true,
        runValidators: true,
    });
    res.status(http_status_1.default.OK).json({
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'User updated successfully',
        data: user,
    });
}));
// Follow a shop
exports.followShop = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user.userId;
    const shopId = new mongoose_1.Types.ObjectId(req.params.shopId);
    const shop = yield shop_model_1.default.findById(shopId);
    if (!shop) {
        return next(new AppError_1.default(http_status_1.default.NOT_FOUND, 'Shop not found.'));
    }
    const user = yield user_model_1.default.findById(userId);
    if (user === null || user === void 0 ? void 0 : user.followedShops.includes(shopId.toString())) {
        return res.status(http_status_1.default.BAD_REQUEST).json({
            success: false,
            statusCode: http_status_1.default.BAD_REQUEST,
            message: 'You are already following this shop.',
        });
    }
    // Update relationships
    user === null || user === void 0 ? void 0 : user.followedShops.push(shopId.toString());
    shop.followers.push(userId);
    yield (user === null || user === void 0 ? void 0 : user.save());
    yield shop.save();
    res.status(http_status_1.default.OK).json({
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Shop followed successfully.',
    });
}));
// Unfollow a shop
exports.unfollowShop = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user.userId;
    const shopId = new mongoose_1.Types.ObjectId(req.params.shopId);
    const shop = yield shop_model_1.default.findById(shopId);
    if (!shop) {
        return next(new AppError_1.default(http_status_1.default.NOT_FOUND, 'Shop not found.'));
    }
    const user = yield user_model_1.default.findById(userId);
    if (!(user === null || user === void 0 ? void 0 : user.followedShops.includes(shopId.toString()))) {
        return res.status(http_status_1.default.BAD_REQUEST).json({
            success: false,
            statusCode: http_status_1.default.BAD_REQUEST,
            message: 'You are not following this shop.',
        });
    }
    // Update relationships
    user.followedShops = user.followedShops.filter((id) => id.toString() !== shopId.toString());
    shop.followers = shop.followers.filter((id) => id.toString() !== userId);
    yield user.save();
    yield shop.save();
    res.status(http_status_1.default.OK).json({
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Shop unfollowed successfully.',
    });
}));
// Get all users (supports pagination)
exports.getAllUsers = (0, handlerFactory_1.getAll)(user_model_1.default);
// Ban a user
exports.banUser = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    const user = yield user_model_1.default.findById(userId);
    if (!user) {
        return next(new AppError_1.default(http_status_1.default.NOT_FOUND, 'User not found.'));
    }
    user.isActive = false;
    yield user.save();
    res.status(http_status_1.default.OK).json({
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'User banned successfully.',
    });
}));
// Delete a user
exports.deleteUser = (0, handlerFactory_1.deleteOne)(user_model_1.default);
