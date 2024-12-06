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
      user: req.user.id,
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

// Get orders for a user
export const getUserOrders = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const orders = await Order.find({ user: req.user.id }).populate(
      'products.product',
    );

    if (!orders || orders.length === 0) {
      return next(new AppError(404, 'No orders found for this user'));
    }

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'User orders retrieved successfully',
      data: orders,
    });
  },
);

// Get details of a specific order
export const getOrderDetails = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { orderId } = req.params;

    const order = await Order.findById(orderId)
      .populate('products.product')
      .populate('user', 'name email')
      .populate('shop', 'name owner');

    if (!order) {
      return next(new AppError(404, 'Order not found'));
    }

    // Allow only the order's user, vendor of the shop, or admin to view
    if (
      (req.user.role === 'user' && order.user._id.toString() !== req.user.id) ||
      (req.user.role === 'vendor' &&
        //@ts-expect-error eslint-disable-next-line
        order.shop.owner.toString() !== req.user.id)
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

// Get orders for a specific vendor shop
export const getVendorOrders = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { shopId } = req.params;

    // Verify that the shop belongs to the vendor
    const shop = await Shop.findById(shopId);
    if (!shop || shop.vendor.toString() !== req.user.id) {
      return next(
        new AppError(
          403,
          'You are not authorized to view orders for this shop',
        ),
      );
    }

    const orders = await Order.find({ shop: shopId }).populate(
      'products.product',
    );

    if (!orders || orders.length === 0) {
      return next(new AppError(404, 'No orders found for this shop'));
    }

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Vendor orders retrieved successfully',
      data: orders,
    });
  },
);
