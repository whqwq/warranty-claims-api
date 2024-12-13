import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(@Request() req, @Body() createProductDto: CreateProductDto) {
    if (req.user.role !== 'staff') {
      throw new HttpException('unauthorized!', HttpStatus.UNAUTHORIZED);
    }
    return this.productsService.createProduct(createProductDto);
  }

  @Get()
  findAll() {
    return this.productsService.findAllProducts();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findProductById(id);
  }

  @Patch(':id')
  update(
    @Request() req,
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    if (req.user.role !== 'staff') {
      throw new HttpException('unauthorized!', HttpStatus.UNAUTHORIZED);
    }
    return this.productsService.updateProduct(id, updateProductDto);
  }

  @Delete(':id')
  remove(@Request() req, @Param('id') id: string) {
    if (req.user.role !== 'staff') {
      throw new HttpException('unauthorized!', HttpStatus.UNAUTHORIZED);
    }
    return this.productsService.deleteProduct(id);
  }
}
