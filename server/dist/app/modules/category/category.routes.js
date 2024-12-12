"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const category_controller_1 = require("./category.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const router = express_1.default.Router();
// Category Management
router.get('/', category_controller_1.getAllCategories);
router.post('/', (0, auth_1.default)('admin'), category_controller_1.createCategory);
router.patch('/:categoryId', (0, auth_1.default)('admin'), category_controller_1.updateCategory);
router.delete('/:categoryId', (0, auth_1.default)('admin'), category_controller_1.deleteCategory);
exports.default = router;
