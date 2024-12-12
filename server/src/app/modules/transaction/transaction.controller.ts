import httpStatus from 'http-status';
import SSLCommerzPayment from 'sslcommerz-lts';
import catchAsync from '../../utils/catchAsync';
import User from '../user/user.model';
import AppError from '../../errors/AppError';
import Order from '../order/order.model';

const store_id = process.env.STORE_ID;
const store_passwd = process.env.STORE_PASSWORD;
const is_live = false;

export const initTransaction = catchAsync(async (req, res, next) => {
  const { products, shopId, totalPrice } = req.body;

  const user = await User.findById(req.user.userId);
  if (!user) return next(new AppError(httpStatus.NOT_FOUND, `User not found`));
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
  const sslcz = new SSLCommerzPayment(
    store_id as string,
    store_passwd as string,
    is_live,
  );
  // Save initial transaction in the database as "Pending"
  await Order.create({
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
    res.status(httpStatus.OK).json({
      success: true,
      statusCode: httpStatus.OK,
      message: `Transaction initiated successfully`,
      data: GatewayPageURL,
    });
  });
});

export const transactionSuccess = catchAsync(async (req, res) => {
  const { transactionId } = req.params;
  await await Order.findOneAndUpdate(
    { tran_id: transactionId },
    { status: 'success' },
  );

  res.redirect(`${process.env.CLIENT_URL}/transaction/success`);
});

export const transactionError = catchAsync(async (req, res) => {
  const { transactionId } = req.params;
  await Order.findOneAndUpdate(
    { tran_id: transactionId },
    { status: 'failed' },
  );
  res.redirect(`${process.env.CLIENT_URL}/transaction/error`);
});
