"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const coupon_controller_1 = require("./coupon.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const router = express_1.default.Router();
// Coupon Routes
router.post('/', (0, auth_1.default)('admin'), coupon_controller_1.createCoupon);
router.get('/', (0, auth_1.default)('admin'), coupon_controller_1.getAllCoupons);
router.get('/:couponId', (0, auth_1.default)('admin'), coupon_controller_1.getCouponDetails);
router.patch('/:couponId', (0, auth_1.default)('admin'), coupon_controller_1.updateCoupon);
router.delete('/:couponId', (0, auth_1.default)('admin'), coupon_controller_1.deleteCoupon);
exports.default = router;
