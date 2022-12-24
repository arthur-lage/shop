import { Cart } from '../entities/cart/cart';
import { Product } from '../entities/product/product';

export abstract class CartRepository {
  abstract getUserCart(userId: string): Promise<Cart>;
  abstract addProductToCart(userId: string, product: Product): Promise<void>;
  abstract clearCart(cart: Cart): Promise<void>;
  abstract removeProductFromCart(
    userId: string,
    productId: string,
  ): Promise<void>;
}
