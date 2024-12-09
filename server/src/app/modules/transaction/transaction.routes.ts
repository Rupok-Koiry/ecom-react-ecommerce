import express from 'express';
import {
  transactionError,
  getAllTransactions,
  transactionSuccess,
  initTransaction,
  getTransactionDetails,
} from './transaction.controller';
import auth from '../../middlewares/auth';

const router = express.Router();

// Transaction Management
router.post('/init-transaction', auth('admin', 'user'), initTransaction);
router.post('/success/:transactionId', transactionSuccess);
router.post('/error/:transactionId', transactionError);
router.get('/', auth('admin', 'user'), getAllTransactions);
router.get('/:transactionId', auth('admin', 'user'), getTransactionDetails);
export default router;
