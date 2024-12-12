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
exports.transactionError = exports.transactionSuccess = exports.initTransaction = void 0;
const http_status_1 = __importDefault(require("http-status"));
const sslcommerz_lts_1 = __importDefault(require("sslcommerz-lts"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const user_model_1 = __importDefault(require("../user/user.model"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const order_model_1 = __importDefault(require("../order/order.model"));
const store_id = process.env.STORE_ID;
const store_passwd = process.env.STORE_PASSWORD;
const is_live = false;
exports.initTransaction = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { products, shopId, totalPrice } = req.body;
    const user = yield user_model_1.default.findById(req.user.userId);
    if (!user)
        return next(new AppError_1.default(http_status_1.default.NOT_FOUND, `User not found`));
    const transactionId = `TXN${Date.now()}`;
    const data = {
        total_amount: Number(totalPrice),
        currency: 'BDT',
        tran_id: transactionId,
        success_url: `${process.env.API_URL}/transactions/success/${transactionId}`,
        fail_url: `${process.env.API_URL}/transactions/error/${transactionId}`,
        cancel_url: `${process.env.API_URL}/transactions/error/${transactionId}`,
        ipn_url: 'http://localhost:3030/ipn',
        shipping_method: 'Online',
        product_name: 'Electronics',
        product_category: 'Electronics',
        product_profile: 'general',
        cus_name: user.name || '',
        cus_email: user.email || '',
        cus_add1: 'Dhaka',
        cus_add2: 'Dhaka',
        cus_city: 'Dhaka',
        cus_state: 'Dhaka',
        cus_postcode: '1000',
        cus_country: 'Bangladesh',
        cus_phone: '01711111111',
        cus_fax: '01711111111',
        ship_name: user.name || '',
        ship_add1: 'Dhaka',
        ship_add2: 'Dhaka',
        ship_city: 'Dhaka',
        ship_state: 'Dhaka',
        ship_postcode: 1200,
        ship_country: 'Bangladesh',
    };
    const sslcz = new sslcommerz_lts_1.default(store_id, store_passwd, is_live);
    // Save initial transaction in the database as "Pending"
    yield order_model_1.default.create({
        user: req.user.userId,
        products,
        shop: shopId,
        tran_id: transactionId,
        totalPrice,
        status: 'pending',
    });
    sslcz.init(data).then((apiResponse) => {
        // Redirect the user to transaction gateway
        const GatewayPageURL = apiResponse.GatewayPageURL;
        res.status(http_status_1.default.OK).json({
            success: true,
            statusCode: http_status_1.default.OK,
            message: `Transaction initiated successfully`,
            data: GatewayPageURL,
        });
    });
}));
exports.transactionSuccess = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { transactionId } = req.params;
    yield yield order_model_1.default.findOneAndUpdate({ tran_id: transactionId }, { status: 'success' });
    res.redirect(`${process.env.CLIENT_URL}/transaction/success`);
}));
exports.transactionError = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { transactionId } = req.params;
    yield order_model_1.default.findOneAndUpdate({ tran_id: transactionId }, { status: 'failed' });
    res.redirect(`${process.env.CLIENT_URL}/transaction/error`);
}));
