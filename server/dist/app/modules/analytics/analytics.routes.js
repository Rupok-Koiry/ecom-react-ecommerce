"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const analytics_controller_1 = require("./analytics.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const router = express_1.default.Router();
// Updated routes for clarity and consistency
router.route('/model-counts').get((0, auth_1.default)('admin', 'vendor'), analytics_controller_1.getModelCounts);
router.route('/order-metrics').get((0, auth_1.default)('admin', 'vendor'), analytics_controller_1.getOrderMetrics);
router
    .route('/payment-metrics')
    .get((0, auth_1.default)('admin', 'vendor'), analytics_controller_1.getPaymentMetrics);
exports.default = router;
