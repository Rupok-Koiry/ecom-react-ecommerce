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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.signin = exports.signup = void 0;
const http_status_1 = __importDefault(require("http-status"));
const config_1 = __importDefault(require("../../config"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const user_model_1 = __importDefault(require("../user/user.model"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const auth_utils_1 = require("./auth.utils");
// Destructure important variables from the config
const { JWT_SECRET, JWT_EXPIRES_IN, JWT_COOKIE_EXPIRES_IN, NODE_ENV } = config_1.default;
// Route handler for user signup
exports.signup = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Create a new user with the provided data
    const newUser = yield user_model_1.default.create(req.body);
    // Omit password from the response
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
    const _a = newUser.toObject(), { password } = _a, userObj = __rest(_a, ["password"]);
    // Prepare JWT payload
    const jwtPayload = {
        userId: newUser.id,
        role: newUser.role,
    };
    // Generate JWT token
    const token = (0, auth_utils_1.createToken)(jwtPayload, JWT_SECRET, JWT_EXPIRES_IN);
    // Configure options for JWT cookie
    const cookieOptions = {
        expires: new Date(Date.now() + Number(JWT_COOKIE_EXPIRES_IN) * 24 * 60 * 60 * 1000),
        httpOnly: true,
        secure: NODE_ENV === 'production',
    };
    // Set JWT token as a cookie in the response
    res.cookie('jwt', token, cookieOptions);
    // Send success response with the new user data and token
    res.status(http_status_1.default.OK).json({
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'User logged in successfully',
        data: userObj,
        token,
    });
}));
// Route handler for user signin
exports.signin = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // Extract email and password from the request body
    const { email, password } = req.body;
    // Find user by email and select password
    const user = yield user_model_1.default.findOne({ email }).select('+password');
    // If user not found, return an error
    if (!user)
        return next(new AppError_1.default(http_status_1.default.NOT_FOUND, 'User not found'));
    // Check if the provided password matches the stored password
    const isPasswordMatched = yield user_model_1.default.isPasswordMatched(password, user.password);
    if (!isPasswordMatched) {
        // If passwords don't match, return an error
        return next(new AppError_1.default(http_status_1.default.UNAUTHORIZED, 'Incorrect email or password'));
    }
    // Prepare JWT payload
    const jwtPayload = {
        userId: user.id,
        role: user.role,
    };
    // Generate JWT token
    const token = (0, auth_utils_1.createToken)(jwtPayload, JWT_SECRET, JWT_EXPIRES_IN);
    // Configure options for JWT cookie
    const cookieOptions = {
        expires: new Date(Date.now() + Number(JWT_COOKIE_EXPIRES_IN) * 24 * 60 * 60 * 1000),
        httpOnly: true,
        secure: NODE_ENV === 'production',
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
    const _b = user.toObject(), { password: _ } = _b, userData = __rest(_b, ["password"]);
    // Set JWT token as a cookie in the response
    res.cookie('jwt', token, cookieOptions);
    // Send success response with user data and token
    res.status(http_status_1.default.OK).json({
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'User logged in successfully',
        data: userData,
        token,
    });
}));
const logout = (req, res) => {
    res.cookie('jwt', 'loggedout', {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true,
    });
    res.status(200).json({
        status: 'success',
    });
};
exports.logout = logout;
