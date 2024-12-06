import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import User from './user.model';
import catchAsync from '../../utils/catchAsync';
import AppError from '../../errors/AppError';
import Shop from '../shop/shop.model';
import { Types } from 'mongoose';

// Controller for getting the user's profile
export const getUserProfile = catchAsync(
  async (req: Request, res: Response) => {
    const userId = req.user.id;

    const user = await User.findById(userId).select('-password');

    if (!user) {
      return res.status(httpStatus.NOT_FOUND).json({
        success: false,
        statusCode: httpStatus.NOT_FOUND,
        message: 'User not found.',
      });
    }

    res.status(httpStatus.OK).json({
      success: true,
      statusCode: httpStatus.OK,
      message: 'User profile retrieved successfully.',
      data: user,
    });
  },
);

// Controller for updating the user's profile
export const updateUserProfile = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user.id;

    const updates = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password ? undefined : req.body.password, // Password shouldn't be updated directly here.
    };

    const updatedUser = await User.findByIdAndUpdate(userId, updates, {
      new: true,
      runValidators: true,
    }).select('-password');

    if (!updatedUser) {
      return next(new AppError(httpStatus.NOT_FOUND, 'User not found.'));
    }

    res.status(httpStatus.OK).json({
      success: true,
      statusCode: httpStatus.OK,
      message: 'User profile updated successfully.',
      data: updatedUser,
    });
  },
);

// Controller for following a shop
export const followShop = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user.id;
    const shopId = new Types.ObjectId(req.params.shopId);

    const shop = await Shop.findById(shopId);

    if (!shop) {
      return next(new AppError(httpStatus.NOT_FOUND, 'Shop not found.'));
    }

    const user = await User.findById(userId);

    if (user!.followedShops.includes(shopId)) {
      return res.status(httpStatus.BAD_REQUEST).json({
        success: false,
        statusCode: httpStatus.BAD_REQUEST,
        message: 'You are already following this shop.',
      });
    }

    user!.followedShops.push(shopId);
    shop.followers.push(userId);

    await user!.save();
    await shop.save();

    res.status(httpStatus.OK).json({
      success: true,
      statusCode: httpStatus.OK,
      message: 'Shop followed successfully.',
    });
  },
);

// Controller for unfollowing a shop
export const unfollowShop = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user.id;
    const shopId = new Types.ObjectId(req.params.shopId);

    const shop = await Shop.findById(shopId);

    if (!shop) {
      return next(new AppError(httpStatus.NOT_FOUND, 'Shop not found.'));
    }

    const user = await User.findById(userId);

    if (!user!.followedShops.includes(shopId)) {
      return res.status(httpStatus.BAD_REQUEST).json({
        success: false,
        statusCode: httpStatus.BAD_REQUEST,
        message: 'You are not following this shop.',
      });
    }

    user!.followedShops = user!.followedShops.filter(
      (id) => id.toString() !== shopId.toString(),
    );
    shop.followers = shop.followers.filter((id) => id.toString() !== userId);

    await user!.save();
    await shop.save();

    res.status(httpStatus.OK).json({
      success: true,
      statusCode: httpStatus.OK,
      message: 'Shop unfollowed successfully.',
    });
  },
);

// Get all users
export const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const users = await User.find().select('-password');

  res.status(httpStatus.OK).json({
    success: true,
    statusCode: httpStatus.OK,
    message: 'Users retrieved successfully.',
    data: users,
  });
});

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
export const deleteUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.params;

    const user = await User.findByIdAndDelete(userId);

    if (!user) {
      return next(new AppError(httpStatus.NOT_FOUND, 'User not found.'));
    }

    res.status(httpStatus.OK).json({
      success: true,
      statusCode: httpStatus.OK,
      message: 'User deleted successfully.',
    });
  },
);
