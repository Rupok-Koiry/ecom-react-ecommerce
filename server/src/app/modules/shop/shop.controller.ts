import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import {
  createOne,
  deleteOne,
  getOne,
  updateOne,
} from '../../utils/handlerFactory';
import catchAsync from '../../utils/catchAsync';
import Shop from './shop.model';
import Product from '../product/product.model';
import AppError from '../../errors/AppError';

// Controller for creating a shop
export const createShop = createOne(Shop);

// Controller for getting shop details
export const getShopDetails = getOne(Shop, 'owner');

// Controller for updating a shop
export const updateShop = updateOne(Shop);

// Controller for deleting a shop
export const deleteShop = deleteOne(Shop);

// Controller for getting all products from a specific shop
export const getShopProducts = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { shopId } = req.params;

    const products = await Product.find({ shop: shopId });

    if (!products.length) {
      return next(new AppError(404, 'No products found for this shop'));
    }

    res.status(httpStatus.OK).json({
      success: true,
      statusCode: httpStatus.OK,
      message: `Products retrieved successfully for shop ${shopId}`,
      data: products,
    });
  },
);

// Controller for getting shop followers
export const getShopFollowers = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { shopId } = req.params;

    const shop = await Shop.findById(shopId).populate(
      'followers',
      'name email',
    );

    if (!shop) {
      return next(new AppError(404, 'Shop not found'));
    }

    res.status(httpStatus.OK).json({
      success: true,
      statusCode: httpStatus.OK,
      message: `Followers retrieved successfully for shop ${shopId}`,
      data: shop.followers,
    });
  },
);
