import express from 'express';
import { getAllTransactions } from './transaction.controller';
import auth from '../../middlewares/auth';

const router = express.Router();

// Transaction Management
router.get('/', auth('admin'), getAllTransactions);

export default router;
