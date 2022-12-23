import { ProductRepository } from '../../../repositories/product-repository';
import { Product } from '../../../entities/product/product';
import { Injectable } from '@nestjs/common';

interface UpdateProductRequest {
  productId: string;
  product: Product;
}

type UpdateProductResponse = void;

@Injectable()
export class UpdateProduct {
  constructor(private productRepository: ProductRepository) {}

  async execute(request: UpdateProductRequest): Promise<UpdateProductResponse> {
    const { productId, product } = request;

    await this.productRepository.update(productId, product);
  }
}
