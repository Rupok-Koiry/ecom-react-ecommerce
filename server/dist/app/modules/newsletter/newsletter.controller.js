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
exports.deleteNewsletter = exports.updateNewsletter = exports.getNewsletterDetails = exports.getAllNewsletters = exports.createNewsletter = void 0;
const newsletter_model_1 = __importDefault(require("./newsletter.model"));
const handlerFactory_1 = require("../../utils/handlerFactory");
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
exports.createNewsletter = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const newsLetter = yield newsletter_model_1.default.findOne({
        email: req.body.email,
    });
    if (newsLetter) {
        return next(new AppError_1.default(http_status_1.default.NOT_FOUND, `Newsletter already exists`));
    }
    const doc = yield newsletter_model_1.default.create(req.body);
    res.status(http_status_1.default.CREATED).json({
        success: true,
        statusCode: http_status_1.default.CREATED,
        message: `${newsletter_model_1.default.modelName} created successfully`,
        data: doc,
    });
}));
exports.getAllNewsletters = (0, handlerFactory_1.getAll)(newsletter_model_1.default);
exports.getNewsletterDetails = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newsLetter = yield newsletter_model_1.default.findOne({
            email: req.params.email,
        });
        if (!newsLetter) {
            return next(new AppError_1.default(http_status_1.default.NOT_FOUND, `Newsletter not found`));
        }
        res.status(http_status_1.default.OK).json({
            success: true,
            statusCode: http_status_1.default.OK,
            message: `A Newsletter retrieved successfully`,
            data: newsLetter,
        });
    }
    catch (error) {
        next(error);
    }
}));
exports.updateNewsletter = (0, handlerFactory_1.updateOne)(newsletter_model_1.default);
exports.deleteNewsletter = (0, handlerFactory_1.deleteOne)(newsletter_model_1.default);
