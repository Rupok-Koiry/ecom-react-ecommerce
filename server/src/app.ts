import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Application } from 'express';
import errorHandler from './app/middlewares/errorHandler';
import notFound from './app/middlewares/notFound';
import router from './app/routes';
import mongoose from 'mongoose';

const app: Application = express();

// Middleware for parsing JSON bodies
app.use(express.json());

// Middleware for parsing cookies
app.use(cookieParser());

// Middleware for enabling Cross-Origin Resource Sharing (CORS) for specified origins
app.use(
  cors({
    origin: [
      'http://localhost:5173',
      'https://ph-assignment-09-btl9.vercel.app',
    ],
  }),
);

// Route handlers for API endpoints prefixed with /api/v1
app.use('/api', router);
app.use('/api/model-counts', async (req, res) => {
  try {
    // Run all the count queries and calculate total earnings concurrently using Promise.all
    const [productCount, userCount, orderCount, totalEarning] =
      await Promise.all([
        mongoose.model('Product').countDocuments().exec(),
        mongoose.model('User').countDocuments().exec(),
        mongoose.model('Order').countDocuments().exec(),
        mongoose
          .model('Order')
          .aggregate([
            { $match: { status: 'success' } },
            { $group: { _id: null, totalEarning: { $sum: '$totalPrice' } } },
          ])
          .exec(),
      ]);

    // Extract totalEarning value (it will be an array with one object)
    const totalEarningValue =
      totalEarning.length > 0 ? totalEarning[0].totalEarning : 0;

    // Send the counts and total earnings in the response
    res.json({
      productCount,
      userCount,
      orderCount,
      totalEarning: totalEarningValue,
    });
  } catch (error: any) {
    // Handle any errors that occur during the queries
    res.status(500).json({
      message: 'Error fetching model counts and total earnings',
      error: error.message,
    });
  }
});

// Middleware for handling global errors
app.use(errorHandler);

// Middleware for handling 404 - Not Found errors
app.use(notFound);

export default app;
