import {
  Controller,
  FileTypeValidator,
  Get,
  Inject,
  Param,
  ParseFilePipe,
  ParseIntPipe,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Public } from 'src/global.decorator';
import { ProductService } from './product.service';
import { token } from 'src/token';
import { Filter } from 'src/utils/filter.type';

@Controller('product')
export class ProductController {
  constructor(
    @Inject(token.PRODUCT_SERVICE)
    private readonly productService: ProductService,
  ) {}
  @Public()
  @Post('upload')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './images',
        filename: (req, file, cb) => {
          cb(null, file.originalname);
        },
      }),
    }),
  )
  fileUpload(
    @UploadedFile(
      new ParseFilePipe({
        validators: [new FileTypeValidator({ fileType: 'image' })],
      }),
    )
    file: Express.Multer.File,
  ) {
    return this.productService.imageUpload(file);
  }

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
