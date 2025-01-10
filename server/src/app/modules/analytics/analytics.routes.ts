import express from 'express';
import {
  getModelCounts,
  getPaymentMetrics,
  getOrderMetrics,
} from './analytics.controller';
import auth from '../../middlewares/auth';

const router = express.Router();

// Updated routes for clarity and consistency
router.route('/model-counts').get(auth('admin', 'vendor'), getModelCounts);
router.route('/order-metrics').get(auth('admin', 'vendor'), getOrderMetrics);
router
  .route('/payment-metrics')
  .get(auth('admin', 'vendor'), getPaymentMetrics);

export default router;
