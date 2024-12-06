import Category from './category.model';
import {
  createOne,
  getAll,
  getOne,
  updateOne,
  deleteOne,
} from '../../utils/handlerFactory';

export const createCategory = createOne(Category);
export const getAllCategories = getAll(Category);
export const getCategoryDetails = getOne(Category);
export const updateCategory = updateOne(Category);
export const deleteCategory = deleteOne(Category);
