import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from '../schema/product';
import { Filter } from '../utils/filter.type';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  async fetchFilter() {
    const company = await this.productModel.distinct('company');
    const category = await this.productModel.distinct('category', {
      category: { $nin: ['example', 'featured'] },
    });
    return { company, category };
  }

  async findFeatured() {
    return await this.productModel.find({
      category: { $in: ['example', 'featured'] },
    });
  }

  async filterProduct(filterOptions: Filter) {
    const { page, search, category, company, sort, price } = filterOptions;
    const filterQuery = {
      name: search ? search : { $ne: search },
      category:
        category === 'all' || !category
          ? { $nin: [category] }
          : { $in: [category] },
      company:
        company === 'all' || !company
          ? { $nin: [company] }
          : { $in: [company] },
      price: price ? { $lte: parseInt(price) } : { $ne: 0 },
    };
    const products = await this.productModel
      .find(filterQuery)
      .sort(sort)
      .skip((page - 1) * 9)
      .limit(9)
      .exec();
    const total = await this.productModel.countDocuments(filterQuery).exec();
    return { products, total };
  }
}
