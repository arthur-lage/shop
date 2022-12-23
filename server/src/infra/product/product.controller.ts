import { GetAllProducts } from '../../application/use-cases/products/get-all/get-all-products';
import { CreateProduct } from '../../application/use-cases/products/create/create-product';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { GetProductById } from 'src/application/use-cases/products/get-by-id/get-product-by-id';
import { DeleteAllProducts } from '../../application/use-cases/products/delete-all/delete-all-products';
import { DeleteProductById } from '../../application/use-cases/products/delete-by-id/delete-product-by-id';
import { UpdateProduct } from '../../application/use-cases/products/update/update-product';
import { CreateProductDTO } from './dtos/create-product.dto';
import { UpdateProductDTO } from './dtos/update-product.dto';
import { Product } from 'src/application/entities/product/product';

@Controller('products')
export class ProductController {
  constructor(
    private getAllProductsUseCase: GetAllProducts,
    private getProductByIdUseCase: GetProductById,
    private createProductUseCase: CreateProduct,
    private updateProductUseCase: UpdateProduct,
    private deleteAllProductsUseCase: DeleteAllProducts,
    private deleteProductByIdUseCase: DeleteProductById,
  ) {}

  @Get()
  async getAll() {
    const { products } = await this.getAllProductsUseCase.execute();
    return { products };
  }

  @Get('/:productId')
  async getById(@Param('productId') productId: string) {
    const { product } = await this.getProductByIdUseCase.execute({
      productId,
    });

    return {
      product,
    };
  }

  @Post()
  async create(@Body() body: CreateProductDTO) {
    const { title, description, imageURL, price } = body;

    const product = new Product({
      title,
      description,
      imageURL,
      price,
    });

    await this.createProductUseCase.execute({
      product,
    });
  }

  @Patch('/:id')
  async update(
    @Param('productId') productId: string,
    @Body() body: UpdateProductDTO,
  ) {
    const { title, description, imageURL, price } = body;

    const product = new Product({
      title,
      description,
      imageURL,
      price,
    });

    await this.updateProductUseCase.execute({
      productId,
      product,
    });
  }

  @Delete()
  async deleteAll() {
    await this.deleteAllProductsUseCase.execute();
  }

  @Delete('/:id')
  async deleteById(@Param('productId') productId: string) {
    await this.deleteProductByIdUseCase.execute({
      productId,
    });
  }
}
