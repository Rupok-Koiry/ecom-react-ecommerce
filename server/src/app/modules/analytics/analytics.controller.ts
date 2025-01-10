import catchAsync from '../../utils/catchAsync';
import Order from '../order/order.model';
import Product from '../product/product.model';
import Shop from '../shop/shop.model';
import User from '../user/user.model';

export const getModelCounts = catchAsync(async (req, res) => {
  const userCount = await User.countDocuments();

  const products =
    req.user.role === 'admin'
      ? await Product.find({}).select('_id')
      : await Product.find({ vendor: req.user.userId }).select('_id');

  const orderCount =
    req.user.role === 'admin'
      ? await Order.countDocuments()
      : await Order.countDocuments({
          products: {
            $elemMatch: {
              product: { $in: products.map((product) => product._id) },
            },
          },
        });
  const incomeResult =
    req.user.role === 'admin'
      ? await Order.aggregate([
          { $match: { status: 'success' } },
          { $group: { _id: null, totalEarning: { $sum: '$totalPrice' } } },
        ])
      : await Order.aggregate([
          {
            $match: {
              status: 'success',
              products: {
                $elemMatch: {
                  product: { $in: products.map((product) => product._id) },
                },
              },
            },
          },
          { $group: { _id: null, totalEarning: { $sum: '$totalPrice' } } },
        ]);

  const totalEarning =
    incomeResult.length > 0 ? incomeResult[0].totalEarning : 0;
  res.json({
    userCount,
    productCount: products.length,
    orderCount,
    totalEarning,
  });
});

export const getOrderMetrics = catchAsync(async (req, res) => {
  const endDate = new Date();
  const startDate = new Date(endDate);
  startDate.setDate(startDate.getDate() - 29);

  let shop = null;
  if (req.user.role !== 'admin') {
    shop = await Shop.findOne({ vendor: req.user.userId }).select('_id');
    if (!shop) {
      return res.status(404).json({ message: 'Shop not found' });
    }
  }

  // Build match conditions dynamically
  const matchConditions: {
    createdAt: { $gte: Date; $lte: Date };
    shop?: any;
  } = {
    createdAt: { $gte: startDate, $lte: endDate },
  };

  if (req.user.role !== 'admin' && shop) {
    matchConditions.shop = shop._id;
  }

  // Aggregate orders by creation date
  const orders = await Order.aggregate([
    {
      $match: matchConditions,
    },
    {
      $group: {
        _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
        orderCount: { $sum: 1 },
      },
    },
  ]);

  const orderMap = new Map(
    orders.map((order) => [order._id, order.orderCount]),
  );

  // Prepare the result with all three datasets
  const resultData = Array.from({ length: 30 }, (_, i) => {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);
    const dateString = date.toISOString().split('T')[0];

    return {
      date: dateString,
      orderCount: orderMap.get(dateString) || 0,
    };
  });

  res.json(resultData);
});

export const getPaymentMetrics = catchAsync(async (req, res) => {
  const endDate = new Date();
  const startDate = new Date(endDate);
  startDate.setDate(startDate.getDate() - 29);

  let shop = null;
  if (req.user.role !== 'admin') {
    shop = await Shop.findOne({ vendor: req.user.userId }).select('_id');
    if (!shop) {
      return res.status(404).json({ message: 'Shop not found' });
    }
  }

  // Build match conditions dynamically
  const matchConditions: {
    createdAt: { $gte: Date; $lte: Date };
    status: string;
    shop?: any;
  } = {
    createdAt: { $gte: startDate, $lte: endDate },
    status: 'success', // Match the enum value for successful orders
  };

  if (req.user.role !== 'admin' && shop) {
    matchConditions.shop = shop._id;
  }

  // Aggregate payments
  const payments = await Order.aggregate([
    {
      $match: matchConditions,
    },
    {
      $group: {
        _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
        totalAmount: { $sum: '$totalPrice' }, // Sum totalPrice
      },
    },
  ]);

  const paymentMap = new Map(
    payments.map((payment) => [payment._id, payment.totalAmount]),
  );

  const paymentData = Array.from({ length: 30 }, (_, i) => {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);
    const dateString = date.toISOString().split('T')[0];

    return {
      date: dateString,
      totalAmount: paymentMap.get(dateString) || 0,
    };
  });

  res.json(paymentData);
});
