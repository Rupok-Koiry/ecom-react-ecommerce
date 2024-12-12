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
exports.deleteReview = exports.updateReview = exports.createReview = exports.getVendorReviews = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const review_model_1 = __importDefault(require("./review.model"));
const product_model_1 = __importDefault(require("../product/product.model"));
// Helper Function: Update Product Ratings
const updateProductRatings = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    const reviews = yield review_model_1.default.find({ product: productId });
    const totalRatings = reviews.reduce((sum, review) => sum + review.rating, 0);
    const product = yield product_model_1.default.findById(productId);
    if (product) {
        product.averageRating = reviews.length ? totalRatings / reviews.length : 0;
        product.ratingsCount = reviews.length;
        yield product.save();
    }
});
exports.getVendorReviews = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield product_model_1.default.find({
            vendor: req.user.userId,
        });
        const reviews = yield review_model_1.default.find({
            product: { $in: products.map((product) => product._id) },
        }).populate('user product');
        res.status(http_status_1.default.OK).json({
            success: true,
            statusCode: http_status_1.default.OK,
            message: `Shop reviews retrieved successfully`,
            data: reviews,
        });
    }
    catch (error) {
        next(error);
    }
}));
// Create Review
exports.createReview = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { productId } = req.params;
    const { rating, comment } = req.body;
    // Ensure rating is within valid range
    if (rating < 1 || rating > 5) {
        return next(new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Rating must be between 1 and 5.'));
    }
    // Create review
    const review = yield review_model_1.default.create({
        user: req.user.userId,
        product: productId,
        rating,
        comment,
    });
    // Update product ratings
    yield updateProductRatings(productId);
    res.status(http_status_1.default.CREATED).json({
        success: true,
        statusCode: http_status_1.default.CREATED,
        message: 'Review created successfully.',
        data: review,
    });
}));
// Update Review
exports.updateReview = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { reviewId } = req.params;
    const { rating, comment } = req.body;
    // Ensure rating is within valid range
    if (rating && (rating < 1 || rating > 5)) {
        return next(new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Rating must be between 1 and 5.'));
    }
    const review = yield review_model_1.default.findOne({
        _id: reviewId,
        user: req.user.userId,
    });
    if (!review) {
        return next(new AppError_1.default(http_status_1.default.NOT_FOUND, 'Review not found or you are not authorized.'));
    }
    review.rating = rating !== null && rating !== void 0 ? rating : review.rating;
    review.comment = comment !== null && comment !== void 0 ? comment : review.comment;
    yield review.save();
    // Update product ratings
    yield updateProductRatings(review.product.toString());
    res.status(http_status_1.default.OK).json({
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Review updated successfully.',
        data: review,
    });
}));
// Delete Review
exports.deleteReview = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { reviewId } = req.params;
    const review = yield review_model_1.default.findById(reviewId);
    if (!review) {
        return next(new AppError_1.default(http_status_1.default.NOT_FOUND, 'Review not found.'));
    }
    yield review.deleteOne();
    // Update product ratings
    yield updateProductRatings(review.product.toString());
    res.status(http_status_1.default.OK).json({
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Review deleted successfully.',
    });
}));
