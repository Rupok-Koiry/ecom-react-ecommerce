import { Request, Response, NextFunction } from 'express';
import { Model } from 'mongoose';
import catchAsync from './../utils/catchAsync';
import AppError from '../errors/AppError';
import APIFeatures from './apiFeatures';
import httpStatus from 'http-status';

export const deleteOne = <T>(Model: Model<T>) =>
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) {
      return next(new AppError(404, 'No document found with that ID'));
    }

    res.status(httpStatus.OK).json({
      success: true,
      statusCode: httpStatus.OK,
      message: `${Model.modelName} Deleted successfully`,
      data: doc,
    });
  });

export const updateOne = <T>(Model: Model<T>) =>
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!doc) {
      return next(
        new AppError(httpStatus.NOT_FOUND, `${Model.modelName} not found`),
      );
    }

    res.status(httpStatus.OK).json({
      success: true,
      statusCode: httpStatus.OK,
      message: `${Model.modelName} updated successfully`,
      data: doc,
    });
  });

export const createOne = <T>(Model: Model<T>) =>
  catchAsync(async (req: Request, res: Response) => {
    const doc = await Model.create(req.body);
    res.status(httpStatus.CREATED).json({
      success: true,
      statusCode: httpStatus.CREATED,
      message: `${Model.modelName} created successfully`,
      data: doc,
    });
  });

export const getOne = <T>(Model: Model<T>, popOptions?: string) =>
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    try {
      let query = Model.findById(req.params.id);

      if (popOptions) query = query.populate(popOptions);
      const doc = await query;

      if (!doc) {
        return next(
          new AppError(httpStatus.NOT_FOUND, `${Model.modelName} not found`),
        );
      }

      res.status(httpStatus.OK).json({
        success: true,
        statusCode: httpStatus.OK,
        message: `A ${Model.modelName} retrieved successfully`,
        data: doc,
      });
    } catch (error) {
      next(error);
    }
  });

export const getAll = <T>(Model: Model<T>, popOptions?: string) =>
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (req.query.carId) {
        req.query.car = req.query.carId;
        delete req.query.carId;
      }
      // APi features
      const features = new APIFeatures(Model.find(), req.query)
        .filter()
        .sort()
        .limitFields()
        .paginate();
      // POPULATE
      if (popOptions) features.query = features.query.populate(popOptions);
      const doc = await features.query;
      if (doc.length === 0) {
        return res.status(httpStatus.NOT_FOUND).json({
          success: false,
          statusCode: httpStatus.NOT_FOUND,
          message: 'No Data Found',
          data: [],
        });
      }
      // SEND RESPONSE
      res.status(httpStatus.OK).json({
        success: true,
        statusCode: httpStatus.OK,
        message: `${Model.modelName} retrieved successfully`,
        data: doc,
      });
    } catch (error) {
      next(error);
    }
  });
