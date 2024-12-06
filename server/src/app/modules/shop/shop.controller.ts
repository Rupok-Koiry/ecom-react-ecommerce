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

// Create a shop
export const createShop = createOne(Shop);

// Get shop details
export const getShopDetails = getOne(Shop, 'owner');

// Update a shop
export const updateShop = updateOne(Shop);

// Delete a shop
export const deleteShop = deleteOne(Shop);

// Get all products for a specific shop
export const getShopProducts = catchAsync(
  async (req: Request, res: Response) => {
    const { shopId } = req.params;
    const { page = 1, limit = 10, ...filters } = req.query;

    const products = await Product.find({ shop: shopId, ...filters })
      .skip((+page - 1) * +limit)
      .limit(+limit);

    const total = await Product.countDocuments({ shop: shopId, ...filters });

    res.status(httpStatus.OK).json({
      success: true,
      statusCode: httpStatus.OK,
      message: `Products retrieved successfully for shop ${shopId}`,
      data: products,
      pagination: {
        total,
        page: +page,
        limit: +limit,
      },
    });
  },
);

// Get shop followers
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

// Blacklist a shop
export const blacklistShop = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { shopId } = req.params;

    const shop = await Shop.findById(shopId);
    if (!shop) {
      return next(new AppError(404, 'Shop not found'));
    }

    shop.isBlacklisted = true;
    await shop.save();

    res.status(httpStatus.OK).json({
      success: true,
      statusCode: httpStatus.OK,
      message: `Shop ${shopId} has been blacklisted.`,
    });
  },
);
