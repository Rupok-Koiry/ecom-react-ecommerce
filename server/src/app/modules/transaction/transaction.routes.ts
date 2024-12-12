import express from 'express';
import {
  transactionError,
  transactionSuccess,
  initTransaction,
} from './transaction.controller';
import auth from '../../middlewares/auth';

const router = express.Router();

// Transaction Management
router.post('/init-transaction', auth('admin', 'user'), initTransaction);
router.post('/success/:transactionId', transactionSuccess);
router.post('/error/:transactionId', transactionError);
export default router;
