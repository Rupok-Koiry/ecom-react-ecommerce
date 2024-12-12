import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import AppError from '../../errors/AppError';
import Review from './review.model';
import Product from '../product/product.model';

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
export const getVendorReviews = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const products = await Product.find({
        vendor: req.user.userId,
      });
      const reviews = await Review.find({
        product: { $in: products.map((product) => product._id) },
      }).populate('user product');

      res.status(httpStatus.OK).json({
        success: true,
        statusCode: httpStatus.OK,
        message: `Shop reviews retrieved successfully`,
        data: reviews,
      });
    } catch (error) {
      next(error);
    }
  },
);
// Create Review
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

    // Create review
    const review = await Review.create({
      user: req.user.userId,
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

// Update Review
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

    const review = await Review.findOne({
      _id: reviewId,
      user: req.user.userId,
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

// Delete Review
export const deleteReview = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { reviewId } = req.params;

    const review = await Review.findById(reviewId);
    if (!review) {
      return next(new AppError(httpStatus.NOT_FOUND, 'Review not found.'));
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
