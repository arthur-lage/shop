import { randomUUID } from 'crypto';
import { Product } from '../product/product';
import { Replace } from 'src/helpers/Replace';

interface CartProps {
  id?: string;
  products: Product[];
  createdAt: Date;
}

export class Cart {
  private _id: string;
  private props: CartProps;

  constructor(props: Replace<CartProps, { createdAt?: Date }>) {
    if (props.id) {
      this._id = props.id;
    } else {
      this._id = randomUUID();
    }

    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
    };
  }

  public get id(): string {
    return this._id;
  }

  public get products(): Product[] {
    return this.props.products;
  }

  public set products(newProducts: Product[]) {
    this.props.products = newProducts;
  }

  public addProduct(newProduct: Product) {
    this.props.products.push(newProduct);
  }

  public removeProduct(productId: string) {
    this.props.products = this.products.filter(
      (product) => product.id !== productId,
    );
  }

  public clearCart() {
    this.props.products = [];
  }
}
