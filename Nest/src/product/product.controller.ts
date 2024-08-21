import { Controller, Get, Inject, Query } from '@nestjs/common';
import { Public } from '../global.decorator';
import { ProductService } from './product.service';
import { token } from '../token';
import { Filter } from '../utils/filter.type';

@Controller('product')
export class ProductController {
  constructor(
    @Inject(token.PRODUCT_SERVICE)
    private readonly productService: ProductService,
  ) {}

  @Public()
  @Get('getfilter')
  fetchFilter() {
    return this.productService.fetchFilter();
  }

  @Public()
  @Get('get')
  findFeatured() {
    return this.productService.findFeatured();
  }

  @Public()
  @Get('filter')
  filterProduct(@Query() filterOptions: Filter) {
    return this.productService.filterProduct(filterOptions);
  }
}
