"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCoupon = exports.updateCoupon = exports.getCouponDetails = exports.getAllCoupons = exports.createCoupon = void 0;
const coupon_model_1 = __importDefault(require("./coupon.model"));
const handlerFactory_1 = require("../../utils/handlerFactory");
exports.createCoupon = (0, handlerFactory_1.createOne)(coupon_model_1.default);
exports.getAllCoupons = (0, handlerFactory_1.getAll)(coupon_model_1.default);
exports.getCouponDetails = (0, handlerFactory_1.getOne)(coupon_model_1.default);
exports.updateCoupon = (0, handlerFactory_1.updateOne)(coupon_model_1.default);
exports.deleteCoupon = (0, handlerFactory_1.deleteOne)(coupon_model_1.default);
