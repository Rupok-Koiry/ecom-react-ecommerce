import { Router } from 'express';
import OrderRoutes from '../modules/order/order.routes';
import CouponRoutes from '../modules/coupon/coupon.routes';
import { AuthRoutes } from '../modules/auth/auth.route';
import UserRoutes from '../modules/user/user.routes';
import ShopRoutes from '../modules/shop/shop.routes';
import ReviewRoutes from '../modules/review/review.routes';
import TransactionRoutes from '../modules/transaction/transaction.routes';
import ProductRoutes from '../modules/product/product.routes';
import CategoryRoutes from '../modules/category/category.routes';
import NewsletterRoutes from '../modules/newsletter/newsletter.routes';
import AnalyticsRoutes from '../modules/analytics/analytics.routes';

const router = Router();

// Define the routes for each module
const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/categories',
    route: CategoryRoutes,
  },
  {
    path: '/coupons',
    route: CouponRoutes,
  },
  {
    path: '/orders',
    route: OrderRoutes,
  },
  {
    path: '/products',
    route: ProductRoutes,
  },
  {
    path: '/reviews',
    route: ReviewRoutes,
  },
  {
    path: '/shops',
    route: ShopRoutes,
  },
  {
    path: '/transactions',
    route: TransactionRoutes,
  },
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/newsletters',
    route: NewsletterRoutes,
  },
  {
    path: '/analytics',
    route: AnalyticsRoutes,
  },
];

// Register each module route with the router
moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
