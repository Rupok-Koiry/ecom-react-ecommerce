import express from 'express';
import auth from '../../middlewares/auth';
import {
  getUserProfile,
  updateUserProfile,
  followShop,
  unfollowShop,
  getAllUsers,
  banUser,
  deleteUser,
} from './user.controller';
const router = express.Router();

// User Routes
router.get('/profile', auth('user', 'vendor', 'admin'), getUserProfile);
router.patch('/profile', auth('user', 'vendor', 'admin'), updateUserProfile);
router.post('/follow/:shopId', auth('user'), followShop);
router.delete('/unfollow/:shopId', auth('user'), unfollowShop);
router.get('/', auth('admin'), getAllUsers);
router.patch('/:userId/ban', auth('admin'), banUser);
router.delete('/:userId', auth('admin'), deleteUser);

export default router;
