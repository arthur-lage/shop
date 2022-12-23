import { Product } from '../entities/product/product';

export abstract class ProductRepository {
  abstract getAll(): Promise<Product[]>;
  abstract getById(productId: string): Promise<Product>;
  abstract create(product: Product): Promise<void>;
  abstract update(productId: string, product: Product): Promise<void>;
  abstract deleteAll(): Promise<void>;
  abstract deleteById(productId: string): Promise<void>;
}
