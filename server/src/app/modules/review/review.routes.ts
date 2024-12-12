import express from 'express';
import {
  createReview,
  updateReview,
  deleteReview,
  getVendorReviews,
} from './review.controller';
import auth from '../../middlewares/auth';

const router = express.Router();

// Review Routes
router.get('/', auth('vendor'), getVendorReviews);
router.post('/:productId', auth('user'), createReview);
router.patch('/:reviewId', auth('user'), updateReview);
router.delete('/:reviewId', auth('vendor'), deleteReview);
export default router;
