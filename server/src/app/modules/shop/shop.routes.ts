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
} from './shop.controller';

const router = express.Router();

// Shop Routes
router.post('/', auth('vendor'), createShop);
router.get('/:shopId', getShopDetails);
router.put('/:shopId', auth('vendor'), updateShop);
router.delete('/:shopId', auth('vendor'), deleteShop);
router.get('/:shopId/products', getShopProducts);
router.get('/:shopId/followers', auth('vendor'), getShopFollowers);
router.put('/:shopId/blacklist', auth('admin'), blacklistShop);

export default router;
