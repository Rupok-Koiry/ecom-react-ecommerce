import { Request, Response, NextFunction } from 'express';
import catchAsync from '../../utils/catchAsync';
import AppError from '../../errors/AppError';
import Order from './order.model';
import Shop from '../shop/shop.model';

// Place a new order
export const placeOrder = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { products, totalAmount, shippingAddress, shopId } = req.body;

    if (!products || products.length === 0) {
      return next(new AppError(400, 'Order must have at least one product'));
    }

    const order = await Order.create({
      user: req.user.userId,
      products,
      totalAmount,
      shippingAddress,
      shop: shopId,
    });

    res.status(201).json({
      success: true,
      statusCode: 201,
      message: 'Order placed successfully',
      data: order,
    });
  },
);

// Get details of a specific order
export const getOrderDetails = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { orderId } = req.params;

    const order = await Order.findById(orderId)
      .populate('products.product shop')
      .populate('user', 'name email');

    if (!order) {
      return next(new AppError(404, 'Order not found'));
    }

    // Allow only the order's user, vendor of the shop, or admin to view
    if (
      (req.user.role === 'user' &&
        order.user._id.toString() !== req.user.userId) ||
      (req.user.role === 'vendor' &&
        //@ts-expect-error eslint-disable-next-line
        order.shop.vendor.toString() !== req.user.userId)
    ) {
      return next(
        new AppError(403, 'You are not authorized to view this order'),
      );
    }

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Order details retrieved successfully',
      data: order,
    });
  },
);

export const getUserOrders = catchAsync(async (req: Request, res: Response) => {
  const { page = 1, limit = 10 } = req.query;

  const pageNumber = parseInt(page as string, 10);
  const limitNumber = parseInt(limit as string, 10);
  const skip = (pageNumber - 1) * limitNumber;

  const orders = await Order.find({ user: req.user.userId })
    .populate('products.product shop')
    .skip(skip)
    .limit(limitNumber);

  const totalOrders = await Order.countDocuments({ user: req.user.userId });

  res.status(200).json({
    success: true,
    statusCode: 200,
    message: 'User orders retrieved successfully',
    data: {
      orders,
      totalOrders,
    },
  });
});
export const getVendorOrders = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { shopId } = req.params;
    const { page = 1, limit = 10 } = req.query;

    const pageNumber = parseInt(page as string);
    const limitNumber = parseInt(limit as string);
    const skip = (pageNumber - 1) * limitNumber;

    // Verify that the shop belongs to the vendor
    const shop = await Shop.findById(shopId);
    if (!shop || shop.vendor.toString() !== req.user.userId) {
      return next(
        new AppError(
          403,
          'You are not authorized to view orders for this shop',
        ),
      );
    }

    const orders = await Order.find({ shop: shopId })
      .populate('products.product')
      .skip(skip)
      .limit(limitNumber);

    const totalOrders = await Order.countDocuments({ shop: shopId });

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Vendor orders retrieved successfully',
      data: {
        orders,
        totalOrders,
      },
    });
  },
);
