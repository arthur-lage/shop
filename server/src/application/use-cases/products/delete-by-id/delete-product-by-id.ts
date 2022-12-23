import { ProductRepository } from 'src/application/repositories/product-repository';
import { Injectable } from '@nestjs/common';

interface DeleteProductByIdRequest {
  productId: string;
}

type DeleteProductByIdResponse = void;

@Injectable()
export class DeleteProductById {
  constructor(private productRepository: ProductRepository) {}

  async execute(
    request: DeleteProductByIdRequest,
  ): Promise<DeleteProductByIdResponse> {
    const { productId } = request;

    await this.productRepository.deleteById(productId);
  }
}
