"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const order_controller_1 = require("./order.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const router = express_1.default.Router();
// Order Routes
router.post('/', (0, auth_1.default)('user'), order_controller_1.placeOrder);
router.get('/', (0, auth_1.default)('admin'), order_controller_1.getAllOrders);
router.get('/users', (0, auth_1.default)('user'), order_controller_1.getUserOrders);
router.get('/:orderId', (0, auth_1.default)('user', 'vendor', 'admin'), order_controller_1.getOrderDetails);
router.get('/vendor/:shopId', (0, auth_1.default)('vendor'), order_controller_1.getVendorOrders);
exports.default = router;
