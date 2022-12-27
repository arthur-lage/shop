import { CartRepository } from 'src/application/repositories/cart-repository';
import { Injectable } from '@nestjs/common';

interface AddProductToCartUseCaseRequest {
  productId: string;
  userId: string;
}
type AddProductToCartUseCaseResponse = void;

@Injectable()
export class AddProductToCartUseCase {
  constructor(private cartRepository: CartRepository) {}

  async execute(
    request: AddProductToCartUseCaseRequest,
  ): Promise<AddProductToCartUseCaseResponse> {
    const { productId, userId } = request;

    await this.cartRepository.addProductToCart(userId, productId);
  }
}
