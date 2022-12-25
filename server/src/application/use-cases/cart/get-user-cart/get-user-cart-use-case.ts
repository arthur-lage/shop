import { CartRepository } from '../../../repositories/cart-repository';
import { Product } from '../../../entities/product/product';

interface GetUserCartUseCaseRequest {
  userId: string;
}

interface GetUserCartUseCaseResponse {
  products: Product[];
}

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
