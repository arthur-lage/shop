import { Product } from 'src/application/entities/product/product';
import { ProductRepository } from 'src/application/repositories/product-repository';
import { Injectable } from '@nestjs/common';

interface GetProductByIdRequest {
  productId: string;
}

interface GetProductByIdResponse {
  product: Product;
}

@Injectable()
export class GetProductById {
  constructor(private productRepository: ProductRepository) {}

  async execute(
    request: GetProductByIdRequest,
  ): Promise<GetProductByIdResponse> {
    const { productId } = request;

    const product = await this.productRepository.getById(productId);

    return {
      product,
    };
  }
}
