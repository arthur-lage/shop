import { Cart } from '../entities/cart/cart';

export abstract class CartRepository {
  abstract getUserCart(userId: string): Promise<Cart>;
  abstract addProductToCart(userId: string, productId: string): Promise<void>;
  abstract clearCart(userId: string): Promise<void>;
  abstract removeProductFromCart(
    userId: string,
    productId: string,
  ): Promise<void>;
}
