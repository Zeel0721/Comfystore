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

  fetchFilter() {
    return this.productModel.find({}, 'name category company');
  }

  findFeatured() {
    return this.productModel.find({
      category: { $in: ['example', 'featured'] },
    });
  }

  async filterProduct(filterOptions: Filter) {
    const {
      page,
      searchValue: search,
      categoryValue: category,
      companyValue: company,
      sortValue: sort,
      priceValue: price,
    } = filterOptions;
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
      price: { $lte: parseInt(price) },
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
