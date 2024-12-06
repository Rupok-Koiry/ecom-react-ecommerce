import express from 'express';
import {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from './category.controller';
import auth from '../../middlewares/auth';

const router = express.Router();

// Category Management
router.get('/', getAllCategories);
router.post('/', auth('admin'), createCategory);
router.patch('/:categoryId', auth('admin'), updateCategory);
router.delete('/:categoryId', auth('admin'), deleteCategory);

export default router;
