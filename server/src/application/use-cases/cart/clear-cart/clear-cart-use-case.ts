import { CartRepository } from 'src/application/repositories/cart-repository';

interface ClearCartUseCaseRequest {
  userId: string;
}

type ClearCartUseCaseResponse = void;

export class ClearCartUseCase {
  constructor(private cartRepository: CartRepository) {}

  async execute(
    request: ClearCartUseCaseRequest,
  ): Promise<ClearCartUseCaseResponse> {
    const { userId } = request;

    await this.cartRepository.clearCart(userId);
  }
}
