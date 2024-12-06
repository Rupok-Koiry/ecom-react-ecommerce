import {
  createOne,
  deleteOne,
  getAll,
  getOne,
  updateOne,
} from '../../utils/handlerFactory';
import Transaction from './transaction.model';

export const getAllTransactions = getAll(Transaction);
export const getTransactionDetails = getOne(Transaction);
export const createTransactions = createOne(Transaction);
export const updateTransactions = updateOne(Transaction);
export const deleteTransactions = deleteOne(Transaction);
