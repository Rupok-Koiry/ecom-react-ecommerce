import express from 'express';
import auth from '../../middlewares/auth';
import {
  createShop,
  getShopDetails,
  updateShop,
  deleteShop,
  getShopProducts,
  getShopFollowers,
  blacklistShop,
  getAllShop,
} from './shop.controller';

const router = express.Router();

// Shop Routes
router.post('/', auth('vendor'), createShop);
router.get('/', auth('admin'), getAllShop);
router.get('/:shopId', getShopDetails);
router.patch('/:shopId', auth('vendor'), updateShop);
router.delete('/:shopId', auth('vendor'), deleteShop);
router.get('/:shopId/products', getShopProducts);
router.get('/:shopId/followers', auth('vendor'), getShopFollowers);
router.patch('/:shopId/blacklist', auth('admin'), blacklistShop);

export default router;
