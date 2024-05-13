import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { MulterModule } from '@nestjs/platform-express';
import { token } from 'src/token';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductModel } from 'src/schema/product';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductModel }]),
    MulterModule.register({ dest: './images' }),
  ],
  controllers: [ProductController],
  providers: [
    {
      provide: token.PRODUCT_SERVICE,
      useClass: ProductService,
    },
  ],
})
export class ProductModule {}
