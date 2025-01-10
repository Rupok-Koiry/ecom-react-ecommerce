"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const order_routes_1 = __importDefault(require("../modules/order/order.routes"));
const coupon_routes_1 = __importDefault(require("../modules/coupon/coupon.routes"));
const auth_route_1 = require("../modules/auth/auth.route");
const user_routes_1 = __importDefault(require("../modules/user/user.routes"));
const shop_routes_1 = __importDefault(require("../modules/shop/shop.routes"));
const review_routes_1 = __importDefault(require("../modules/review/review.routes"));
const transaction_routes_1 = __importDefault(require("../modules/transaction/transaction.routes"));
const product_routes_1 = __importDefault(require("../modules/product/product.routes"));
const category_routes_1 = __importDefault(require("../modules/category/category.routes"));
const newsletter_routes_1 = __importDefault(require("../modules/newsletter/newsletter.routes"));
const analytics_routes_1 = __importDefault(require("../modules/analytics/analytics.routes"));
const router = (0, express_1.Router)();
// Define the routes for each module
const moduleRoutes = [
    {
        path: '/auth',
        route: auth_route_1.AuthRoutes,
    },
    {
        path: '/categories',
        route: category_routes_1.default,
    },
    {
        path: '/coupons',
        route: coupon_routes_1.default,
    },
    {
        path: '/orders',
        route: order_routes_1.default,
    },
    {
        path: '/products',
        route: product_routes_1.default,
    },
    {
        path: '/reviews',
        route: review_routes_1.default,
    },
    {
        path: '/shops',
        route: shop_routes_1.default,
    },
    {
        path: '/transactions',
        route: transaction_routes_1.default,
    },
    {
        path: '/users',
        route: user_routes_1.default,
    },
    {
        path: '/newsletters',
        route: newsletter_routes_1.default,
    },
    {
        path: '/analytics',
        route: analytics_routes_1.default,
    },
];
// Register each module route with the router
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
