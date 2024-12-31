"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductReviews = exports.duplicateProduct = exports.deleteProduct = exports.updateProduct = exports.getProductDetails = exports.getAllProducts = exports.createProduct = void 0;
const handlerFactory_1 = require("../../utils/handlerFactory");
const http_status_1 = __importDefault(require("http-status"));
const product_model_1 = __importDefault(require("./product.model"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const review_model_1 = __importDefault(require("../review/review.model"));
const apiFeatures_1 = __importDefault(require("../../utils/apiFeatures"));
// Controller for creating a product
exports.createProduct = (0, handlerFactory_1.createOne)(product_model_1.default);
// Controller for getting all products
exports.getAllProducts = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Initialize API features
        const features = new apiFeatures_1.default(product_model_1.default.find(), req.query).filter();
        // Clone the query for counting documents
        const totalCounts = yield product_model_1.default.countDocuments(features.query.getFilter());
        // Populate and paginate data
        features.query = features
            .sort()
            .limitFields()
            .paginate()
            .query.populate('shop category');
        // Execute the final query
        const doc = yield features.query;
        // Send response
        res.status(http_status_1.default.OK).json({
            success: true,
            statusCode: http_status_1.default.OK,
            message: `${product_model_1.default.modelName} retrieved successfully`,
            data: {
                totalCounts,
                doc,
            },
        });
    }
    catch (error) {
        next(error);
    }
}));
// Controller for getting product details
exports.getProductDetails = (0, handlerFactory_1.getOne)(product_model_1.default, 'shop category');
// Controller for updating a product
exports.updateProduct = (0, handlerFactory_1.updateOne)(product_model_1.default);
// Controller for deleting a product
exports.deleteProduct = (0, handlerFactory_1.deleteOne)(product_model_1.default);
// Controller for duplicating a product
exports.duplicateProduct = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { productId } = req.params;
    const product = yield product_model_1.default.findById(productId);
    if (!product) {
        return next(new AppError_1.default(http_status_1.default.NOT_FOUND, 'Product not found.'));
    }
    // Duplicate the product details
    const duplicatedProduct = yield product_model_1.default.create(Object.assign(Object.assign({}, product.toObject()), { _id: undefined, name: `${product.name} (Duplicate)` }));
    res.status(http_status_1.default.CREATED).json({
        success: true,
        statusCode: http_status_1.default.CREATED,
        message: 'Product duplicated successfully.',
        data: duplicatedProduct,
    });
}));
// Controller for getting reviews for a specific product
exports.getProductReviews = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { productId } = req.params;
    const reviews = yield review_model_1.default.find({ product: productId }).populate('user', 'name profilePic');
    res.status(http_status_1.default.OK).json({
        success: true,
        statusCode: http_status_1.default.OK,
        message: `Reviews retrieved successfully for product ${productId}`,
        data: reviews,
    });
}));
