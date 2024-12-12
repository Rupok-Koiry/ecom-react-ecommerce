"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategory = exports.updateCategory = exports.getCategoryDetails = exports.getAllCategories = exports.createCategory = void 0;
const category_model_1 = __importDefault(require("./category.model"));
const handlerFactory_1 = require("../../utils/handlerFactory");
exports.createCategory = (0, handlerFactory_1.createOne)(category_model_1.default);
exports.getAllCategories = (0, handlerFactory_1.getAll)(category_model_1.default);
exports.getCategoryDetails = (0, handlerFactory_1.getOne)(category_model_1.default);
exports.updateCategory = (0, handlerFactory_1.updateOne)(category_model_1.default);
exports.deleteCategory = (0, handlerFactory_1.deleteOne)(category_model_1.default);
