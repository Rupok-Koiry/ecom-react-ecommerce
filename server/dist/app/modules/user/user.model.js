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
const mongoose_1 = require("mongoose");
const config_1 = __importDefault(require("../../config"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const crypto_1 = __importDefault(require("crypto"));
// Define the schema for the User model
const userSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String },
    profilePic: { type: String },
    role: { type: String, enum: ['admin', 'vendor', 'user'], default: 'user' },
    isActive: { type: Boolean, default: true },
    followedShops: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Shop' }],
    passwordChangedAt: {
        type: Date,
    },
    passwordResetToken: {
        type: String,
    },
    passwordResetExpires: {
        type: Date,
    },
});
// Pre-save hook to hash the user's password before saving it to the database
userSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!this.isModified('password'))
            return next();
        // Hash the password with the configured number of salt rounds
        this.password = yield bcrypt_1.default.hash(this.password, Number(config_1.default.BCRYPT_SALT_ROUNDS));
        next();
    });
});
// Pre-find hook to filter out inactive users
userSchema.pre(/^find/, function (next) {
    this.where({ isActive: { $ne: false } });
    next();
});
// Method: Create a password reset token and set its expiration time
userSchema.methods.createPasswordResetToken = function () {
    const resetToken = crypto_1.default.randomBytes(32).toString('hex');
    this.passwordResetToken = crypto_1.default
        .createHash('sha256')
        .update(resetToken)
        .digest('hex');
    this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
    return resetToken;
};
// Static method to compare plain text password with the hashed password
userSchema.methods.isPasswordMatched = function (plainTextPassword, hashedPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcrypt_1.default.compare(plainTextPassword, hashedPassword);
    });
};
// Create and export the User model
const User = (0, mongoose_1.model)('User', userSchema);
exports.default = User;
