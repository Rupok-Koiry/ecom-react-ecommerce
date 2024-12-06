"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.returnCar = exports.deleteCar = exports.updateCar = exports.getAllCars = exports.getCar = exports.createCar = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const factory = __importStar(require("../../utils/handlerFactory"));
const booking_model_1 = __importDefault(require("../booking/booking.model"));
const car_model_1 = __importDefault(require("./car.model"));
const date_fns_1 = require("date-fns");
exports.createCar = factory.createOne(car_model_1.default);
exports.getCar = factory.getOne(car_model_1.default);
exports.getAllCars = factory.getAll(car_model_1.default);
exports.updateCar = factory.updateOne(car_model_1.default);
exports.deleteCar = factory.deleteOne(car_model_1.default);
exports.returnCar = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { bookingId, endDate } = req.body;
    // Find the booking and populate associated fields
    const booking = yield booking_model_1.default.findById(bookingId).populate('car user');
    if (!booking) {
        return next(new AppError_1.default(http_status_1.default.NOT_FOUND, 'Booking not found'));
    }
    // Calculate the total cost of the booking
    const duration = (0, date_fns_1.differenceInHours)(new Date(endDate), new Date(booking.startDate));
    const totalCost = duration * booking.car.pricePerHour;
    // Update the car status to 'available'
    yield car_model_1.default.findByIdAndUpdate(booking.car._id, { status: 'available' });
    // Update the booking with total cost and end time
    booking.totalCost = totalCost;
    booking.endDate = endDate;
    yield booking.save();
    // Populate the booking with the updated car details
    yield booking.populate('car user');
    // Send the response
    res.status(http_status_1.default.OK).json({
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Car returned successfully',
        data: booking,
    });
}));
