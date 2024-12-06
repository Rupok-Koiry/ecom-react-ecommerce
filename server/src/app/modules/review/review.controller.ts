import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import AppError from '../../errors/AppError';
import Review from './review.model';
import Product from '../product/product.model';
import { getAll } from '../../utils/handlerFactory';

// Helper Function: Update Product Ratings
const updateProductRatings = async (productId: string) => {
  const reviews = await Review.find({ product: productId });
  const totalRatings = reviews.reduce((sum, review) => sum + review.rating, 0);

  const product = await Product.findById(productId);
  if (product) {
    product.averageRating = reviews.length ? totalRatings / reviews.length : 0;
    product.ratingsCount = reviews.length;
    await product.save();
  }
};

// 1. Create Review
export const createReview = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { productId } = req.params;
    const { rating, comment } = req.body;

    // Ensure rating is within valid range
    if (rating < 1 || rating > 5) {
      return next(
        new AppError(httpStatus.BAD_REQUEST, 'Rating must be between 1 and 5.'),
      );
    }

    // Check if user already reviewed this product
    const existingReview = await Review.findOne({
      user: req.user.id,
      product: productId,
    });
    if (existingReview) {
      return next(
        new AppError(
          httpStatus.BAD_REQUEST,
          'You have already reviewed this product.',
        ),
      );
    }

    // Create review
    const review = await Review.create({
      user: req.user.id,
      product: productId,
      rating,
      comment,
    });

    // Update product ratings
    await updateProductRatings(productId);

    res.status(httpStatus.CREATED).json({
      success: true,
      statusCode: httpStatus.CREATED,
      message: 'Review created successfully.',
      data: review,
    });
  },
);

// 2. Get All Reviews for a Product
export const getReviewsForProduct = catchAsync(async (req: Request) => {
  const { productId } = req.params;
  req.query.product = productId;
  getAll(Review, 'user');
});

// 3. Update Review
export const updateReview = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { reviewId } = req.params;
    const { rating, comment } = req.body;

    // Ensure rating is within valid range
    if (rating && (rating < 1 || rating > 5)) {
      return next(
        new AppError(httpStatus.BAD_REQUEST, 'Rating must be between 1 and 5.'),
      );
    }

    const review = await Review.findOne({ _id: reviewId, user: req.user.id });
    if (!review) {
      return next(
        new AppError(
          httpStatus.NOT_FOUND,
          'Review not found or you are not authorized.',
        ),
      );
    }

    review.rating = rating ?? review.rating;
    review.comment = comment ?? review.comment;
    await review.save();

    // Update product ratings
    await updateProductRatings(review.product.toString());

    res.status(httpStatus.OK).json({
      success: true,
      statusCode: httpStatus.OK,
      message: 'Review updated successfully.',
      data: review,
    });
  },
);

// 4. Delete Review
export const deleteReview = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { reviewId } = req.params;

    const review = await Review.findById(reviewId);
    if (!review) {
      return next(new AppError(httpStatus.NOT_FOUND, 'Review not found.'));
    }

    // Check authorization
    if (req.user.role !== 'admin' && req.user.id !== review.user.toString()) {
      return next(
        new AppError(
          httpStatus.FORBIDDEN,
          'You are not authorized to delete this review.',
        ),
      );
    }

    await review.deleteOne();

    // Update product ratings
    await updateProductRatings(review.product.toString());

    res.status(httpStatus.OK).json({
      success: true,
      statusCode: httpStatus.OK,
      message: 'Review deleted successfully.',
    });
  },
);
