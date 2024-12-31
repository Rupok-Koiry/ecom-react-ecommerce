"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const shop_controller_1 = require("./shop.controller");
const router = express_1.default.Router();
// Shop Routes
router.post('/', (0, auth_1.default)('vendor'), shop_controller_1.createShop);
router.get('/', shop_controller_1.getAllShops);
router.get('/vendor-shop', (0, auth_1.default)('vendor'), shop_controller_1.getVendorShop);
router.get('/:id', shop_controller_1.getShopDetails);
router.patch('/:id', (0, auth_1.default)('vendor'), shop_controller_1.updateShop);
router.delete('/:shopId', (0, auth_1.default)('vendor'), shop_controller_1.deleteShop);
router.get('/:shopId/products', shop_controller_1.getShopProducts);
router.get('/:shopId/followers', (0, auth_1.default)('vendor'), shop_controller_1.getShopFollowers);
router.patch('/:shopId/blacklist', (0, auth_1.default)('admin'), shop_controller_1.blacklistShop);
exports.default = router;
