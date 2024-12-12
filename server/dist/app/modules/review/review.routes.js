"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const review_controller_1 = require("./review.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const router = express_1.default.Router();
// Review Routes
router.get('/', (0, auth_1.default)('vendor'), review_controller_1.getVendorReviews);
router.post('/:productId', (0, auth_1.default)('user'), review_controller_1.createReview);
router.patch('/:reviewId', (0, auth_1.default)('user'), review_controller_1.updateReview);
router.delete('/:reviewId', (0, auth_1.default)('vendor', 'admin'), review_controller_1.deleteReview);
exports.default = router;
