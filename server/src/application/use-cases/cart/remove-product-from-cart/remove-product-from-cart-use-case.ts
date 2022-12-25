import { CartRepository } from '../../../repositories/cart-repository';
interface RemoveProductFromCartUseCaseRequest {
  userId: string;
  productId: string;
}

type RemoveProductFromCartUseCaseResponse = void;

export class RemoveProductFromCartUseCase {
  constructor(private cartRepository: CartRepository) {}

  async execute(
    request: RemoveProductFromCartUseCaseRequest,
  ): Promise<RemoveProductFromCartUseCaseResponse> {
    const { userId, productId } = request;

    await this.cartRepository.removeProductFromCart(userId, productId);
  }
}
