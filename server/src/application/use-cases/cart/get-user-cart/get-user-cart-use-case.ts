import { CartRepository } from '../../../repositories/cart-repository';
import { Product } from '../../../entities/product/product';
import { Injectable } from '@nestjs/common';

interface GetUserCartUseCaseRequest {
  userId: string;
}

interface GetUserCartUseCaseResponse {
  products: Product[];
}

@Injectable()
export class GetUserCartUseCase {
  constructor(private cartRepository: CartRepository) {}

  async execute(
    request: GetUserCartUseCaseRequest,
  ): Promise<GetUserCartUseCaseResponse> {
    const { userId } = request;

    const cart = await this.cartRepository.getUserCart(userId);

    return {
      products: cart.products,
    };
  }
}
