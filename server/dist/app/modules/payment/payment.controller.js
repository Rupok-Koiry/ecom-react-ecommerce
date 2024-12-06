"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentError = exports.paymentSuccess = exports.initPayment = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const http_status_1 = __importDefault(require("http-status"));
const sslcommerz_lts_1 = __importDefault(require("sslcommerz-lts"));
const booking_model_1 = __importDefault(require("../booking/booking.model"));
const store_id = process.env.STORE_ID;
const store_passwd = process.env.STORE_PASSWORD;
const is_live = false; //true for live, false for sandbox
exports.initPayment = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { bookingId } = req.body;
    const booking = yield booking_model_1.default.findById(bookingId).populate('car user');
    const data = {
        total_amount: (_a = booking === null || booking === void 0 ? void 0 : booking.totalCost) !== null && _a !== void 0 ? _a : 0,
        currency: 'BDT',
        tran_id: 'REF123', // use unique tran_id for each api call
        success_url: `${process.env.API_URL}/payment/success/${booking === null || booking === void 0 ? void 0 : booking._id}`,
        fail_url: `${process.env.API_URL}/payment/error`,
        cancel_url: `${process.env.API_URL}/payment/error`,
        ipn_url: 'http://localhost:3030/ipn',
        shipping_method: 'Courier',
        product_name: 'Car Rental',
        product_category: 'Electronic',
        product_profile: 'general',
        cus_name: 'Customer Name',
        cus_email: 'customer@example.com',
        cus_add1: 'Dhaka',
        cus_add2: 'Dhaka',
        cus_city: 'Dhaka',
        cus_state: 'Dhaka',
        cus_postcode: '1000',
        cus_country: 'Bangladesh',
        cus_phone: '01711111111',
        cus_fax: '01711111111',
        ship_name: 'Customer Name',
        ship_add1: 'Dhaka',
        ship_add2: 'Dhaka',
        ship_city: 'Dhaka',
        ship_state: 'Dhaka',
        ship_postcode: 1000,
        ship_country: 'Bangladesh',
    };
    const sslcz = new sslcommerz_lts_1.default(store_id, store_passwd, is_live);
    sslcz.init(data).then((apiResponse) => {
        // Redirect the user to payment gateway
        const GatewayPageURL = apiResponse.GatewayPageURL;
        res.status(http_status_1.default.OK).json({
            success: true,
            statusCode: http_status_1.default.OK,
            message: `Payment initiated successfully`,
            data: GatewayPageURL,
        });
    });
}));
exports.paymentSuccess = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield booking_model_1.default.findByIdAndUpdate(req.params.id, {
        isPaid: true,
        status: 'completed',
    });
    res.redirect(`${process.env.CLIENT_URL}/payment/success`);
}));
exports.paymentError = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.redirect(`${process.env.CLIENT_URL}/payment/error`);
}));
