import { Product } from 'src/application/entities/product/product';
import { ProductRepository } from '../../../repositories/product-repository';
import { Injectable } from '@nestjs/common';

interface CreateProductRequest {
  product: Product;
}

type CreateProductResponse = void;

@Injectable()
export class CreateProduct {
  constructor(private productRepository: ProductRepository) {}

  async execute(request: CreateProductRequest): Promise<CreateProductResponse> {
    const { product } = request;

    await this.productRepository.create(product);
  }
}
