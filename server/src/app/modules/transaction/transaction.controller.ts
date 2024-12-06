import { getAll } from '../../utils/handlerFactory';
import Transaction from './transaction.model';

export const getAllTransactions = getAll(Transaction);
