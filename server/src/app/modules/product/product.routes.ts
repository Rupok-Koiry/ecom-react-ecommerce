import express from 'express';
import {
  createProduct,
  getAllProducts,
  getProductDetails,
  updateProduct,
  deleteProduct,
  duplicateProduct,
  getProductReviews,
} from './product.controller';
import auth from '../../middlewares/auth';

const router = express.Router();

// Product Routes
router.post('/', auth('vendor'), createProduct);
router.get('/', getAllProducts);
router.get('/:productId', getProductDetails);
router.patch('/:productId', auth('vendor'), updateProduct);
router.delete('/:productId', auth('vendor'), deleteProduct);
router.post('/:productId/duplicate', auth('vendor'), duplicateProduct);
router.get('/:productId/reviews', getProductReviews);

export default router;
