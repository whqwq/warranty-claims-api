import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './entities/product.entity';
import { Model } from 'mongoose';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  async createProduct(createProductDto: CreateProductDto): Promise<Product> {
    const newProduct = new this.productModel(createProductDto);
    return newProduct.save();
  }

  async findAllProducts(): Promise<Product[]> {
    return this.productModel.find().exec();
  }

  async findProductById(id: string): Promise<Product> {
    return this.productModel.findById(id).exec();
  }

  async updateProduct(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    return this.productModel
      .findByIdAndUpdate(id, updateProductDto, { new: true })
      .exec();
  }

  async deleteProduct(id: string): Promise<void> {
    await this.productModel.findByIdAndDelete(id);
  }
}
