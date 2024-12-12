"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const product_controller_1 = require("./product.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const router = express_1.default.Router();
// Product Routes
router.post('/', (0, auth_1.default)('vendor'), product_controller_1.createProduct);
router.get('/', product_controller_1.getAllProducts);
router.get('/:id', product_controller_1.getProductDetails);
router.patch('/:id', (0, auth_1.default)('vendor'), product_controller_1.updateProduct);
router.delete('/:id', (0, auth_1.default)('vendor'), product_controller_1.deleteProduct);
router.post('/:productId/duplicate', (0, auth_1.default)('vendor'), product_controller_1.duplicateProduct);
router.get('/:productId/reviews', product_controller_1.getProductReviews);
exports.default = router;
