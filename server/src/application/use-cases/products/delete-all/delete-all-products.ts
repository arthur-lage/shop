import { ProductRepository } from 'src/application/repositories/product-repository';
import { Injectable } from '@nestjs/common';

type DeleteAllProductsResponse = void;

@Injectable()
export class DeleteAllProducts {
  constructor(private productRepository: ProductRepository) {}

  async execute(): Promise<DeleteAllProductsResponse> {
    await this.productRepository.deleteAll();
  }
}
