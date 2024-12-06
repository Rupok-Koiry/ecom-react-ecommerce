import { Router } from 'express';
// import { UserRoutes } from '../modules/user/user.route';
import OrderRoutes from '../modules/order/order.routes';
import CouponRoutes from '../modules/coupon/coupon.routes';
// import { CarRoutes } from '../modules/car/car.route';
// import { AuthRoutes } from '../modules/auth/auth.route';
// import { BookingRoutes } from '../modules/shop/shop.routes';
// import { PaymentRoutes } from '../modules/payment/payment.routes';

const router = Router();

// Define the routes for each module
const moduleRoutes = [
  {
    path: '/orders',
    route: OrderRoutes,
  },
  {
    path: '/coupons',
    route: CouponRoutes,
  },
  // {
  //   path: '/auth',
  //   route: AuthRoutes,
  // },
  // {
  //   path: '/cars',
  //   route: CarRoutes,
  // },
  // {
  //   path: '/bookings',
  //   route: BookingRoutes,
  // },
  // {
  //   path: '/payment',
  //   route: PaymentRoutes,
  // },
];

// Register each module route with the router
moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
