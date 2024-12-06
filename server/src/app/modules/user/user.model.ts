import bcrypt from 'bcrypt';
import { Schema, model } from 'mongoose';
import config from '../../config';

// Define the schema for the User model
const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'vendor', 'user'], default: 'user' },
  isActive: { type: Boolean, default: true },
  followedShops: [{ type: Schema.Types.ObjectId, ref: 'Shop' }],
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

// Static method to compare plain text password with the hashed password
userSchema.statics.isPasswordMatched = async function (
  plainTextPassword,
  hashedPassword,
) {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
};

// Create and export the User model
const User = model('User', userSchema);
export default User;
