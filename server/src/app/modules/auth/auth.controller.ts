import httpStatus from 'http-status';
import config from '../../config';
import catchAsync from '../../utils/catchAsync';
import User from '../user/user.model';
import AppError from '../../errors/AppError';
import { createToken } from './auth.utils';
import { RequestHandler } from 'express';

// Destructure important variables from the config
const { JWT_SECRET, JWT_EXPIRES_IN, JWT_COOKIE_EXPIRES_IN, NODE_ENV } = config;

// Route handler for user signup
export const signup = catchAsync(async (req, res) => {
  // Create a new user with the provided data
  const newUser = await User.create(req.body);

  // Omit password from the response
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  const { password, ...userObj } = newUser.toObject();

  // Prepare JWT payload
  const jwtPayload = {
    userId: newUser.id,
    role: newUser.role,
  };

  // Generate JWT token
  const token = createToken(
    jwtPayload,
    JWT_SECRET as string,
    JWT_EXPIRES_IN as string,
  );

  // Configure options for JWT cookie
  const cookieOptions = {
    expires: new Date(
      Date.now() + Number(JWT_COOKIE_EXPIRES_IN) * 24 * 60 * 60 * 1000,
    ),
    httpOnly: true,
    secure: NODE_ENV === 'production',
  };

  // Set JWT token as a cookie in the response
  res.cookie('jwt', token, cookieOptions);

  // Send success response with the new user data and token
  res.status(httpStatus.OK).json({
    success: true,
    statusCode: httpStatus.OK,
    message: 'User logged in successfully',
    data: userObj,
    token,
  });
});

// Route handler for user signin
export const signin = catchAsync(async (req, res, next) => {
  // Extract email and password from the request body
  const { email, password } = req.body;

  // Find user by email and select password
  const user = await User.findOne({ email }).select('+password');

  // If user not found, return an error
  if (!user) return next(new AppError(httpStatus.NOT_FOUND, 'User not found'));

  // Check if the provided password matches the stored password
  const isPasswordMatched = await User.isPasswordMatched(
    password,
    user.password,
  );
  if (!isPasswordMatched) {
    // If passwords don't match, return an error
    return next(
      new AppError(httpStatus.UNAUTHORIZED, 'Incorrect email or password'),
    );
  }

  // Prepare JWT payload
  const jwtPayload = {
    userId: user.id,
    role: user.role,
  };

  // Generate JWT token
  const token = createToken(
    jwtPayload,
    JWT_SECRET as string,
    JWT_EXPIRES_IN as string,
  );

  // Configure options for JWT cookie
  const cookieOptions = {
    expires: new Date(
      Date.now() + Number(JWT_COOKIE_EXPIRES_IN) * 24 * 60 * 60 * 1000,
    ),
    httpOnly: true,
    secure: NODE_ENV === 'production',
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  const { password: _, ...userData } = user.toObject();
  // Set JWT token as a cookie in the response
  res.cookie('jwt', token, cookieOptions);

  // Send success response with user data and token
  res.status(httpStatus.OK).json({
    success: true,
    statusCode: httpStatus.OK,
    message: 'User logged in successfully',
    data: userData,
    token,
  });
});

export const logout: RequestHandler = (req, res) => {
  res.cookie('jwt', 'loggedout', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({
    status: 'success',
  });
};
