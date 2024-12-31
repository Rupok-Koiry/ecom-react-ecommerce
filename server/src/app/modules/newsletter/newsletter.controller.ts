import Newsletter from './newsletter.model';
import { getAll, updateOne, deleteOne } from '../../utils/handlerFactory';
import catchAsync from '../../utils/catchAsync';
import httpStatus from 'http-status';
import AppError from '../../errors/AppError';

export const createNewsletter = catchAsync(async (req, res, next) => {
  const newsLetter = await Newsletter.findOne({
    email: req.body.email,
  });
  if (newsLetter) {
    return next(
      new AppError(httpStatus.NOT_FOUND, `Newsletter already exists`),
    );
  }

  const doc = await Newsletter.create(req.body);
  res.status(httpStatus.CREATED).json({
    success: true,
    statusCode: httpStatus.CREATED,
    message: `${Newsletter.modelName} created successfully`,
    data: doc,
  });
});
export const getAllNewsletters = getAll(Newsletter);
export const getNewsletterDetails = catchAsync(async (req, res, next) => {
  try {
    const newsLetter = await Newsletter.findOne({
      email: req.params.email,
    });

    if (!newsLetter) {
      return next(new AppError(httpStatus.NOT_FOUND, `Newsletter not found`));
    }

    res.status(httpStatus.OK).json({
      success: true,
      statusCode: httpStatus.OK,
      message: `A Newsletter retrieved successfully`,
      data: newsLetter,
    });
  } catch (error) {
    next(error);
  }
});

export const updateNewsletter = updateOne(Newsletter);
export const deleteNewsletter = deleteOne(Newsletter);
