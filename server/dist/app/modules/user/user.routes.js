"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_controller_1 = require("./user.controller");
const router = express_1.default.Router();
// User Routes
router.get('/profile', (0, auth_1.default)('user', 'vendor', 'admin'), user_controller_1.getUserProfile);
router.patch('/profile', (0, auth_1.default)('user', 'vendor', 'admin'), user_controller_1.updateUserProfile);
router.post('/follow/:shopId', (0, auth_1.default)('user'), user_controller_1.followShop);
router.delete('/unfollow/:shopId', (0, auth_1.default)('user'), user_controller_1.unfollowShop);
router.get('/', (0, auth_1.default)('admin'), user_controller_1.getAllUsers);
router.patch('/:userId/ban', (0, auth_1.default)('admin'), user_controller_1.banUser);
router.delete('/:id', (0, auth_1.default)('admin'), user_controller_1.deleteUser);
exports.default = router;
