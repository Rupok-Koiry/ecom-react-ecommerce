import express from 'express';
import {
  createCoupon,
  getAllCoupons,
  getCouponDetails,
  updateCoupon,
  deleteCoupon,
} from './coupon.controller';
import auth from '../../middlewares/auth';

const router = express.Router();

// Coupon Routes
router.post('/', auth('admin'), createCoupon);
router.get('/', auth('admin'), getAllCoupons);
router.get('/:couponId', auth('admin'), getCouponDetails);
router.put('/:couponId', auth('admin'), updateCoupon);
router.delete('/:couponId', auth('admin'), deleteCoupon);

export default router;
