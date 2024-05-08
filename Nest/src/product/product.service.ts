import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as fs from 'fs';
import { Model } from 'mongoose';
import { Product } from 'src/schema/product';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}
  async imageUpload(file: Express.Multer.File) {
    const imageData = fs.readFileSync(file.path);
    return this.productModel
      .find({ name: 'Wooden Shelves' })
      .updateOne({ image: imageData });
  }
  findAll(page: number) {
    return this.productModel.find().limit(9).skip(9);
  }
  findFeatured() {
    return this.productModel.find({
      category: { $in: ['example', 'featured'] },
    });
  }
}
