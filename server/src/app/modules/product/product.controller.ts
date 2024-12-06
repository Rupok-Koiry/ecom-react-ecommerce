import { Request, Response, NextFunction } from 'express';
import {
  deleteOne,
  updateOne,
  createOne,
  getOne,
  getAll,
} from '../../utils/handlerFactory';
import httpStatus from 'http-status';
import Product from './product.model';
import catchAsync from '../../utils/catchAsync';
import AppError from '../../errors/AppError';
import Review from '../review/review.model';

// Controller for creating a product
export const createProduct = createOne(Product);

// Controller for getting all products
export const getAllProducts = getAll(Product, 'shop category');

// Controller for getting product details
export const getProductDetails = getOne(Product, 'shop category');

// Controller for updating a product
export const updateProduct = updateOne(Product);

// Controller for deleting a product
export const deleteProduct = deleteOne(Product);

// Controller for duplicating a product
export const duplicateProduct = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { productId } = req.params;

    const product = await Product.findById(productId);

    if (!product) {
      return next(new AppError(httpStatus.NOT_FOUND, 'Product not found.'));
    }

    // Duplicate the product details
    const duplicatedProduct = await Product.create({
      ...product.toObject(),
      _id: undefined, // Ensure a new _id is generated
      name: `${product.name} (Duplicate)`,
    });

    res.status(httpStatus.CREATED).json({
      success: true,
      statusCode: httpStatus.CREATED,
      message: 'Product duplicated successfully.',
      data: duplicatedProduct,
    });
  },
);

// Controller for getting reviews for a specific product
export const getProductReviews = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { productId } = req.params;

    const reviews = await Review.find({ product: productId }).populate(
      'user',
      'name',
    );
    if (!reviews.length) {
      return next(
        new AppError(httpStatus.NOT_FOUND, 'No reviews found for this product'),
      );
    }

    res.status(httpStatus.OK).json({
      success: true,
      statusCode: httpStatus.OK,
      message: `Reviews retrieved successfully for product ${productId}`,
      data: reviews,
    });
  },
);
