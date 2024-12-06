import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import AppError from '../../errors/AppError';
import Review from './review.model';
import Product from '../product/product.model';

export const createReview = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { productId } = req.params;
    const { rating, comment } = req.body;

    // Check if the user has already reviewed this product
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

    // Create the review
    const review = await Review.create({
      user: req.user.id,
      product: productId,
      rating,
      comment,
    });

    // Update the product's average rating and count
    const product = await Product.findById(productId);
    if (!product) {
      return next(new AppError(httpStatus.NOT_FOUND, 'Product not found.'));
    }

    product.ratingsCount += 1;
    product.averageRating =
      (product.averageRating * (product.ratingsCount - 1) + rating) /
      product.ratingsCount;

    await product.save();

    res.status(httpStatus.CREATED).json({
      success: true,
      statusCode: httpStatus.CREATED,
      message: 'Review created successfully.',
      data: review,
    });
  },
);

// @desc    Get all reviews for a product
// @route   GET /api/v1/reviews/:productId
// @access  Public
export const getReviewsForProduct = catchAsync(
  async (req: Request, res: Response) => {
    const { productId } = req.params;

    const reviews = await Review.find({ product: productId }).populate(
      'user',
      'name email',
    );

    res.status(httpStatus.OK).json({
      success: true,
      statusCode: httpStatus.OK,
      message: 'Reviews retrieved successfully.',
      data: reviews,
    });
  },
);
export const updateReview = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { reviewId } = req.params;
    const { rating, comment } = req.body;

    const review = await Review.findOne({
      _id: reviewId,
      user: req.user.id,
    });

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

    // Update the product's average rating
    const product = await Product.findById(review.product);
    if (product) {
      const allReviews = await Review.find({ product: product._id });
      const totalRatings = allReviews.reduce((sum, r) => sum + r.rating, 0);
      product.averageRating = totalRatings / allReviews.length;
      product.ratingsCount = allReviews.length;
      await product.save();
    }

    res.status(httpStatus.OK).json({
      success: true,
      statusCode: httpStatus.OK,
      message: 'Review updated successfully.',
      data: review,
    });
  },
);

export const deleteReview = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { reviewId } = req.params;

    const review = await Review.findById(reviewId);

    if (!review) {
      return next(new AppError(httpStatus.NOT_FOUND, 'Review not found.'));
    }

    // Check authorization (only admin or the review's user can delete)
    if (req.user.role !== 'admin' && req.user.id !== review.user.toString()) {
      return next(
        new AppError(
          httpStatus.FORBIDDEN,
          'You are not authorized to delete this review.',
        ),
      );
    }

    await review.deleteOne();

    // Update the product's average rating
    const product = await Product.findById(review.product);
    if (product) {
      const allReviews = await Review.find({ product: product._id });
      const totalRatings = allReviews.reduce((sum, r) => sum + r.rating, 0);
      product.averageRating = allReviews.length
        ? totalRatings / allReviews.length
        : 0;
      product.ratingsCount = allReviews.length;
      await product.save();
    }

    res.status(httpStatus.OK).json({
      success: true,
      statusCode: httpStatus.OK,
      message: 'Review deleted successfully.',
    });
  },
);
