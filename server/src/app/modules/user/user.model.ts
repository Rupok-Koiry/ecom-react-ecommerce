import { Schema, model } from 'mongoose';
import config from '../../config';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
export interface TUser {
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'user' | 'vendor';
  isActive: boolean;
  followedShops: string[];
  phone?: string;
  profilePic?: string;
  passwordChangedAt?: Date;
  passwordResetToken?: string;
  passwordResetExpires?: Date;

  createPasswordResetToken(): string;
  isPasswordMatched(
    /* eslint-disable no-unused-vars */
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
}

// Define the schema for the User model
const userSchema = new Schema<TUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String },
  profilePic: { type: String },
  role: { type: String, enum: ['admin', 'vendor', 'user'], default: 'user' },
  isActive: { type: Boolean, default: true },
  followedShops: [{ type: Schema.Types.ObjectId, ref: 'Shop' }],
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
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  // Hash the password with the configured number of salt rounds
  this.password = await bcrypt.hash(
    this.password,
    Number(config.BCRYPT_SALT_ROUNDS),
  );
  next();
});

// Pre-find hook to filter out inactive users
userSchema.pre(/^find/, function (this: any, next) {
  this.where({ isActive: { $ne: false } });
  next();
});

// Method: Create a password reset token and set its expiration time
userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');
  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  return resetToken;
};

// Static method to compare plain text password with the hashed password
userSchema.methods.isPasswordMatched = async function (
  plainTextPassword: any,
  hashedPassword: any,
) {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
};

// Create and export the User model
const User = model('User', userSchema);
export default User;
