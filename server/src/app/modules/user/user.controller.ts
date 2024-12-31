import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import User from './user.model';
import Shop from '../shop/shop.model';
import { Types } from 'mongoose';
import catchAsync from '../../utils/catchAsync';
import AppError from '../../errors/AppError';
import { deleteOne, getAll } from '../../utils/handlerFactory';

// Get the user's profile
export const getUserProfile = catchAsync(async (req, res) => {
  const userId = req.user.userId;
  const user = await User.findById(userId);
  res.status(httpStatus.OK).json({
    success: true,
    statusCode: httpStatus.OK,
    message: 'User retrieved successfully',
    data: user,
  });
});

// Update the user's profile
export const updateUserProfile = catchAsync(async (req, res) => {
  const userId = req.user.userId;
  const user = await User.findByIdAndUpdate(userId, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(httpStatus.OK).json({
    success: true,
    statusCode: httpStatus.OK,
    message: 'User updated successfully',
    data: user,
  });
});

// Follow a shop
export const followShop = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user.userId;
    const shopId = new Types.ObjectId(req.params.shopId);

    const shop = await Shop.findById(shopId);
    if (!shop) {
      return next(new AppError(httpStatus.NOT_FOUND, 'Shop not found.'));
    }

    const user = await User.findById(userId);
    if (user?.followedShops.includes(shopId.toString())) {
      return res.status(httpStatus.BAD_REQUEST).json({
        success: false,
        statusCode: httpStatus.BAD_REQUEST,
        message: 'You are already following this shop.',
      });
    }

    // Update relationships
    user?.followedShops.push(shopId.toString());
    shop.followers.push(userId);

    await user?.save();
    await shop.save();

    res.status(httpStatus.OK).json({
      success: true,
      statusCode: httpStatus.OK,
      message: 'Shop followed successfully.',
    });
  },
);

// Unfollow a shop
export const unfollowShop = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user.userId;
    const shopId = new Types.ObjectId(req.params.shopId);

    const shop = await Shop.findById(shopId);
    if (!shop) {
      return next(new AppError(httpStatus.NOT_FOUND, 'Shop not found.'));
    }

    const user = await User.findById(userId);
    if (!user?.followedShops.includes(shopId.toString())) {
      return res.status(httpStatus.BAD_REQUEST).json({
        success: false,
        statusCode: httpStatus.BAD_REQUEST,
        message: 'You are not following this shop.',
      });
    }

    // Update relationships
    user.followedShops = user.followedShops.filter(
      (id) => id.toString() !== shopId.toString(),
    );
    shop.followers = shop.followers.filter((id) => id.toString() !== userId);

    await user.save();
    await shop.save();

    res.status(httpStatus.OK).json({
      success: true,
      statusCode: httpStatus.OK,
      message: 'Shop unfollowed successfully.',
    });
  },
);

// Get all users (supports pagination)
export const getAllUsers = getAll(User);

// Ban a user
export const banUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.params;

    const user = await User.findById(userId);
    if (!user) {
      return next(new AppError(httpStatus.NOT_FOUND, 'User not found.'));
    }

    user.isActive = false;
    await user.save();

    res.status(httpStatus.OK).json({
      success: true,
      statusCode: httpStatus.OK,
      message: 'User banned successfully.',
    });
  },
);

// Delete a user
export const deleteUser = deleteOne(User);
