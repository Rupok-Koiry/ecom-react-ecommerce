import Coupon from './transaction.model';
import {
  createOne,
  getAll,
  getOne,
  updateOne,
  deleteOne,
} from '../../utils/handlerFactory';

export const createCoupon = createOne(Coupon);
export const getAllCoupons = getAll(Coupon);
export const getCouponDetails = getOne(Coupon);
export const updateCoupon = updateOne(Coupon);
export const deleteCoupon = deleteOne(Coupon);
