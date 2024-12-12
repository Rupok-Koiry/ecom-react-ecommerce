"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const transaction_controller_1 = require("./transaction.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const router = express_1.default.Router();
// Transaction Management
router.post('/init-transaction', (0, auth_1.default)('user'), transaction_controller_1.initTransaction);
router.post('/success/:transactionId', transaction_controller_1.transactionSuccess);
router.post('/error/:transactionId', transaction_controller_1.transactionError);
exports.default = router;
