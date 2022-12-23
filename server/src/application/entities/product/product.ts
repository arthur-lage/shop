import { randomUUID } from 'crypto';
import { Replace } from 'src/helpers/Replace';

interface ProductProps {
  id?: string;
  createdAt?: Date;
  title: string;
  description: string;
  imageURL: string;
  price: number;
}

export class Product {
  private _id: string;
  private props: ProductProps;

  constructor(props: Replace<ProductProps, { createdAt?: Date }>) {
    if (props.id) {
      this._id = props.id;
    } else {
      this._id = randomUUID();
    }

    this.props = { ...props, createdAt: props.createdAt ?? new Date() };
  }

  public get id(): string {
    return this._id;
  }

  public get title(): string {
    return this.props.title;
  }

  public set title(newTitle: string) {
    this.props.title = newTitle;
  }

  public get description(): string {
    return this.props.description;
  }

  public set description(newDescription: string) {
    this.props.description = newDescription;
  }

  public get imageURL(): string {
    return this.props.imageURL;
  }

  public set imageURL(newImageURL: string) {
    this.props.imageURL = newImageURL;
  }

  public get price(): number {
    return this.props.price;
  }

  public set price(newPrice: number) {
    this.props.price = newPrice;
  }
}
