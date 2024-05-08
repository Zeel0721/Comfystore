import {
  Controller,
  FileTypeValidator,
  Get,
  Inject,
  Param,
  ParseFilePipe,
  ParseIntPipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Public } from 'src/global.decorator';
import { ProductService } from './product.service';
import { token } from 'src/token';

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
  @Get('/:page')
  findAll(@Param('page', ParseIntPipe) page: number) {
    return this.productService
      .findAll(page)
      .limit(9)
      .skip((page - 1) * 9);
  }

  @Public()
  @Get('')
  findFeatured() {
    return this.productService.findFeatured();
  }
}
