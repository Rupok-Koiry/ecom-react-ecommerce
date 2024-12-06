"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_route_1 = require("../modules/user/user.route");
const car_route_1 = require("../modules/car/car.route");
const auth_route_1 = require("../modules/auth/auth.route");
const booking_routes_1 = require("../modules/booking/booking.routes");
const payment_routes_1 = require("../modules/payment/payment.routes");
const router = (0, express_1.Router)();
// Define the routes for each module
const moduleRoutes = [
    {
        path: '/users',
        route: user_route_1.UserRoutes,
    },
    {
        path: '/auth',
        route: auth_route_1.AuthRoutes,
    },
    {
        path: '/cars',
        route: car_route_1.CarRoutes,
    },
    {
        path: '/bookings',
        route: booking_routes_1.BookingRoutes,
    },
    {
        path: '/payment',
        route: payment_routes_1.PaymentRoutes,
    },
];
// Register each module route with the router
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
