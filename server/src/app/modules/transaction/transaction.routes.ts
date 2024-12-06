import express from 'express';
import {
  getAllTransactions,
  getTransactionDetails,
  createTransactions,
  updateTransactions,
  deleteTransactions,
} from './transaction.controller';
import auth from '../../middlewares/auth';

const router = express.Router();

// Transaction Management
router.post('/', auth('admin'), createTransactions);
router.get('/', auth('admin'), getAllTransactions);
router.get('/:transactionId', auth('admin'), getTransactionDetails);
router.patch('/:transactionId', auth('admin'), updateTransactions);
router.delete('/:transactionId', auth('admin'), deleteTransactions);
export default router;
