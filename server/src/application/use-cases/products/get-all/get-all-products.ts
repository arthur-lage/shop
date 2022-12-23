import { Injectable } from '@nestjs/common';
import { Product } from '../../../entities/product/product';
import { ProductRepository } from 'src/application/repositories/product-repository';

interface GetAllProductsResponse {
  products: Product[];
}

@Injectable()
export class GetAllProducts {
  constructor(private productRepository: ProductRepository) {}

  async execute(): Promise<GetAllProductsResponse> {
    const products = await this.productRepository.getAll();

    return {
      products,
    };
  }
}
