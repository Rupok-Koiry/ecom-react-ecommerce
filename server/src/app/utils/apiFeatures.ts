/* eslint-disable @typescript-eslint/no-explicit-any */
import { Query } from 'mongoose';

interface QueryString {
  page?: string;
  sort?: string;
  limit?: string;
  fields?: string;
  search?: string;
  type?: string;
  price?: string;
  [key: string]: any;
}

class APIFeatures<T> {
  query: Query<T[], T>;
  queryString: QueryString;

  constructor(query: Query<T[], T>, queryString: QueryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter(): this {
    const queryObj = { ...this.queryString };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach((el) => delete queryObj[el]);

    // Handle search term for car name
    if (queryObj.search) {
      queryObj.name = { $regex: queryObj.search, $options: 'i' };
      delete queryObj.search;
    }

    // Handle price filtering (assume price is stored as a number in the database)
    if (queryObj.price) {
      const priceRange = queryObj.price.split('_');
      if (priceRange[0] === 'under') {
        queryObj.pricePerHour = { lt: +priceRange[1] };
      } else if (priceRange[0] === 'over') {
        queryObj.pricePerHour = { gt: +priceRange[1] };
      } else {
        queryObj.pricePerHour = { gte: +priceRange[0], lte: +priceRange[1] };
      }
      delete queryObj.price;
    }

    // Handle filtering by features
    if (queryObj.features) {
      const featuresArray = queryObj.features
        .split(',')
        .map((feature: any) => feature.trim());

      queryObj.features = { $all: featuresArray };
    }

    // Advanced filtering for other query parameters
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    this.query = this.query.find(JSON.parse(queryStr));

    return this;
  }

  sort(): this {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort('-createdAt');
    }

    return this;
  }

  limitFields(): this {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(',').join(' ');
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select('-__v');
    }

    return this;
  }

  paginate(): this {
    const page = parseInt(this.queryString.page || '1');
    const limit = parseInt(this.queryString.limit || '100');
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);

    return this;
  }
}

export default APIFeatures;
